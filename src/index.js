/* eslint-disable no-console, no-eval*/
(function() {
  const directives = {};
  const $$watchers = [];
  const $rootScope = window;
  $rootScope.myOnClick = () => {
    window.name = window.name === 'vasya' ? 'petya' : 'vasya';
    console.log(name);
  };

  $rootScope.$watch = (name, watcher) => $$watchers.push({ name, watcher });
  $rootScope.$apply = () => $$watchers.forEach(({ watcher }) => {
    console.log(watcher);
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
      const ngAttributes = []; // ng - attributes
      // add runner to ngAttributes

      for (let i = 0; i < length; i++) {
        const { name: type } = attributes[i];

        if (type.substring(0, 3) === 'ng-') {
          eval(node.getAttribute(type)); // run attribute
        }

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
      allNodes.forEach(el => this.compile(el));
    }
  };

  smallAngular.directive('ng-init', function(scope, el, attrs) {
    eval(el.getAttribute('ng-init'));
  });

  smallAngular.directive('ng-model', function(scope, node, attrs) {
    eval(node.getAttribute('ng-model'));
  });

  smallAngular.directive('ng-click', function(scope, el, attrs) {
    addEventListener('click', () => {
      const attrData = el.getAttribute('ng-click');
      eval(attrData);
      scope.$apply();
    });

    console.log('ng-click: ', el);
  });

  smallAngular.directive('ng-show', function(scope, el, attrs) {
    el.style.display = eval(el.getAttribute('ng-show')) ? 'block' : 'none';
    const attrData = el.getAttribute('ng-show');

    scope.$watch(attrData, () => {
      el.style.display = eval(el.getAttribute('ng-show')) ? 'block' : 'none';
    });
    el.style.display = eval(el.getAttribute('ng-show')) ? 'block' : 'none';
    // console.log(el.innerHTML);
    // console.log('name: ', eval('name'));
    // console.log(attrs);
  });

  smallAngular.directive('ng-hide', function(scope, node, attrs) {
    console.log('ng-hide: ', node);
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

