describe('Unit: ListController', function() {
  // Load the module with MainController
  beforeEach(module('Thermostat'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('ListController', {
      $scope: scope
    });
  }));

  it('should create $scope.greeting when calling sayHello', 
    function() {

         
      //expect(scope.greeting).toBeUndefined();
      //scope.sayHello();
      expect(scope.title).toEqual("All Thermostats");
  });
})