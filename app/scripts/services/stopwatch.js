'use strict';

/**
 * @ngdoc service
 * @name soundsAndColorsApp.stopwatch
 * @description
 * # stopwatch
 * Factory in the soundsAndColorsApp.
 */
angular.module('soundsAndColorsApp')
    .factory('stopwatch', function($timeout) {

        var delay = 10;

        var data = {
            value: 0,
            laps: []
        };

        var stopwatch = null;

        var start = function() {
            stopwatch = $timeout(function() {
                data.value++;
                start();
            }, delay);
        };

        var stop = function() {
            $timeout.cancel(stopwatch);
            stopwatch = null;

            return data.value * delay;
        };

        var reset = function() {
            var tmp = data.value;

            stop();
            data.value = 0;
            data.laps = [];

            return tmp * delay;
        };

        var lap = function() {
            data.laps.push(data.value);
        };

        return {
            data: data,
            start: start,
            stop: stop,
            reset: reset,
            lap: lap
        };
    });
