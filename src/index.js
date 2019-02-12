(function() {
  const directives = {};
  const smallAngular = {
    directive(type, cb) {
      directives[type] = cb;
    },
    compile(node) {
      const { attributes } = node;
      const { length } = attributes;

      for (let i = 0; i < length; i++) {
        const { name } = attributes[i];

        if (name in directives) {
          directives[name](node);
        }
      }
    },
    bootstrap(node) {
      let ngElement = node ? document.querySelector(node) : null;

      if (node && ngElement) {
        ngElement.setAttribute('ng-app', '');
      } else {
        ngElement = document.querySelector('[ng-app]');
      }

      if (ngElement) {
        const allNodes = ngElement.querySelectorAll('*');

        this.compile(ngElement);
        allNodes.forEach(el => {
          this.compile(el);
        });
      }
    }
  };

  smallAngular.directive('ng-model', function(el) {
    console.log('ng-model: ', el); //eslint-disable-line
  });

  smallAngular.directive('ng-click', function(el) {
    console.log('ng-click: ', el); //eslint-disable-line
  });

  smallAngular.directive('ng-show', function(el) {
    console.log('ng-show: ', el); //eslint-disable-line
  });

  smallAngular.directive('ng-hide', function(el) {
    console.log('ng-hide: ', el ); //eslint-disable-line
  });

  smallAngular.directive('make_short', function(el) {
    console.log('make_short: ', el); //eslint-disable-line
  });

  window.smallAngular = smallAngular;
}());

document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    window.smallAngular.bootstrap('#app');
  }
};