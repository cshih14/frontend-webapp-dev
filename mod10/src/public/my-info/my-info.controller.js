(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['user', 'menuItem', 'ApiPath'];
function MyInfoController(user, menuItem, ApiPath) {
  var myInfoCtrl = this;

  myInfoCtrl.user = user;
  myInfoCtrl.menuItem = menuItem;
  myInfoCtrl.basePath = ApiPath;
}

})();
