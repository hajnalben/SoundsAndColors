'use strict';

/**
 * @ngdoc overview
 * @name soundsAndColorsApp
 * @description
 * # soundsAndColorsApp
 *
 * Main module of the application.
 */
angular
  .module('soundsAndColorsApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'LocalStorageModule',
    'pascalprecht.translate'
  ])
  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('ls');
  }])
  .config(function ($translateProvider, $translatePartialLoaderProvider) {

    var template = {
      urlTemplate: '/localization/{lang}/{part}.json'
    };

    $translatePartialLoaderProvider.addPart('main');

    $translateProvider.useLoader('$translatePartialLoader', template)
      .useSanitizeValueStrategy('escaped')
      .useMissingTranslationHandlerLog()
      .preferredLanguage('hu')
      .useLoaderCache(true);

  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/test', {
        templateUrl: 'views/test.html',
        controller: 'TestCtrl'
      })
      .when('/results', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
