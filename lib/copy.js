'use strict'

var defaultProto = Object.getPrototypeOf({})

var copyObject = function(object, options) {
  options = options || { }

  if(object && object.__noCopy && 
    !Object.prototype.propertyIsEnumerable.call(object, '__noCopy') && 
    !options.forceCopy) 
  {
    return object
  }

  var objectType = typeof(object)

  if((object == null) ||
     (objectType == 'number') || 
     (objectType == 'boolean') ||
     (objectType == 'function'))
  {
    return object
  }

  if(objectType== 'string') {
    return object
  } 

  if(Array.isArray(object)) {
    return copyArray(object)
  } 

  /* 
   * We don't perform copy on the object if it is not a plain object,
   * i.e. has a different prototype than the default one.
   *
   * The evaluation is the same as 
   *  Object.getPrototypeOf(object) === Object.getPrototypeOf({})
   * Except that we cache the default prototype in the variable defaultProto.
   *
   * This works because all objects created through the hash literal 
   * or new Object() all shares the same prototype.
   */
  var proto = Object.getPrototypeOf(object)
  if(proto !==  defaultProto && proto != null) {
    return object
  }

  var excludeFields = options.excludeFields

  if(excludeFields) {
    return copyPlainObjectWithExcludes(object, excludeFields)
  } else {
    return copyPlainObject(object)
  }
}

var copyPlainObject = function(object) {
  var newObject = Object.create(null)

  for(var key in object) {
    var value = object[key]
    newObject[key] = copyObject(value)
  }

  return newObject
}

var copyPlainObjectWithExcludes = function(object, excludeFields) {
  var newObject = Object.create(null)

  for(var key in object) {
    if(excludeFields.indexOf(key) > -1) continue

    var value = object[key]
    newObject[key] = copyObject(value)
  }

  return newObject
}

var copyArray = function(array) {
  var newArray = []
  array.forEach(function(value) {
    newArray.push(copyObject(value))
  })
  return newArray
}

var noCopy = function(obj) {
  if(!obj) return 
  Object.defineProperty(obj, '__noCopy', {
    enumerable: false,
    writable: true,
    value: true
  })
}

module.exports = {
  noCopy: noCopy,
  copyObject: copyObject,
  copyPlainObject: copyPlainObject,
  copyArray: copyArray
}
