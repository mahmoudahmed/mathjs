// test the contents of index.js
var assert = require('assert'),
    index = require('../../../lib/expression/node/index');

describe('node/index', function() {

  it('should contain all nodes', function() {
    assert.equal(Object.keys(index).length, 14);

    assert.equal(Object.keys(index).length, 14);

    assert.strictEqual(index.ArrayNode, require('../../../lib/expression/node/ArrayNode'));
    assert.strictEqual(index.AssignmentNode, require('../../../lib/expression/node/AssignmentNode'));
    assert.strictEqual(index.BlockNode, require('../../../lib/expression/node/BlockNode'));
    assert.strictEqual(index.ConstantNode, require('../../../lib/expression/node/ConstantNode'));
    assert.strictEqual(index.FunctionNode, require('../../../lib/expression/node/FunctionNode'));
    assert.strictEqual(index.IndexNode, require('../../../lib/expression/node/IndexNode'));
    assert.strictEqual(index.OperatorNode, require('../../../lib/expression/node/OperatorNode'));
    assert.strictEqual(index.ParamsNode, require('../../../lib/expression/node/ParamsNode'));
    assert.strictEqual(index.RangeNode, require('../../../lib/expression/node/RangeNode'));
    assert.strictEqual(index.SymbolNode, require('../../../lib/expression/node/SymbolNode'));
    assert.strictEqual(index.TernaryNode, require('../../../lib/expression/node/TernaryNode'));
    assert.strictEqual(index.UnitNode, require('../../../lib/expression/node/UnitNode'));
    assert.strictEqual(index.UpdateNode, require('../../../lib/expression/node/UpdateNode'));
  });

});

