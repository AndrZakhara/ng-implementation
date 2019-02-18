/* eslint-disable no-console, no-eval*/
(function() {
  const directives = {};
  const $$watchers = [];
  const $rootScope = window;

  $rootScope.myOnClick = () => {
    window.name = window.name === 'Anonime' ? 'User' : 'Anonime';
  };

  $rootScope.togleArticle = () => {
    const elementButton = document.querySelector('.button-article');
    const elementArticle = document.querySelector('.article');
    const isShow = elementButton.getAttribute('data-value');
    console.log(isShow);
    // console.log(elementArticle.getAttribute('length'));
    // debugger;
    // if (isShow) {
    //   elementArticle.setAttribute('length', '100');
    // } else {
    //   debugger;
    //   elementArticle.setAttribute('length', $rootScope.article.length);
    // }
    // debugger
    // isShow ? elementButton.setAttribute('data-value', 'false') : elementButton.setAttribute('data-value', 'true');
    // console.log(document.querySelector('.button-article').getAttribute('data-value'));
    // console.log(document.querySelector('.article'));
  };

  $rootScope.article = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, impedit. Recusandae sequi eum impedit quis delectus eaque molestiae magni illo quaerat sit quos, enim rerum assumenda voluptas nesciunt iste iure dolorum et aliquid natus repudiandae non. Asperiores excepturi fuga aspernatur nulla provident, enim placeat minus illo corporis soluta laudantium est commodi minima suscipit reiciendis temporibus molestias ut rerum voluptatibus eum id doloribus accusantium? Explicabo cumque vel sequi placeat qui quidem voluptate distinctio tempore dolorem rem! Soluta esse sequi in magnam eius autem? Deleniti velit itaque voluptate nemo architecto delectus, labore dolores harum. Numquam aliquid neque id a exercitationem atque perferendis veniam culpa ducimus. Dolorem quia, magnam repellat maiores nulla tempora delectus rem aliquid voluptas voluptate, doloremque accusamus optio? Iusto tenetur autem atque mollitia quis aliquam, quod incidunt minima alias beatae dolore praesentium? Porro voluptatibus facere repellat architecto maiores. Blanditiis repellat, perspiciatis, itaque et eveniet reprehenderit quisquam repudiandae similique vitae doloremque voluptates enim quia maxime nam minima voluptatibus beatae quasi. Qui suscipit tempore repudiandae quis veritatis voluptatem. Vitae, distinctio at odit ea unde iste deserunt quisquam optio perferendis. Quos ducimus dolores molestiae dolorem. Repellat voluptatem nemo officiis, illum numquam vel. Tenetur numquam labore esse dolores similique, sed repudiandae corrupti pariatur fugiat blanditiis voluptatibus consequuntur quos quas at alias est quod fugit explicabo perspiciatis iusto nobis sapiente fuga. Quisquam perspiciatis illo deleniti explicabo totam ipsum, earum vel, obcaecati magnam repellendus quidem, accusamus id minima! Necessitatibus doloremque repudiandae cumque adipisci, sed atque nisi dolorum facilis sunt excepturi repellendus non eligendi a illum ad nemo libero reprehenderit, reiciendis mollitia, eum magni suscipit! Perferendis consequatur, consequuntur ab itaque cumque accusantium debitis error velit. Iusto dicta nemo animi omnis necessitatibus delectus aliquam libero adipisci harum soluta quibusdam, sapiente aut commodi ipsam exercitationem ratione incidunt hic culpa aliquid, quasi corrupti maxime at voluptatum. Corporis minus necessitatibus veritatis.';

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
    scope.$watch(() => el.getAttribute('ng-model'), () => {
      el.value = scope[attrData];
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

    scope.$watch(() => el.getAttribute('ng-show'), () => {
      el.style.display = eval(attrData) ? 'block' : 'none';
    });
  });

  smallAngular.directive('ng-bind', function(scope, el, attrs) {
    const attrData = el.getAttribute('ng-bind');
    el.innerHTML = eval(attrData);

    scope.$watch(() => el.getAttribute('ng-bind'), () => {
      el.innerHTML = eval(attrData);
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
    el.innerHTML = `${scope.article.slice(0, textLength)} ...`;

    scope.$watch(() => textLength, () => {
      el.innerHTML = `${scope.article.slice(0, textLength)} ...`;
    });
  });

  smallAngular.directive('random-color', function(scope, el, attrs) {
    el.addEventListener('click', function() {
      const letters = '0123456789ABCDEF';
      let color = '#';

      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      el.style.backgroundColor = color;
    });
  });

  smallAngular.directive('ng-repeat', function(scope, el) {
    const data = el.getAttribute('ng-repeat');
    const iterable = data.split(' ')[2];
    const parent = el.parentNode;

    scope.$watch(() => iterable, () => {
      const iterableValue = scope[iterable];
      const arrOfElems = Array.from(document.querySelectorAll(`[ng-repeat="${data}"]`));

      for (const elem of arrOfElems) {
        elem.remove();
      }

      for (const item of iterableValue) {
        const nextEl = el.cloneNode();
        nextEl.innerText = item;

        parent.appendChild(nextEl);
      }
    });
  });

  window.smallAngular = smallAngular;

  document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
      window.smallAngular.bootstrap();
    }
  };
}());

