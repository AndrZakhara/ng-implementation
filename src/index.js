(function() {
  const directives = [{}]

const smallAngular = {
  directive() {

  },
  compile(node){
    directives['ng-click'].forEach(cb => cb(node))
  },
  bootstrap(node) {

    node.queryselectorAll('*').forEach(el => {
      compile(el)
    })
  }
}

smallAngular.directive('ng-model', function(el){

})
smallAngular.directive('ng-click', function(el){

})

smallAngular.directive('ng-show', function(el){

})

smallAngular.directive('ng-hide', function(el){

})
window.smallAngular = smallAngular;
})()

smallAngular.directive('make_short', function(el){

})

smallAngular.bootstrap(node)
