(function() {
  const directives = [
    {}
  ];
  const smallAngular = {
    directive(type) {
      const directive = '';
    },
    compile(node) {
      console.log('compile: ', node); //eslint-disable-line
      // directives['ng-click'].forEach(cb => cb(node));
    },
    bootstrap(node) {
      let ngElement = node ? document.querySelector(node) : null;

      if (node && ngElement) {
        ngElement.setAttribute('ng-app', '');
      } else {
        const allNodes = document.querySelectorAll('*');
        ngElement = [].slice.call(allNodes, 0).find(el => el.hasAttribute('ng-app'));
      }

      const allNodes = ngElement.querySelectorAll('*');
      console.log(allNodes); //eslint-disable-line

      if (ngElement) {
        allNodes.forEach(el => {
          this.compile(el);
        });
      }
    }
  };

  // smallAngular.directive('ng-model', function(el) {
  //   console.log('ng-model');
  // });
  // smallAngular.directive('ng-click', function(el) {
  //   console.log('ng-click');
  // });

  // smallAngular.directive('ng-show', function(el) {
  //   console.log('ng-show');
  // });

  // smallAngular.directive('ng-hide', function(el) {
  //   console.log('ng-hide');
  // });
  // smallAngular.directive('make_short', function(el){
  //  console.log('make_short');
  // })
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
