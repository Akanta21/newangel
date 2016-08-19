/* globals angular */
angular.module('angelApp', ['ngRoute', 'ngAnimate', 'ngTouch', 'ui.bootstrap'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      template: '<home></home>'
    })
    .when('/signup', {
      template: '<sign-up></sign-up>'
    })
    .when('/login', {
      template: '<login></login>'
    })
    .when('/profile', {
      template: '<profile></profile>'
    })
    .otherwise({
      redirectTo: '/'
    })
  })
