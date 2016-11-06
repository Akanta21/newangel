// function to check if object is in array
  function containsObject(obj, list) {
  var i;
  for (i in list) {
    if (list[i].item === obj) {
      return true;
    }
  }
  return false;
}
// function to replace quantity when it is changed
function replaceQuantity(qty, name, list) {
  list.forEach(function(obj) {
    if (obj.item === name) obj.quantity = qty;
  });
}
$scope.saveOrder = function (title, price, quantity) {
  storedArray = localStorage.getItem('checkout')
  data = JSON.parse(storedArray)
  // if qty != 0
  if(quantity){

    if (localStorage.getItem('checkout')) {

      if(containsObject(title, data)){
        this.$watch("product.currentQuantity", function (newValue) {
          replaceQuantity(newValue, title, data)
          localStorage.setItem('checkout', JSON.stringify(data || $scope.checkoutCart))
        })
      }
    // if qty != 0
      else {
        data.push({item: title, price: price, quantity: quantity})
      }
    }
    else {
      $scope.checkoutCart.push({item: title, price: price, quantity: quantity})
    }
    console.log(data)
    // localStorage.setItem('checkout', JSON.stringify(data || $scope.confirmCart))
  }
  else {
    console.log('return')
    //
    if(containsObject(title, data)){
      this.$watch("product.currentQuantity", function (newValue) {
        replaceQuantity(newValue, title, data)
        localStorage.setItem('checkout', JSON.stringify(data || $scope.checkoutCart))
      })
    }
      data.push({item: title, price: price, quantity: quantity})

  }
  console.log(data)
  localStorage.setItem('checkout', JSON.stringify(data || $scope.checkoutCart))
}
