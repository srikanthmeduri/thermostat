describe('Unit: ListController', function() {
    beforeEach(module('Thermostat'));
    var ctrl, scope;
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ctrl = $controller('ListController', {
            $scope: scope
        });
    }));
    it('should have a LoginCtrl controller', function() {
        expect(ctrl).toBeDefined();
    });
});