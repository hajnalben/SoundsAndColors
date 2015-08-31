'use strict';

describe('Service: fCCAggService', function () {

  // load the service's module
  beforeEach(module('soundsAndColorsApp'));

  // instantiate service
  var fCCAggService;
  beforeEach(inject(function (_fCCAggService_) {
    fCCAggService = _fCCAggService_;
  }));

  it('should do something', function () {
    expect(!!fCCAggService).toBe(true);
  });

});
