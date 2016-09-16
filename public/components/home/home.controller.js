/* global angular */
angular.module('angelApp')
.component('home', {
  templateUrl: 'components/home/home.html',
  controller: function ($scope) {
    $scope.myInterval = 2500;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    $scope.texts=["With our help, women entrepreneurs can change their world", "Invest in impactful enterprises", "Adopt a new funding model", "Invest in ethically and sustainably produced goods and services", "Seeks to create a better world for all and generations to come"]
    var slides = $scope.slides = [];
    console.log($scope.slides)
    var currIndex = 0;

    $scope.addSlide = function() {
      var newWidth = 1100 + slides.length + 1;
      slides.push({
        image: '//unsplash.it/' + newWidth + '/500',
        id: currIndex++
      });
    };

    for (var i = 0; i < 5; i++) {
      $scope.addSlide();
    }
  }
})
