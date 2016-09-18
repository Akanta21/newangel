/* global & $ */
angular.module('angelApp')
.component('checkout', {
  templateUrl: 'components/checkout/checkout.html',
  controller: function ($scope) {
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
        $form.find('.payment-errors').text(response.error.message)
        $form.find('.submit').prop('disabled', false) // Re-enable submission
      } else { // Token was created!

        // Get the token ID:
        var token = response.id

        $scope.token = token

        return true
        // // Insert the token ID into the form so it gets submitted to the server:
        // $form.append($('<input type="hidden" name="stripeToken">').val(token))
        //
        // // Submit the form:
        // $form.get(0).submit()
      }
    }
  }
})
