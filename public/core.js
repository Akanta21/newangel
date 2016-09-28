/* globals angular */
angular.module('angelApp', ['ngRoute', 'ngAnimate', 'ngTouch', 'ui.bootstrap', 'mgcrea.ngStrap'])
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    template: '<products></products>'
  })
  .when('/home', {
    template: '<home></home>'
  })
  .when('/aboutus', {
    template: '<aboutus></aboutus>'
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
  .when('/products', {
    template: '<products></products>'
  })
  .when('/cart', {
    template: '<cart></cart>'
  })
  .when('/checkout', {
    template: '<checkout></checkout>'
  })
  .when('/delivery', {
    template: '<delivery></delivery>'
  })
  .otherwise({
    redirectTo: '/'
  })
})
