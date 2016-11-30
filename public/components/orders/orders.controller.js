angular.module('angelApp')
.component('orders', {
  templateUrl: 'components/orders/orders.html',
  controller: function ($location, $http, $window, $scope, auth) {
    $scope.isLoggedIn = function () {
      return auth.login()
    }
    $scope.isAdmin = function () {
      return auth.admin()
    }
    // pickup
    $http({
      method: 'GET',
      url: 'https://aoimpact.herokuapp.com/orders',
      headers: {
        'User-Email': window.localStorage.email
      }
    })
    .success(function (data) {
      console.log(data)
      $scope.orders = data
    })
    .error(function () {
      console.log('unable to update')
    })
  }
})
