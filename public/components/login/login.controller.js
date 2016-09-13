/* global angular */
angular.module('angelApp')
.component('login', {
  templateUrl: 'components/login/login.html',
  controller: function ($http, $window, $location) {
      this.login = function () {
      var data = {
        email: this.email,
        password: this.password
      }
      $http({
        method: 'POST',
        // url: 'https://localhost:3000/signin',
        url: 'https://aoimpact.herokuapp.com/signin',
        data: data
      })
      .success(function (data) {
        console.log(data)
        window.localStorage.name = data.user.name
        window.localStorage.email = data.user.email
        window.localStorage.auth_token = data.user.auth_token
        $location.path('/products')
        location.reload()
      })
      .error(function(response) {
        console.log(response.err)
        this.message = response.err
      })
    }
  }
})
