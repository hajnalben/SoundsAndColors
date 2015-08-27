'use strict';

describe('Service: stopwatch', function () {

  // load the service's module
  beforeEach(module('soundsAndColorsApp'));

  // instantiate service
  var stopwatch;
  beforeEach(inject(function (_stopwatch_) {
    stopwatch = _stopwatch_;
  }));

  it('should do something', function () {
    expect(!!stopwatch).toBe(true);
  });

});
