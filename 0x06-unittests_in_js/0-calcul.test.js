const assert = require('assert');
const calculateNumber = require('./0-calcul');

describe('calculateNumber', function() {
  it('should return 4 for inputs (1, 3)', function() {
    assert.strictEqual(calculateNumber(1, 3), 4);
  });

  it('should return 5 for inputs (1, 3.7)', function() {
    assert.strictEqual(calculateNumber(1, 3.7), 5);
  });

  it('should return 5 for inputs (1.2, 3.7)', function() {
    assert.strictEqual(calculateNumber(1.2, 3.7), 5);
  });

  it('should return 6 for inputs (1.5, 3.7)', function() {
    assert.strictEqual(calculateNumber(1.5, 3.7), 6);
  });

  it('should return -2 for inputs (-1.4, -1.4)', function() {
    assert.strictEqual(calculateNumber(-1.4, -1.4), -2);
  });
});
