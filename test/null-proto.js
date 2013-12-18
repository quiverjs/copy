
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

  it('copied object should be null proto', function() {
    var obj = {
      foo: 'foo'
    }
    var originalProto = Object.getPrototypeOf(obj)
    var defaultProto = Object.getPrototypeOf({ })

    should.equal(originalProto, defaultProto)
    should.exist(obj.toString)

    var copy = copyObject(obj)
    var copyProto = Object.getPrototypeOf(copy)

    should.notEqual(originalProto, copyProto)
    should.equal(copyProto, null)
    should.not.exist(copy.toString)
  })
})