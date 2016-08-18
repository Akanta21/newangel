angular.module('angelApp')
.component('profile', {
  templateUrl: 'components/profile/profile.html',
  controller: function ($location, $http, $window) {
    $http({
      method: 'GET',
      url: 'https://aoimpact.herokuapp.com/user',
      headers: {
        'User-Email': window.localStorage.email,
        'Auth-Token': window.localStorage.auth_token
      }
    })
    .success((data) => {
      console.log(data.currentUser)
      this.user = data.currentUser
      this.purchases = data.currentUser.purchase_history
    })
    .error((response) => {
      console.log(response.err)
      this.message = response.err
    })
  }
})
