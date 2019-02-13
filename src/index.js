/* eslint-disable no-console */
(function() {
  const directives = {};
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

        (type in directives) && directives[type](node);
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

  smallAngular.directive('ng-model', function(el) {
    console.log('ng-model: ', el);
  });

  smallAngular.directive('ng-click', function(el) {
    console.log('ng-click: ', el);
  });

  smallAngular.directive('ng-show', function(el) {
    console.log('ng-show: ', el);
  });

  smallAngular.directive('ng-hide', function(el) {
    console.log('ng-hide: ', el);
  });

  smallAngular.directive('ng-make-short', function(el) {
    console.log('ng-make-short: ', el);
  });

  window.smallAngular = smallAngular;
}());

document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    window.smallAngular.bootstrap();
  }
};