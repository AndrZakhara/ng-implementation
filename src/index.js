/* eslint-disable no-console, no-eval*/
(function() {
  const directives = {};
  const $$watchers = [];
  const $rootScope = window;

  $rootScope.myOnClick = () => {
    window.name = window.name === 'Anonime' ? 'User' : 'Anonime';
    console.log(name);
  };

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
    el.addEventListener('keyup', e => {
      const attrData = el.attributes['ng-model'].value;
      scope[attrData] = el.value;
      scope.$apply();
    });
  });

  smallAngular.directive('ng-click', function(scope, el, attrs) {
    el.addEventListener('click', e => {
      const attrData = el.getAttribute('ng-click');
      eval(attrData);
      scope.$apply();
    });
  });

  smallAngular.directive('ng-show', function(scope, el, attrs) {
    const attrData = el.getAttribute('ng-show');
    el.style.display = eval(attrData) ? 'block' : 'none';

    scope.$watch('ng-show', () => {
      el.style.display = eval(attrData) ? 'block' : 'none';
    });
  });

  smallAngular.directive('ng-bind', function(scope, el, attrs) {
    const attrData = el.getAttribute('ng-bind');
    el.innerHTML = eval(attrData);

    scope.$watch('ng-bind', () => {
      el.innerHTML = eval(attrData);
    });
  });

  smallAngular.directive('ng-hide', function(scope, el, attrs) {
    const attrData = el.getAttribute('ng-hide');
    el.style.display = eval(attrData) ? 'none' : 'block';


    scope.$watch('ng-hide', () => {
      el.style.display = eval(attrData) ? 'none' : 'block';
    });
  });

  smallAngular.directive('ng-make-short', function(scope, node, attrs) {
    console.log('ng-make-short: ', node);
  });

  window.smallAngular = smallAngular;

  document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
      window.smallAngular.bootstrap();
    }
  };
}());

