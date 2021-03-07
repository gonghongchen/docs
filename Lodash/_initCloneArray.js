/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      /** 
       * 根据 array 的长度创建一个新的数组，之所以作者不使用 Array(length) 的方式，
       * 应该是考虑到在当前作用域去查找 Array 要比直接使用 array.constructor 
       * 方法在时间开销上要更大。
       */
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  /**
   * 与 hasOwnProperty.call(array, 'index') 等同作用的是可以直接使用 array.hasOwnProperty('index')
   * 方法，但作者不使用后者的原因应该是由于 array 所能够调用的 hasOwnProperty 方法需要通过查找原型链到顶级 Object
   * 对象才能找到此方法，查找效率低，所以直接使用了 Object 对象的此方法。
   */
  // ======== 下面这部判断具体作用没明白
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;
