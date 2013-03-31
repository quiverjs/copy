
var copyObject = require('../lib/copy.js').copyObject
var should = require('should')

var testFunctionValue = function() { }
var testComplexValue = new Error()

var originalObject = {
  booleanValue: true,
  numberValue: 42,
  stringValue: 'foo',
  nullValue: null,
  functionValue: testFunctionValue,
  complexValue: testComplexValue,
  arrayValue: [
    true,
    42,
    'foo'
  ],
  objectValue: {
    innerValue: 'bar'
  }
}

var testOriginalValue = function(object) {
  object.booleanValue.should.equal(true)
  object.numberValue.should.equal(42)
  object.stringValue.should.equal('foo')
  should.not.exist(object.nullValue)

  object.functionValue == testFunctionValue
  object.complexValue == testComplexValue

  object.arrayValue[0].should.equal(true)
  object.arrayValue[1].should.equal(42)
  object.arrayValue[2].should.equal('foo')
  should.not.exist(object.arrayValue[3])

  object.objectValue.innerValue.should.equal('bar')
  should.not.exist(object.objectValue.newInner)
}

var testChangedValue = function(object) {
  object.booleanValue.should.equal(false)
  object.numberValue.should.equal(99)
  object.stringValue.should.equal('foobar')
  object.nullValue.should.equal('not null')

  testComplexValue.sideEffect.should.equal('has side effect')

  object.functionValue == testFunctionValue
  object.complexValue == testComplexValue

  object.arrayValue[0].should.equal(true)
  object.arrayValue[1].should.equal(42)
  object.arrayValue[2].should.equal('baz')
  object.arrayValue[3].should.equal('new element')

  should.not.exist(object.objectValue.innerValue)
  object.objectValue.newInner = 'new inner'
}

var modifyObject = function(object) {
  object.booleanValue = false
  object.numberValue = 99
  object.stringValue += 'bar'
  object.nullValue = 'not null'

  object.complexValue.sideEffect = 'has side effect'

  object.arrayValue[2] = 'baz'
  object.arrayValue.push('new element')

  object.objectValue.innerValue = null
  object.objectValue.newInner = 'new inner'
}

describe('copy object test', function() {
  it('sanity test with original', function() {
    testOriginalValue(originalObject)
  })

  var objectCopy = copyObject(originalObject)
  it('copy should have same values as original', function() {
    testOriginalValue(objectCopy)
  })

  it('modification of copy should not affect original', function() {
    modifyObject(objectCopy)
    testChangedValue(objectCopy)
    testOriginalValue(originalObject)

    ;(function() {
      testOriginalValue(objectCopy)
    }).should.throw()

    ;(function() {
      testChangedValue(originalObject)
    }).should.throw()
  })
})
