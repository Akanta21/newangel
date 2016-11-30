angular.module('angelApp')
.component('cart', {
  templateUrl: 'components/cart/cart.html',
  controller: function ($scope, $location, $window, $http, auth) {
    $scope.isAdmin = function () {
      return auth.admin()
    }
    var storedArray
    var storedData = localStorage.getItem('orderCart')
    var storedCart = localStorage.getItem('checkout')
    $scope.numbers = []
    $scope.checkoutCart = []
    $scope.discountCode
    $scope.discount
    $scope.deliveryAdd
    for(var i = 0; i < 21; i++){
      $scope.numbers[i] = i
    }
    $scope.quantity = 1
    $scope.products = JSON.parse(storedData)
    $scope.subtotal = localStorage.getItem('subtotal')

    $scope.currentQuantity = function(item){
      var cartQuantity
      var checkoutArray = JSON.parse(storedCart)
      if(!checkoutArray){
        cartQuantity = 0
      } else {
        checkoutArray.filter(function match(cart){
          // console.log(cart.item)
          // console.log(item)
          if(cart.item === item){
            cartQuantity = cart.quantity
          }
        })
      }
      // console.log(cartQuantity)
      return cartQuantity
    }

    $scope.getSubTotal = function() {
      var subtotal
      if($scope.products === null){
        return 0
      }
      return $scope.products.reduce(function(total,product){
        if($scope.discountCode == 'ai@fb'){
          $scope.discount = 1
          return total + ((product.currentQuantity || $scope.currentQuantity(product.item)) * product.price) - $scope.discount
        } else {
          subtotal = total + ((product.currentQuantity || $scope.currentQuantity(product.item)) * product.price)
          console.log(subtotal)
          localStorage.setItem('Subtotal', subtotal)
          return (total + ((product.currentQuantity || $scope.currentQuantity(product.item)) * product.price)|| 0);//for case when this filed not filled
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
    $scope.getDiscount = function() {
      localStorage.setItem('discount', $scope.discount )
      return $scope.discount
    }
    $scope.getDelivery = function() {
      localStorage.setItem('delivery', $scope.deliveryAdd)
      const deliveryCost = $scope.deliveryAdd * 25
      return deliveryCost
    }
    $scope.getTotal = function() {
      var total = ($scope.getSubTotal() - $scope.getDiscount() + $scope.getDelivery() || $scope.getSubTotal() + $scope.getDelivery())
      window.localStorage.total = total
      return total
    }
    // add to checkout
    $scope.saveOrder = function (title, price) {
      storedArray = localStorage.getItem('checkout')
      var data = JSON.parse(storedArray)
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
        // console.log("list", list)
        list.forEach(function(obj) {
          if (obj.item === name) obj.quantity = qty;
        });
      }
      this.$watch("product.currentQuantity", function(newValue){
        if(localStorage.getItem('checkout') && newValue){
          if(containsObject(title, data)){
            // console.log(title)
            replaceQuantity(newValue, title, data)
            $scope.updatedQuantity = newValue
          } else {
            data.push({item:title, price:price, quantity: newValue})
          }
          localStorage.setItem('checkout', JSON.stringify(data))
        } else if(newValue) {
          if(!containsObject(title, data)){
            $scope.checkoutCart.push({item:title, price: price, quantity: newValue})
            localStorage.setItem('checkout', JSON.stringify($scope.checkoutCart))
          }
          else{
            console.log('Halo')
          }
        }
      })
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
            customer_email: localStorage.getItem('email'),
            orders: localStorage.getItem('checkout'),
            price: localStorage.getItem('total')
          }
        })
        .success(function () {
          localStorage.removeItem('checkout')
          localStorage.removeItem('orderCart')
          $location.path("/delivery")
        })
        .error(function (data) {
          console.log(data.error)
        })
      }
    }
  }
})
