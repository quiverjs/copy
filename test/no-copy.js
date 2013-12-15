
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

  it('should not copy', function() {
    var obj = { foo: 'foo' }
    obj._noCopy = true

    var copy = copyLib.copyObject(obj)
    copy.foo = 'bar'

    should.equal(obj.foo, 'bar')
  })

  it('non-enumerable no copy', function() {
    var obj = { foo: 'foo' }
    copyLib.noCopy(obj)

    var copy = copyLib.copyObject(obj)
    copy.foo = 'bar'

    should.equal(obj.foo, 'bar')
  })

  it('force copy should copy', function() {
    var obj = { foo: 'foo' }
    copyLib.noCopy(obj)

    var copy = copyLib.copyObject(obj, true)
    copy.foo = 'bar'

    should.equal(obj.foo, 'foo')
  })

  it('no copy null should make no error', function() {
    copyLib.noCopy(null)
  })
})