angular.module('angelApp')
.component('cart', {
  templateUrl: 'components/cart/cart.html',
  controller: function ($scope, $location, $window) {
    $scope.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    $scope.quantity = 1
    var storedData = localStorage.getItem("orderCart");
    console.log(storedData)
    $scope.products = JSON.parse(storedData)
    $scope.getSubTotal = function() {
      console.log($scope.products)
      if($scope.products === null){
        return 0
      }
      return $scope.products.reduce(function(total,product){
        return total + (product.currentQuantity * product.price || 0);//for case when this filed not filled
      },0);
    }
    $scope.getGST = function() {
      return ($scope.getSubTotal() * 0.07)
    }
    $scope.getTotal = function() {
      return ($scope.getSubTotal() * 1.07)
    }
    $scope.checkout = function() {
      if(localStorage.getItem("auth_token")==null){
        $location.path( "/login" );
      } else {
        console.log('print receipt')
      }
    }
  }
})
