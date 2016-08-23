angular.module('angelApp')
.component('profile', {
  templateUrl: 'components/profile/profile.html',
  controller: function ($location, $http, $window) {
    this.name = localStorage.getItem('name')
    this.email = localStorage.getItem('email')
  }
})
