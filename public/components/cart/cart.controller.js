angular.module('angelApp')
.component('cart', {
  templateUrl: 'components/cart/cart.html',
  controller: function ($scope, $location, $window, $http) {
    $scope.numbers = []
    $scope.discount
    for(var i = 0; i < 21; i++){
      $scope.numbers[i] = 50 * i
    }
    $scope.quantity = 1
    var storedData = localStorage.getItem("orderCart");
    console.log(storedData)
    $scope.products = JSON.parse(storedData)
    $scope.getSubTotal = function() {
      if($scope.products === null){
        return 0
      }
      return $scope.products.reduce(function(total,product){
        if(product.currentQuantity >= 900){
          $scope.discount = 20
          return total + (product.currentQuantity * product.price)
        } else if (product.currentQuantity >= 500) {
          $scope.discount = 10
          return total + (product.currentQuantity * product.price)
        } else {
          return total + (product.currentQuantity * product.price || 0);//for case when this filed not filled
        }
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
      $scope.products.splice(findById(),1)
      localStorage.setItem('orderCart',JSON.stringify($scope.products));
    }

    $scope.getGST = function() {
      localStorage.setItem('GST', ($scope.getSubTotal() - $scope.getDiscount() || $scope.getSubTotal()) * 0.07)
      return (($scope.getSubTotal() - $scope.getDiscount() || $scope.getSubTotal()) * 0.07)
    }
    $scope.getDiscount = function() {
      localStorage.setItem('discount', $scope.getSubTotal() * 0.01 * $scope.discount )
      return ($scope.getSubTotal() * 0.01 * $scope.discount)
    }
    $scope.getTotal = function() {
      var total = ($scope.getSubTotal() - $scope.getDiscount() || $scope.getSubTotal()) * 1.07
      window.localStorage.total = total
      return total
    }
    $scope.checkout = function() {
      if(localStorage.getItem("auth_token")==null){
        $location.path( "/login" );
      } else {
        $location.path("/checkout")
        // localStorage.setItem('purchasedOrder',JSON.stringify($scope.products));
        // $http({
        //   method: 'PUT',
        //   url: 'http://localhost:3000/addpurchase',
        //   headers: {
        //     'Auth-Token': window.localStorage.auth_token
        //   },
        //   data: {
        //     purchase_history: $scope.products
        //   }
        // })
        // .success(function () {
        //   localStorage.removeItem('purchasedOrder')
        //   localStorage.removeItem('orderCart')
        //   location.reload()
        //   console.log('updated the user history')
        // })
        // .error(function () {
        //   console.log('error')
        // })
      }
    }
  }
})
