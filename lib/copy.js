
var defaultProto = Object.getPrototypeOf({})

var copyObject = function(object) {
  var objectType = typeof(object)
  if((object == null) ||
     (objectType == 'number') || 
     (objectType == 'boolean') ||
     (objectType == 'function'))
  {
    return object
  } 

  if(objectType== 'string') {
    return object.slice()
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
  if(Object.getPrototypeOf(object) !==  defaultProto) {
    return object
  }

  return copyPlainObject(object)
}

var copyPlainObject = function(object) {
  var newObject = { }

  for(var key in object) {
    (function(key, value) {
      newObject[key] = copyObject(value)
    })(key, object[key])
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

module.exports = {
  copyObject: copyObject,
  copyPlainObject: copyPlainObject,
  copyArray: copyArray
}
