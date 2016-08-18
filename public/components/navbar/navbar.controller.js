angular.module('angelApp')
  .controller('navbarCtrl', function ($scope, $location, $window) {
    $scope.isLoggedIn = false
    $scope.isAdmin = false
    $scope.user = $window.localStorage.name

    $scope.logout = function () {
      $window.localStorage.clear()
      $location.path('/')
      location.reload()
    }
    if ($window.localStorage.auth_token) {
      $scope.isLoggedIn = true
    }
    if ($window.localStorage.email === 'admin@gmail.com') {
      $scope.isAdmin = true
    }
  })
