
'use strict'

var should = require('should')
var copyObject = require('../lib/copy.js').copyObject

describe('null proto test', function() {
  it('should copy null proto', function() {
    var obj = Object.create(null)
    obj.foo = 'foo'

    var copy = copyObject(obj)
    copy.foo = 'bar'

    should.equal(obj.foo, 'foo')
  })
})