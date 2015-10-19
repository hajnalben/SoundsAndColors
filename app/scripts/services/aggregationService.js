'use strict';

/**
 * @ngdoc service
 * @name soundsAndColorsApp.fCCAggService
 * @description
 * # fCCAggService
 * Service in the soundsAndColorsApp.
 */
angular.module('soundsAndColorsApp')
    .service('aggregationService', ['$http', 'colors', 'files',
        function($http, colors, files) {

            function handle(response) {
                if (!response.fileColorAggs) {
                    return null;
                }

                var tmpAggs = new Array(files.length);

                for (var i in response.fileColorAggs) {
                    var agg = response.fileColorAggs[i];

                    var file = agg.file;
                    var color = agg.color;
                    var count = agg.count;

                    var index = files.indexOf(file);

                    var fileData;

                    if (tmpAggs[index]) {
                        fileData = tmpAggs[index];
                    } else {
                        fileData = {
                            name: file,
                            data: new Array(colors.hexColors.length + 1).join('0').split('')
                        };

                        tmpAggs[index] = fileData;
                    }

                    var colorIndex = colors.hexColors.indexOf(color);

                    fileData.data[colorIndex] = count;
                }

                return tmpAggs;
            }

            this.getFileColorCount = function() {

                return $http.get('/results.php').then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                    console.log(response);

                    return handle(response.data);

                }, function(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.

                    console.log('Error. Showing dummy data!');

                    response = JSON.parse('{"count":1,"fileColorAggs":[{"file":"a.mp3","color":"#00FF00","count":"1"},{"file":"b.mp3","color":"#FFFF99","count":"1"},{"file":"c.mp3","color":"#CC0000","count":"1"},{"file":"d.mp3","color":"#99CCFF","count":"1"},{"file":"e.mp3","color":"#FFFF99","count":"1"},{"file":"f.mp3","color":"#0033CC","count":"1"},{"file":"g.mp3","color":"#FF99FF","count":"1"},{"file":"h.mp3","color":"#CC66FF","count":"1"},{"file":"i.mp3","color":"#FFFF99","count":"1"},{"file":"j.mp3","color":"#0033CC","count":"1"},{"file":"k.mp3","color":"#FF9900","count":"1"},{"file":"l.mp3","color":"#FF99FF","count":"1"},{"file":"m.mp3","color":"#99CCFF","count":"1"}]}');

                    return handle(response);
                });

            };

        }
    ]);
