(function() {
  'use strict';

   angular.module('locationDataUi')
      .controller('gddd', function ($scope) {
          
          $scope.model = 0;
          
          $scope.initSlider = function () {
              $(function () {
                // wait till load event fires so all resources are available
                  $scope.$slider = $('#slider').slider({
                      slide: $scope.onSlide
                  });
              });

              $scope.onSlide = function (e, ui) {
                 $scope.model = ui.value;
                 $scope.$digest();
              };
          };
          
          $scope.initSlider();
    });
})();
