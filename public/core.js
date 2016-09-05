/* globals angular */
angular.module('angelApp', ['ngRoute', 'ngAnimate', 'ngTouch', 'ui.bootstrap', 'mgcrea.ngStrap', 'angularPayments'])
.config(function ($routeProvider, $locationProvider) {
  window.Stripe.setPublishableKey('pk_test_C9Xo9LthAymEaHpYEBuyssg6')
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
  .when('/products', {
    template: '<products></products>'
  })
  .when('/cart', {
    template: '<cart></cart>'
  })
  .when('/checkout', {
    template: '<checkout></checkout>'
  })
  .otherwise({
    redirectTo: '/'
  })
})
