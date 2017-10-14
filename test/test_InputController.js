const assert = require('assert');

const InputController = require('../app/src/js/InputController.js');

describe('InputController', function() {
  
  describe('#constructor', function() {
    it('can be created', function() {
      var controller = new InputController();
      
      assert.notEqual(controller,
        undefined,
        'controller is undefined'
      );
    });
  });
});