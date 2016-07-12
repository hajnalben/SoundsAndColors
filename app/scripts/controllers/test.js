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
        function ($scope, $timeout, stopwatch, $location, $http, files) {

            $scope.testState = 0;

            $scope.nextState = function () {
                $scope.testState++;

                if ($scope.testState === 2) {
                    $scope.playSound();
                }
            };

            // Pre-questions
            $scope.formData = {
                sex : 'man',
                age : 25,
                level : 1
            };

            // Sound test
            $scope.progress = 0;
            $scope.trackIndex = 0;
            $scope.trackState = 0;
            $scope.selectedColor = null;

            $scope.playSound = function () {
                // Resetting state
                $scope.trackState = 0;

                var track = new Audio('sounds/' + files[$scope.trackIndex]);

                console.log('Waiting before sound');

                $timeout(playTrack, 2000).then(waitAfterTrack);

                function playTrack() {
                    console.log('Playing sound');

                    track.play();
                }

                function waitAfterTrack() {
                    console.log('Waiting for sound to end');

                    $timeout(paintCircle, track.duration * 1000 + 1000);
                }

                function paintCircle() {
                    console.log('Painting circle');

                    $scope.trackState = 1;
                    stopwatch.start();
                }
            };

            $scope.chooseColor = function (points) {
                $scope.selectedColor = points[0].fillColor;
                $scope.trackState = 2;
            };

            $scope.chooseSide = function (side) {
                $scope.side = side;

                addSound();
            };

            $scope.chooseHarder = function (harder) {
                $scope.harder = harder;

                insertSounds();
            };

            function addSound() {
                var sound = {
                    file: files[$scope.trackIndex],
                    time: stopwatch.reset(),
                    color: $scope.selectedColor,
                    side: $scope.side
                };

                sounds.push(sound);

                console.log('Saving sound');
                console.log(sound);

                nextSound();
            }

            function nextSound() {
                if ($scope.trackIndex < files.length - 1) {

                    $scope.trackIndex++;
                    $scope.progress = Math.ceil(($scope.trackIndex / files.length) * 100);

                    $scope.playSound();

                    return;
                }

                $scope.progress = 100;

                $scope.testState = 3;
            }

            function insertSounds() {

                $http.post('/insert.php', {
                    sex: $scope.formData.sex,
                    age: $scope.formData.age,
                    level: $scope.formData.level,
                    harder: $scope.harder,
                    sounds: sounds
                }).
                then(function (response) {
                    // this callback will be called asynchronously
                    // when the response is available

                    console.log(response);

                    $location.search({
                        'fromTest': 'true'
                    });
                    $location.path('results');

                }, function (response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.

                    console.log(response);

                    $location.search({
                        'error': 'true'
                    });

                    $location.path('results');
                });
            }

            // Needed for rendering only
            $scope.labels = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
            $scope.data = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];

            // Results
            var sounds = [];

        }
    ]);
