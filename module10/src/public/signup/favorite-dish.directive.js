(function () {
  "use strict";

  angular.module('public')
    .directive('favoriteDish', FavoriteDishDirective);

  FavoriteDishDirective.$inject = ['$q', 'MenuService'];
  function FavoriteDishDirective($q, MenuService) {

    var favoriteDishDirective = {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {

        ctrl.$asyncValidators.favoriteDish = function (shortName) {
          if (ctrl.$isEmpty(shortName)) {
            return $q.when();
          } else {
            return MenuService.doesMenuItemExist(shortName).then(function (response) {
              if(response === true){
                return $q.resolve();
              } else {
                return $q.reject();
              }
            }).catch(function (error) {
              return $q.reject();
            });
          }
        }
      }
    };

    return favoriteDishDirective;
  }
})();