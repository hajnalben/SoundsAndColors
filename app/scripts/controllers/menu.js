'use strict';

/**
 * @ngdoc function
 * @name soundsAndColorsApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the soundsAndColorsApp
 */
angular.module('soundsAndColorsApp')
	.controller('MenuCtrl', function ($scope, $location, $translate) {

		$scope.menus = {
			"menu.home": {
				href: "home"
			},
			"menu.test": {
				href: "test"
			},
			"menu.results": {
				href: "results"
			}
		}

		$scope.navClass = function (page) {
			var currentRoute = $location.path().substring(1) || 'home';

			return page === currentRoute ? 'active' : '';
		};

		$scope.getLang = function () {
			return ($translate.use() === 'hu') ? 'English' : 'Magyar';
		};

		$scope.changeLang = function () {
			$translate.use(($translate.use() === 'hu') ? 'en' : 'hu');
		};

	});
