angular.module('angelApp')
  .service('auth', function($window, $location) {
    this.login = function () {
      if ($window.localStorage.auth_token) {
        return true
      } return false
    }
    this.admin = function () {
      if ($window.localStorage.email === 'admin@gmail.com') {
        return true
      } return false
    }
    this.logout = function () {
      $window.localStorage.clear()
      $location.path('/')
      location.reload()
    }
  })
  .controller('navbarCtrl', function ($scope, $location, $window, auth) {
    $scope.isLoggedIn = function () {
      return auth.login()
    }
    $scope.isAdmin = function () {
      return auth.admin()
    }
    $scope.cartEmpty = true
    $scope.user = $window.localStorage.name
    $scope.logout = function () {
      auth.logout()
    }
  })
