angular.module("cart", [])
.factory("cart", function () {
	var cartData = [];
	return {
		//add product to cart
		addProduct: function (id, name, price) {
			var isExist = false;
			for (var i = 0; i < cartData.length; i++) {
				if(cartData[i].id == id) {
					cartData[i].count ++;
					isExist = true;
					break;
				}
			};
			if(!isExist) {
				cartData.push({
					"count": 1, "id": id, "price": price, "name": name
				});
			}
		},
		//remove product from cart by id
		removeProduct: function (id) {
			for (var i = 0; i < cartData.length; i++) {
				if(cartData[i].id == id) {
					cartData.splice(i, 1);
					break;
				}
			};
		},
		//get products' information
		getProducts : function() {
			return cartData;
		}
	}
})
.directive("cartSummary", function(cart) {
	return {
		restrict: "E",
		templateUrl: "components/cart/cartSummary.html",
		controller: function($scope) {
			var cartData = cart.getProducts();
			$scope.total = function() {
				var total = 0;
				for (var i = 0;	i < cartData.length; i++) {
					total += cartData[i].price * cartData[i].count; 
				};
				return total;
			}
			$scope.itemCount = function() {
				var total = 0;
				for (var i = 0; i < cartData.length; i++) {
					total += cartData[i].count;
				}
				return total;
			}
		}
	}
});