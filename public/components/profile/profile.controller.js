angular.module('angelApp')
.component('profile', {
  templateUrl: 'components/profile/profile.html',
  controller: function ($location, $scope, $http, $window) {
    this.name = localStorage.getItem('name')
    this.email = localStorage.getItem('email')
    $http({
      method: 'GET',
      url:'https://aoimpact.herokuapp.com/user',
      headers: {
      'Auth-Token': window.localStorage.auth_token
      }
    })
    .success(function (data) {
      $scope.purchases = data.user.purchase_history
      console.log(data)
      console.log($scope.purchases)
    })
  }
})
