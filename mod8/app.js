(function () {
    'use strict';
  
    angular.module('NarrowItDownApp', [])
      .controller('NarrowItDownController', NarrowItDownController)
      .service('MenuSearchService', MenuSearchService)
      .directive('foundItems', FoundItemsDirective)
      .constant('ApiBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com');
  
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var narrowItDown = this;
  
      narrowItDown.getMatchedMenuItems = function (searchValue) {
        // if there is no search term then return an empty array
        if (!searchValue || searchValue === '') {
          narrowItDown.found = [];
        } else {
          MenuSearchService.getMatchedMenuItems(searchValue)
            .then(function (result) {
              narrowItDown.found = result;
            }).catch(function (error) {
                console.error("Error fetching menu items:", error);
            });
        }
      };
  
      narrowItDown.removeItemAtIndex = function (index) {
        narrowItDown.found.splice(index, 1);
      }
    }
  
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
      var service = this;
  
      service.getMatchedMenuItems = function (searchTerm) {
        var config = {
          method: "GET",
          url: (ApiBasePath + "/menu_items.json")
        };
      
        return $http(config).then(function (result) {
          console.log(result);
          // Initialize an empty array to hold matched items
          var matchedItems = [];
      
          // Loop through the categories in the response
          for (var category in result.data) {
            // Access menu_items array for each category
            var items = result.data[category].menu_items;
            matchedItems = matchedItems.concat(items.filter(item => item.description.indexOf(searchTerm) !== -1));
          }
          
          return matchedItems;
        }).catch(function (error) {
          console.error("Error fetching menu items:", error);
          return [];
        });
      };      
    }
  
    function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
          found: '<',
          onRemove: '&'
        }
      };
  
      return ddo;
    }
})();