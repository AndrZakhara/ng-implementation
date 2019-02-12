(function() {
  const directives = {};
  const smallAngular = {
    directive(type, cb) {
      directives[type] = cb;
    },
    compile({ attributes }) {
      for (let i = 0; i < attributes.length; i++) {
        const { name } = attributes[i];

        if (name in directives) {
          directives[name]();
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
    console.log('ng-model'); //eslint-disable-line
  });

  smallAngular.directive('ng-click', function(el) {
    console.log('ng-click'); //eslint-disable-line
  });

  smallAngular.directive('ng-show', function(el) {
    console.log('ng-show'); //eslint-disable-line
  });

  smallAngular.directive('ng-hide', function(el) {
    console.log('ng-hide'); //eslint-disable-line
  });

  smallAngular.directive('make_short', function(el) {
    console.log('make_short'); //eslint-disable-line
  });

  window.smallAngular = smallAngular;
}());

document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    window.smallAngular.bootstrap('#app');
  }
};

// smallAngular.bootstrap(node)
/*
mount app to this node
or
find data attr ng-app - mount app to this node*/
