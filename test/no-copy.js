'use strict'

var should = require('should')
var copyLib = require('../lib/copy.js')

describe('no copy test', function() {
  it('should copy', function() {
    var obj = { foo: 'foo' }

    var copy = copyLib.copyObject(obj)
    copy.foo = 'bar'

    should.equal(obj.foo, 'foo')
  })

  it('enumerable should copy', function() {
    var obj = { foo: 'foo' }
    obj.__noCopy = true

    var copy = copyLib.copyObject(obj)
    copy.foo = 'bar'

    should.notEqual(obj.foo, 'bar')
  })

  it('non-enumerable should not copy', function() {
    var obj = { foo: 'foo' }
    copyLib.noCopy(obj)

    should.equal(obj.__noCopy, true)

    var copy = copyLib.copyObject(obj)
    copy.foo = 'bar'

    should.equal(obj.foo, 'bar')
  })

  it('force copy should copy', function() {
    var obj = { foo: 'foo' }
    copyLib.noCopy(obj)

    var copy = copyLib.copyObject(obj, { forceCopy: true })
    copy.foo = 'bar'

    should.equal(obj.foo, 'foo')
  })

  it('no copy null should make no error', function() {
    copyLib.noCopy(null)
  })
})