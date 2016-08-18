/* global angular */
angular.module('angelApp')
.component('home', {
  templateUrl: 'components/home/home.html',
  controller: function ($scope) {
    $scope.myInterval = 2500;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    console.log($scope.slides)
    var currIndex = 0;

    $scope.addSlide = function() {
      var newWidth = 800 + slides.length + 1;
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
