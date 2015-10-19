'use strict';

function fillColors() {

    var colors = {
        'fekete': '#000000',
        'fehér': '#FFFFFF',
        'szürke': '#999999',
        'olivazöld': '#808040',
        'citromsárga': '#FFFF00',
        'halványsárga': '#FFFF99',
        'naracssárga': '#FF9900',
        'rózsaszín': '#FF99FF',
        'vörösesbarna': '#CC0000',
        'piros': '#FF0000',
        'sötétlila': '#800080',
        'világos lila': '#CC66FF',
        'sötétkék': '#0033CC',
        'világoskék': '#99CCFF',
        'sötétzöld': '#008000',
        'világoszöld': '#00FF00',
        'sötétbarna': '#663300',
        'világosbarna': '#996633'
    };

    var hexColors = [];
    var chartColors = [];

    for (var c in colors) {
        var colorName = c;
        var hex = colors[c];

        chartColors.push({
            name: colorName,
            fillColor: hex,
            strokeColor: hex,
            highlightFill: hex,
            highlightStroke: hex
        });

        hexColors.push(hex);
    }

    return {
        chartColors: chartColors,
        hexColors: hexColors,
        colors: colors
    };
}

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
        'LocalStorageModule',
        'pascalprecht.translate',
        'chart.js',
        'rzModule'
    ])
    .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('ls');
    }])
    .constant('colors', fillColors())
    .constant('files', ['a.mp3', 'b.mp3', 'c.mp3', 'd.mp3', 'e.mp3', 'f.mp3', 'g.mp3', 'h.mp3', 'i.mp3', 'j.mp3', 'k.mp3', 'l.mp3', 'm.mp3'])
    .config(['ChartJsProvider', 'colors', function (ChartJsProvider, colors) {

        // Configure all charts
        ChartJsProvider.setOptions({
            colours: colors.chartColors,
            responsive: true,
            showTooltips: false,
            animationEasing: 'easeOutQuart',
            animationSteps: 60,
            maintainAspectRatio: true
        });

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
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
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
