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
            // AngularJS will instantiate a singleton by calling "new" on this function

            this.getFileColorCount = function() {

                return $http.get('/results.php').then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                    console.log(response);

                    var tmpAggs = new Array(files.length);

                    return tmpAggs;

                }, function(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.

                    response = JSON.parse('{"count":3,"fileColorAggs":[{"file":"a.m4a","color":"#000000","count":"1"},{"file":"a.m4a","color":"#008000","count":"2"},{"file":"b.m4a","color":"#0000ff","count":"1"},{"file":"b.m4a","color":"#c0c0c0","count":"1"},{"file":"b.m4a","color":"#ffff00","count":"1"},{"file":"c.m4a","color":"#00ffff","count":"1"},{"file":"c.m4a","color":"#c0c0c0","count":"1"},{"file":"c.m4a","color":"#ff0000","count":"1"},{"file":"d.m4a","color":"#800080","count":"1"},{"file":"d.m4a","color":"#ff0000","count":"1"},{"file":"d.m4a","color":"#ffff00","count":"1"},{"file":"e.m4a","color":"#808000","count":"2"},{"file":"e.m4a","color":"#c0c0c0","count":"1"},{"file":"f.m4a","color":"#000000","count":"1"},{"file":"f.m4a","color":"#008000","count":"1"},{"file":"f.m4a","color":"#00ffff","count":"1"},{"file":"g.m4a","color":"#ff0000","count":"1"},{"file":"g.m4a","color":"#ffff00","count":"1"},{"file":"g.m4a","color":"#ffffff","count":"1"},{"file":"h.m4a","color":"#00ffff","count":"2"},{"file":"h.m4a","color":"#808000","count":"1"},{"file":"i.m4a","color":"#808000","count":"1"},{"file":"i.m4a","color":"#a52a2a","count":"1"},{"file":"i.m4a","color":"#c0c0c0","count":"1"},{"file":"j.m4a","color":"#008000","count":"1"},{"file":"j.m4a","color":"#808000","count":"1"},{"file":"j.m4a","color":"#ffff00","count":"1"},{"file":"k.m4a","color":"#a52a2a","count":"1"},{"file":"k.m4a","color":"#ff0000","count":"1"},{"file":"k.m4a","color":"#ff00ff","count":"1"},{"file":"l.m4a","color":"#800080","count":"1"},{"file":"l.m4a","color":"#808000","count":"1"},{"file":"l.m4a","color":"#c0c0c0","count":"1"},{"file":"m.m4a","color":"#0000ff","count":"1"},{"file":"m.m4a","color":"#008000","count":"1"},{"file":"m.m4a","color":"#ffff00","count":"1"}]}');

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
                });

            }

        }
    ]);
