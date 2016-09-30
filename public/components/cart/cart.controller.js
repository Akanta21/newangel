angular.module('angelApp')
.component('cart', {
  templateUrl: 'components/cart/cart.html',
  controller: function ($scope, $location, $window, $http) {
    var storedArray, data
    var storedData = localStorage.getItem('orderCart')
    $scope.numbers = []
    $scope.checkoutCart = []
    $scope.discountCode
    $scope.discount
    for(var i = 0; i < 21; i++){
      $scope.numbers[i] = 50 * i
    }
    $scope.quantity = 1
    $scope.products = JSON.parse(storedData)

    $scope.getSubTotal = function() {
      if($scope.products === null){
        return 0
      }
      return $scope.products.reduce(function(total,product){
        if($scope.discountCode == 'ai@fb'){
          $scope.discount = 1
          return total + (product.currentQuantity * product.price)
        } else {
          return total + (product.currentQuantity * product.price || 0);//for case when this filed not filled
        }
      },0);
    }

    $scope.removeItem = function(id, title) {
      function findById(){
        for(var i=0; i<$scope.products.length; i++){
          if($scope.products[i].id === id){
              return i
          }
        }
      }
      function findByTitle(){
        for(var i=0; i<$scope.products.length; i++){
          if($scope.checkoutCart[i].item === title){
              return i
          }
        }
      }
      $scope.products.splice(findById(),1)
      $scope.checkoutCart.splice(findByTitle(),1)
      console.log($scope.products)
      console.log($scope.checkoutCart)
      localStorage.setItem('checkout',JSON.stringify($scope.checkoutCart));
      localStorage.setItem('orderCart',JSON.stringify($scope.products));
    }

    $scope.getGST = function() {
      localStorage.setItem('GST', ($scope.getSubTotal() - $scope.getDiscount() || $scope.getSubTotal()) * 0.07)
      return (($scope.getSubTotal() - $scope.getDiscount() || $scope.getSubTotal()) * 0.07)
    }

    $scope.getDiscount = function() {
      localStorage.setItem('discount', $scope.discount )
      return $scope.discount
    }

    $scope.getTotal = function() {
      var total = ($scope.getSubTotal() - $scope.getDiscount() || $scope.getSubTotal()) * 1.07
      window.localStorage.total = total
      return total
    }
    // add to checkout
    $scope.saveOrder = function (title, price) {
      // function to check if object is in array
        function containsObject(obj, list) {
        var i;
        for (i in list) {
          if (list[i].item === obj) {
            return true;
          }
        }
        return false;
      }
      // function to replace quantity when it is changed
      function replaceQuantity(qty, name, list) {
        console.log("list", list)
        list.forEach(function(obj) {
          if (obj.item === name) obj.quantity = qty;
        });
      }
      this.$watch("product.currentQuantity", function(newValue){
        if(localStorage.getItem('checkout') && newValue){
          storedArray = localStorage.getItem('checkout')
          data = JSON.parse(storedArray)
          console.log(data.length)
          if(containsObject(title, data)){
            replaceQuantity(newValue, title, data)
          } else {
            console.log('push')
            data.push({item:title, price:price, quantity: newValue})
          }
          localStorage.setItem('checkout', JSON.stringify(data))
        } else {
          $scope.checkoutCart.push({item:title, price: price, quantity: newValue})
          localStorage.setItem('checkout', JSON.stringify($scope.checkoutCart))
        }
      })
    }
    // reset
    $scope.reset = function() {
      localStorage.removeItem('checkout')
    }
    $scope.checkout = function() {
      if(localStorage.getItem("auth_token")==null){
        $location.path( "/login" );
      } else {
        $location.path("/checkout")

      }
    }
    $scope.delivery = function() {
      if(localStorage.getItem("auth_token")==null){
        $location.path( "/login" );
      } else {
        $http({
          method: 'POST',
          url: 'http://localhost:3000/neworder',
          data: {
            customer_email: localStorage.getItem('')
          }
        })
        .success(function () {
          localStorage.removeItem('purchasedOrder')
          localStorage.removeItem('orderCart')
          location.reload()
          console.log('updated the user history')
        })
        .error(function () {
          console.log('error')
        })
        $location.path("/delivery")
      }
    }
  }
})
