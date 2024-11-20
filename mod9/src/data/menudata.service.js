(function () {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService)
        .constant('ApiBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com');

    MenuDataService.$inject = ['$http', 'ApiBasePath'];
    function MenuDataService($http, ApiBasePath) {
        var menuService = this;
        // getAllCategories - this method should return a promise which is a result of using the 
        // $http service, using the following REST API endpoint: 
        // https://coursera-jhu-default-rtdb.firebaseio.com/categories.json)
        menuService.getAllCategories = function () {
            var config = {
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            };

            return $http(config).then(function (response) {
                return response.data;
            });
        };

        // getItemsForCategory(categoryShortName) - this method should return a promise which is a 
        // result of using the $http service, using the following REST API endpoint: 
        //https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/{categoryShortName}.json, 
        //where, before the call to the server, your code should append whatever categoryShortName 
        //value was passed in as an argument into the getItemsForCategory method.
        menuService.getItemsForCategory = function (categoryShortName) {
            var config = {
                method: "GET",
                url: (ApiBasePath + "/menu_items/" + categoryShortName+".json")
            };

            return $http(config).then(function (response) {
                return response.data;
            });
        };
    }

})();
