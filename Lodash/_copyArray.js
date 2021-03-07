/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;
      
  /**
   * 下面这条语句也可以通过三元运算符进行处理 array = array ? array : Array(length);
   * 而相比之下，显然作者的这种书写方式更为简洁
   */
  array || (array = Array(length));
  /**
   * 注意拷贝的写法
   */
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;
