'use strict';

describe('Controller: TestCtrl', function() {

    // load the controller's module
    beforeEach(module('soundsAndColorsApp'));

    var TestCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        TestCtrl = $controller('TestCtrl', {
            $scope: scope
        });
    }));

});
