'use strict';

/**
 * @ngdoc function
 * @name soundsAndColorsApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the soundsAndColorsApp
 */
angular.module('soundsAndColorsApp')
	.controller('ResultsCtrl', function ($scope) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
	});
