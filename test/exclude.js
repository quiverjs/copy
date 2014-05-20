'use strict'

var should = require('should')
var copyObject = require('../lib/copy.js').copyObject

describe('exclude copy test', function() {
  it('should not copy excluded fieldds', function() {
    var obj = {
      foo: 'foo value',
      bar: 'bar value'
    }

    var copy = copyObject(obj, {
      excludeFields: ['bar']
    })

    should.equal(copy.foo, 'foo value')
    should.not.exists(copy.bar)
  })
})