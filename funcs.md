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
