(function () {
  'use strict';
    
  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController)
    
  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.message = "";
    $scope.messageStyle = "";

    $scope.checkLunchList = function () {
      $scope.message = getMessage($scope.lunchList);
      $scope.messageStyle = getMessageStyle($scope.message);
    }
  }
  
  function getMessage(lunchList) {
    if (!lunchList || lunchList.length === 0) {
      return "Please enter data first";
    }

    var lunchItems = lunchList.split(',')

    if (lunchItems.length === 0) {
      return "Please enter data first";
    } else if (lunchItems.length > 3) {
      return "Too much!";
    } else {
      return "Enjoy!";
    }
  }

  function getMessageStyle(message) {
    if (message === "Please enter data first") {
      return "warning-message";
    } else {
      return "success-message";
    }
  }
  
})();