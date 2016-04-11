'use strict';

/**
 * @ngdoc function
 * @name soundsAndColorsApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the soundsAndColorsApp
 */
angular.module('soundsAndColorsApp')
    .controller('ResultsCtrl', ['$scope', '$location', 'colors', 'files', 'aggregationService',
        function($scope, $location, colors, files, aggregationService) {
            $scope.fromTest = $location.search().fromTest;
            $scope.colors = colors.colors;
            $scope.files = files;


            aggregationService.getFileColorCount().then(function(aggs) {
                $scope.aggs = aggs;
            });
        }
    ]);
