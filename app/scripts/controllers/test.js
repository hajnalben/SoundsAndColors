'use strict';

/**
 * @ngdoc function
 * @name soundsAndColorsApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the soundsAndColorsApp
 */
angular.module('soundsAndColorsApp')
    .controller('TestCtrl', ['$scope', '$timeout', 'stopwatch', '$location', '$http', 'files',
        function($scope, $timeout, stopwatch, $location, $http, files) {

            $scope.testState = 0;

            $scope.nextState = function() {
                $scope.testState++;

                if ($scope.testState === 2) {
                    $scope.playSound();
                }
            };

            // Pre-questions
            $scope.sex = 'man';
            $scope.age = 25;
            $scope.level = 1;

            // Sound test
            $scope.soundState = 0;
            $scope.progress = 0;
            $scope.circleVisible = false;
            $scope.isPlayingSound = false;

            $scope.playSound = function() {
                if ($scope.isPlayingSound) {
                    return;
                }

                $scope.isPlayingSound = true;
                $scope.circleVisible = false;

                var track = new Audio('sounds/' + files[$scope.soundState]);

                console.log('Wait before sound');

                // 2 sec vár
                $timeout(function() {

                    // hangot lejátszik
                    console.log('Playing sound');

                    track.play();

                }, 2000).then(function() {

                    console.log('Waiting for sound to end');

                    // hangot és + 1 sec-et vár
                    $timeout(function() {
                        console.log('Painting circle');

                        $scope.isPlayingSound = false;
                        $scope.circleVisible = true;
                        stopwatch.start();

                    }, track.duration * 1000 + 1000);

                });
            };

            $scope.chooseColor = function(points) {

                var sound = {
                    file: files[$scope.soundState],
                    time: stopwatch.reset(),
                    color: points[0].fillColor
                };

                sounds.push(sound);

                console.log(sound);

                if ($scope.soundState >= files.length - 1) {
                    $scope.progress = 100;

                    // Adatok felküldése egyben

                    $http.post('/insert.php', {
                        sex: $scope.sex,
                        age: $scope.age,
                        level: $scope.level,
                        sounds: sounds
                    }).
                    then(function(response) {
                        // this callback will be called asynchronously
                        // when the response is available

                        console.log(response);

                        $location.search({
                            'fromTest': 'true'
                        });

                        $location.path('results');

                    }, function(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.

                        console.log(response);

                        $location.search({
                            'error': 'true'
                        });

                        $location.path('results');
                    });

                    return;
                }

                $scope.soundState++;
                $scope.progress = Math.ceil(($scope.soundState / files.length) * 100);

                $scope.playSound();
            };

            // Needed for rendering only
            $scope.labels = ['', '', '', '', '', '', '', '', '', '', '', ''];
            $scope.data = [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30];

            // Results
            var sounds = [];

        }
    ]);
