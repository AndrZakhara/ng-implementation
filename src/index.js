/* eslint-disable no-console, no-eval*/
(function() {
  const directives = {};
  const $$watchers = [];
  const $rootScope = window;

  $rootScope.$watch = (name, watcher) => {
    $$watchers.push({ name, watcher });
  };

  $rootScope.$apply = () => $$watchers.forEach(({ watcher }) => {
    watcher();
  });

  const smallAngular = {
    directive(type, cb) {
      if (typeof type !== 'string') {
        throw new Error('Directive name is not a string');
      }

      if (typeof cb !== 'function') {
        throw new Error('Directive callback is not a function');
      }

      if (type in directives) {
        throw new Error('Multiple directives are not allowed!');
      }

      directives[type] = cb;
    },
    compile(node) {
      const { attributes } = node;
      const { length } = attributes;

      for (let i = 0; i < length; i++) {
        const { name: type } = attributes[i];

        (type in directives) && directives[type]($rootScope, node, attributes);
      }
    },
    bootstrap(node) {
      if (node && !(node instanceof HTMLElement)) {
        throw new Error('Node element in bootstrap(node) should be a DOM element!');
      }

      const ngElement = node instanceof HTMLElement
        ? document.querySelector(node)
        : document.querySelector('[ng-app]');

      if (!ngElement) {
        throw new Error('DOM element which is the root of AngularJS application is not selected!');
      }

      const allNodes = ngElement.querySelectorAll('*');

      this.compile(ngElement);
      allNodes.forEach(this.compile);
    }
  };

  smallAngular.directive('ng-init', function(scope, el, attrs) {
    eval(el.getAttribute('ng-init'));
  });

  smallAngular.directive('ng-model', function(scope, el, attrs) {
    const attrData = el.attributes['ng-model'].value;

    el.addEventListener('keyup', e => {
      scope[attrData] = el.value;

      scope.$apply();
    });
    scope.$watch(attrData, () => {
      const attrData = el.attributes['ng-model'].value;
      el.value = scope[attrData];
    });
  });

  smallAngular.directive('ng-click', function(scope, el, attrs) {
    el.addEventListener('click', e => {
      const attrData = el.getAttribute('ng-click');
      eval(attrData);
      console.log('click');
      scope.$apply();
    });
  });

  smallAngular.directive('ng-show', function(scope, el, attrs) {
    const attrData = el.getAttribute('ng-show');
    el.style.display = eval(attrData) ? 'block' : 'none';

    scope.$watch(() => eval(attrData), () => {
      el.style.display = eval(attrData) ? 'block' : 'none';
    });
  });

  smallAngular.directive('ng-bind', function(scope, el, attrs) {
    const attrData = el.getAttribute('ng-bind');
    el.innerText = eval(attrData);

    scope.$watch(attrData, () => {
      el.innerText = eval(attrData);
    });
  });

  smallAngular.directive('ng-hide', function(scope, el, attrs) {
    const attrData = el.getAttribute('ng-hide');
    el.style.display = eval(attrData) ? 'none' : 'block';


    scope.$watch(() => el.getAttribute('ng-hide'), () => {
      el.style.display = eval(attrData) ? 'none' : 'block';
    });
  });

  smallAngular.directive('ng-make-short', function(scope, el, attrs) {
    const textLength = eval(el.getAttribute('length'));
    const text = scope.article.slice(0, textLength);
    el.innerText = `${text} ...`;

    scope.$watch(() => textLength, () => {
      const textLength = eval(el.getAttribute('length'));
      const text = scope.article.slice(0, textLength);
      el.innerText = `${text} ...`;
    });
  });

  smallAngular.directive('ng-random-color', function(scope, el, attrs) {
    el.addEventListener('click', function() {
      const letters = '0123456789ABCDEF';
      let color = '#';

      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      el.style.backgroundColor = color;
    });
  });

  smallAngular.directive('ng-repeat', function(scope, el, attrs) {
    const data = el.getAttribute('ng-repeat');
    const [, , items] = data.split(' ');
    const parent = el.parentNode;

    const renderNgRepeatTemplate = () => {
      const iterableValue = scope[items];
      const arrOfElems = document.querySelectorAll(`[ng-repeat="${data}"]`);

      arrOfElems.forEach(el => el.remove());

      for (const item of iterableValue) {
        const nextEl = el.cloneNode();
        nextEl.innerText = item;

        parent.appendChild(nextEl);
      }
    };

    renderNgRepeatTemplate();
    scope.$watch(() => items, renderNgRepeatTemplate);
  });

  window.smallAngular = smallAngular;

  document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
      window.smallAngular.bootstrap();
    }
  };
}());

