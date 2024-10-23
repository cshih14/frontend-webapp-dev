(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
      .controller('ToBuyController', ToBuyController)
      .controller('AlreadyBoughtController', AlreadyBoughtController)
      .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
      var toBuy = this;
  
      toBuy.items = ShoppingListCheckOffService.getItemsToBuy();
  
      toBuy.buyItem = function (itemIndex) {
          ShoppingListCheckOffService.buyItem(itemIndex);
      };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.items = ShoppingListCheckOffService.getItemsAlreadyBought();
    alreadyBought.getTotalPrice = function (item) {
    if (!isNumeric(item.quantity) || !isNumeric(item.pricePerItem)) {
        return 0;
    } else {
        return item.quantity * item.pricePerItem;
    }
    };
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // List of items to buy 
    var toBuyItems = [
      { name: "cookies", quantity: 10, pricePerItem: 1 },
      { name: "cream", quantity: 1, pricePerItem: 1 },
      { name: "apples", quantity: 8, pricePerItem: 1.5 },
      { name: "potatoes", quantity: 5, pricePerItem: 2 },
      { name: "oranges", quantity: 6, pricePerItem: 3 },
      { name: "cheese", quantity: 2, pricePerItem: .5 }
    ];

    // List of items already bought
    var boughtItems = [];

    service.buyItem = function (itemIndex) {
      // Removes the item from the "To Buy" list
      var itemBeingBought = toBuyItems.splice(itemIndex, 1)[0];    
      // Push item to bought items
      boughtItems.push(itemBeingBought);
    };

    service.getItemsToBuy = function () {
      return toBuyItems;
    };

    service.getItemsAlreadyBought = function () {
      return boughtItems;
    };
  }

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

    
})();    