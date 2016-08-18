/* global angular */
angular.module('angelApp')
.component('signUp', {
  templateUrl: 'components/signup/signup.html',
  controller: function ($location, $window, $http) {
    this.signup = function () {
      if (this.password !== this.confirm) {
        this.error = 'Password does not match!'
        console.log(this.error)
        return
      } else {
        $http({
          url: 'https://aoimpact.herokuapp.com/signup',
          method: 'POST',
          data: {
            name: this.name,
            email: this.email,
            password: this.password
          }
        })
        .success(function (data) {
          console.log(data)
          window.localStorage.name = data.user.name
          window.localStorage.email = data.user.email
          window.localStorage.auth_token = data.user.auth_token
          $location.path('/')
          location.reload()
        })
        .error(function (response) {
          console.log(response)
          this.error = response.error
        })
      }
    }
  }
})
