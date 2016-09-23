/* global & $ */
angular.module('angelApp')
.component('checkout', {
  templateUrl: 'components/checkout/checkout.html',
  controller: function ($scope, $http, $location) {
    $scope.total = localStorage.getItem('total')
    // Stripe Response Handler
    var $form = $('#payment-form')
    $form.submit(function (event) {
      // Disable the submit button to prevent repeated clicks:
      $form.find('.submit').prop('disabled', true)
      // Request a token from Stripe:
      Stripe.card.createToken($form, $scope.stripeResponseHandler)
      // Prevent the form from being submitted:
      return false
    })
    $scope.stripeResponseHandler = function (status, response) {
      // Grab the form:
      var $form = $('#payment-form')

      if (response.error) { // Problem!

        // Show the errors on the form:
        $form.find('.payment-errors').removeClass('hide')
        $form.find('.payment-errors').text(response.error.message)
        $form.find('.submit').prop('disabled', false) // Re-enable submission
      } else { // Token was created!

        // Get the token ID:
        var token_id = response.id

        console.log(token_id)

        // // Insert the token ID into the form so it gets submitted to the server:
        // $form.append($('<input type="hidden" name="stripeToken">').val(info.id))

        // Submit the form:
        $http({
          method: 'POST',
          url: 'http://localhost:3000/payment',
          // headers: {
          //   'total': window.localStorage.total,
          //   'customer_email': window.localStorage.email
          // },
          data: {
            stripeToken: token_id,
            email: window.localStorage.getItem('email'),
            total: window.localStorage.getItem('total') * 100
          }
        })
        .success(function (data) {
          console.log(data)
          window.localStorage.removeItem('total')
          window.localStorage.removeItem('orderCart')
          window.localStorage.removeItem('GST')
          window.localStorage.removeItem('discount')
          $location.path('/')
        })
        .error(function (response) {
          console.log(response.error)
          $scope.error = response.error
        })
      }
    }
  }
})
