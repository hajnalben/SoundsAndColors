'use strict';

/**
 * @ngdoc function
 * @name soundsAndColorsApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the soundsAndColorsApp
 */
angular.module('soundsAndColorsApp')
	.controller('TestCtrl', function ($scope) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
	});
