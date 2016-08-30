/* global angular localStorage location*/
angular.module('angelApp')
.component('products', {
  templateUrl: 'components/products/products.html',
  controller: function ($location, $http, $window, $scope, auth) {
    var storedArray, data
    $scope.isLoggedIn = function () {
      return auth.login()
    }
    console.log($scope.isLoggedIn())
    $scope.isAdmin = function () {
      return auth.admin()
    }
    // defining the variables
    $scope.cart = []
    $scope.default = {name: 'New Item', price: 0, stock: 0, categories: '', description: ''}
    // get products from database
    $http.get('https://aoimpact.herokuapp.com/products')
    .then(function (response) {
      console.log(response.data)
      $scope.products = response.data
    })
    .catch(function (err) {
      console.log('failed to get products ' + err)
    })

    // getting pictures from different instagram accounts
    $scope.search = function () {
      // getting instagram images
      console.log($scope.default.location)
      $http.get('https://aoimpact.herokuapp.com/api?location=' + $scope.default.location)
      .then(function (response) {
        console.log(response.data)
        $scope.responses = response.data
      })
      .catch(function (err) {
        console.log('failed to get instagram images' + err)
      })
    }

    // adding an image
    $scope.addImage = function (imgUrl) {
      localStorage.setItem('url', imgUrl)
      $scope.selectedimage = imgUrl
    }

    // adding a new product to the data base
    $scope.addNewProduct = function () {
      var data = {
        title: $scope.default.name,
        price: $scope.default.price,
        description: $scope.default.description,
        picture: localStorage.getItem('url'),
        stock: $scope.default.stock,
        categories: $scope.default.categories
      }
      console.log(data)
      $http({
        method: 'POST',
        url: 'https://aoimpact.herokuapp.com/newproduct/' ,
        headers: {
          'User-Email': window.localStorage.email
        },
        data: data
      })
      .success(function (data) {
        console.log(data)
        localStorage.removeItem('url')
        $location.path('/products')
        location.reload()
      })
    }
    // editing existing product to the data base
    $scope.savePost = function (productId) {
      console.log("halo")
      var data = {
        title: this.product.title,
        price: this.product.price,
        description: this.product.description
      }
      console.log(data)
      $http({
        method: 'PATCH',
        url: 'https://aoimpact.herokuapp.com/product/' + productId,
        headers: {
          'User-Email': window.localStorage.email
        },
        data: data
      })
      .success(function (data) {
        console.log(data)
        $location.path('/products')
        location.reload()
      })
    }

    // adding to cart
    $scope.addToCart = function (productId, title, price) {
      if (localStorage.getItem('orderCart')) {
        storedArray = localStorage.getItem('orderCart')
        data = JSON.parse(storedArray)
        data.push({id: productId, item: title, price: price})
      } else {
        $scope.cart.push({id: productId, item: title, price: price})
        console.log($scope.cart)
        // localStorage.setItem("orderCart",  JSON.stringify($scope.cart));
      }
      localStorage.setItem('orderCart', JSON.stringify(data || $scope.cart))
    }

    // increasing the like button
    $scope.interest = function (productId, likes) {
      console.log(this.product.stock + 1)
      this.product.stock += 1
      $http({
        method: 'POST',
        // subjected to update
        url: 'https://aoimpact.herokuapp.com/popular/' + productId,
        headers: {
          'User-Email': window.localStorage.email,
          'Auth-Token': window.localStorage.auth_token
        },
        data: {
          stock: likes
        }
      })
      .success(function () {
        console.log('updated')
      })
      .error(function () {
        location.reload()
      })
    }

    // delete the existing product
    $scope.delete = function (productId) {
      console.log(productId)
      $http({
        method: 'DELETE',
        url: 'https://aoimpact.herokuapp.com/product/' + productId,
        headers: {
          'User-Email': window.localStorage.email
        }
      })
      .success(function () {
        console.log('deleted')
        location.reload()
      })
    }
  }
})
