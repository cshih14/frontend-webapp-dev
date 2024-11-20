(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // view states
    $stateProvider

      // home page
      .state('home', {
        url: '/',
        templateUrl: 'src/menuapp/templates/home.template.html'
      })

      // categories page
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/menuapp/templates/categories.template.html',
        controller: 'CategoriesController as categoriesController',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      // items page - can have the same type of setup as the categories state.
      .state('items', {
        url: '/categories/{categoriesShortName}',
        templateUrl: 'src/menuapp/templates/items.template.html',
        controller: "ItemsController as itemsController",
        resolve: {
          items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoriesShortName);
          }]
        }
      });

  }

})();
