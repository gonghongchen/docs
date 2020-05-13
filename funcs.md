```javascript
/**
 * @description 找出数组中重复的元素 
 * @param arr {Array} 需要找出重复元素的数组
 * @return {Array} 结果
 */
const getRepeatEles = (arr) => {
  const newArr = arr.filter((value, index, self) => {
    return self.indexOf(value) !== index;
  });
  return [...new Set(newArr)];
}

getRepeatEles([1, 2, 2, 3, 1, 2, 3, 0, 9, 0, 3])  // [2, 1, 3, 0]
```

```javascript
/**
 * @description 统计数组中元素出现的次数
 * @param arr {Array} 数组
 * @return {Object} 统计结果
 */
const getRepeatRes = (arr) => {
  const res = {};
  arr.forEach(item => {
    const count = res[item];
    res[item] = count ? count + 1 : 1;
  });
  return res;
}
getRepeatRes([1, 2, 3, 1, 2, 3, 4, 9, 9, 1])  // {1: 3, 2: 2, 3: 2, 4: 1, 9: 2}

```

```javascript
/**
 * @description 节流 - 在固定的时间间隔内只执行一次回调，如果在时间间隔内又触发了事件，则忽略
 * @param _this {Object} 指定的调用callback的作用域
 * @param callback {Function} 事件触发后的回调
 * @param timer {Number} 计时器的时间间隔
 */
const throttle = (_this = window, callback, timer = 500) => {
  const isFunc = Object.prototype.toString.call(callback) === '[object Function]'
  if (!isFunc) {
    throw new Error('callback must be a function')
  }
  const isNum = Object.prototype.toString.call(timer) === '[object Number]'
  if (!isNum) {
    throw new Error('timer must be a number')
  }
  let canExecute = true
  return (...args) => {
    if (!canExecute) {
      return
    }
    canExecute = false
    setTimeout(() => {
      callback.apply(_this, args)
      canExecute = true
    }, timer)
  }
}
```

```javascript
/**
 * @description 防抖 - 在固定的时间间隔内只执行一次回调，如果在时间间隔内又触发了事件，则重新开始计时
 * @param _this {Object} 指定的调用callback的作用域
 * @param callback {Function} 事件触发后的回调
 * @param timer {Number} 计时器的时间间隔
 */
const debounce = (_this = window, callback, timer = 500) => {
  const isFunc = Object.prototype.toString.call(callback) === '[object Function]'
  if (!isFunc) {
    throw new Error('callback must be a function')
  }
  const isNum = Object.prototype.toString.call(timer) === '[object Number]'
  if (!isNum) {
    throw new Error('timer must be a number')
  }
  let timeout = null
  return (...args) => {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback.apply(_this, args)
    }, timer)
  }
}
```