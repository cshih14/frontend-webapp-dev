(function () {
  'use strict';

  // create component called categories that shows all available categories in the menu to the user.
  angular.module('MenuApp')
    .component('categories', {
      templateUrl: 'src/menuapp/templates/categories.template.html',
      bindings: {
        categories: '<'
      }
    });

})();
