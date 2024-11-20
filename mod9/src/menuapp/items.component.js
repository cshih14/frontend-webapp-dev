(function () {
  'use strict';

  //  create a component called items that shows all of the menu items for a particular category.
  angular.module('MenuApp')
    .component('items', {
      templateUrl: 'src/menuapp/templates/items.template.html',
      bindings: {
        items: '<'
      }
    });

})();
