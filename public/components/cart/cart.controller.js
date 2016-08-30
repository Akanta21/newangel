angular.module('angelApp')
.component('cart', {
  templateUrl: 'components/cart/cart.html',
  controller: function ($scope, $location, $window) {
    $scope.numbers = []
    for(var i = 0; i < 21; i++){
      $scope.numbers[i] = i
    }
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
    $scope.removeItem = function(id) {
      function findById(){
        for(var i=0; i<$scope.products.length; i++){
          if($scope.products[i].id === id){
              console.log(i)
              return i
          }
        }
      }
      console.log($scope.products)
      $scope.products.splice(findById(),1)
      console.log($scope.products)
      localStorage.setItem('orderCart',JSON.stringify($scope.products));
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
