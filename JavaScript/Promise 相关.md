# Promise 相关

## Promise 状态之 pending

### 如果在 Promise 的构造函数中没有调用 resolve 方法或者 reject 方法，且没有抛出异常，则改 Promise 处于 pending 状态

```JavaScript
new Promise(() => {
    console.log(1)
})
// 运行结果：
// [[PromiseState]]: "pending"
// [[PromiseResult]]: undefined
```
## Promise 状态之 fulfilled

### 如果在 Promise 的构造函数中调用了 resolve 方法，无论是否在 then 方法中提供了 resolve 的回调，都会从 pending 状态转为 fulfilled 状态；

```JavaScript
new Promise((resolve, reject) => {
    console.log(1)
    resolve() // 后面的代码已经会执行，和
    console.log(2)
})
// 运行结果：
// 1
// 2
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: undefined


new Promise((resolve, reject) => {
    console.log(1)
    resolve(3)
    console.log(2)
}).then((res) => { console.log(res) })
// 运行结果：
// 1
// 2
// 3
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: undefined
```

### 如果在 Promise 的构造函数中调用了 reject 方法或者抛出了异常，只要在 then 方法中提供了 reject 的回调，或者通过 catch 方法进行了处理，都会从 pending 状态转为 fulfilled 状态，如果同时存在 reject 回调和 catch 方法，则只会执行 reject 回调。

```JavaScript
new Promise((resolve, reject) => {
    console.log(1)
    reject(3)
    resolve()
    console.log(2)
}).then(() => {}, (res) => { console.log(res) })  // 提供 reject 回调
// 运行结果：
// 1
// 2
// 3
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: undefined


new Promise((resolve, reject) => {
    console.log(1)
    throw new Error('new error')
    console.log(2)
}).then(() => {}, (res) => { console.log(res) })  // 提供 reject 回调
// 运行结果：
// 1
// Error: new error
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: undefined


new Promise((resolve, reject) => {
    console.log(1)
    reject(3)
    resolve()
    console.log(2)
}).catch((res) => { console.log(res) })  // 提供 catch 方法
// 运行结果：
// 1
// 2
// 3
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: undefined


new Promise((resolve, reject) => {
    console.log(1)
    throw new Error('new error')
    console.log(2)
}).catch((res) => { console.log(res) })  // 提供 catch 方法
// 运行结果：
// 1
// Error: new error
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: undefined


new Promise((resolve, reject) => {
    console.log(1)
    reject(3)
    resolve(4)
    console.log(2)
}).then(() => { console.log(res, 'resolve') }, (res) => { console.log(res, 'reject') })
.catch((res) => { console.log(res, 'catch') })   // 同时提供 reject 回调和 catch 方法
// 运行结果：
// 1
// 2
// 3 "reject"
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: undefined


new Promise((resolve, reject) => {
    console.log(1)
    throw new Error('new error')
    resolve(4)
    console.log(2)
}).then(() => { console.log(res, 'resolve') }, (res) => { console.log(res, 'reject') })
.catch((res) => { console.log(res, 'catch') })   // 同时提供 reject 回调和 catch 方法
// 运行结果：
// 1
// Error: new error "reject"
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: undefined
```

## Promise 状态之 rejected

 ### 只要在 Promise 的构造函数中调用了 reject 方法或者是抛出了异常，且没有在 then 方法里面添加 reject 的回调进行处理或者通过 catch 方法进行处理，那就会由 pending 状态转变会 rejected 状态，并向外抛出相应异常。

 ```JavaScript
new Promise((resolve, reject) => {
    console.log(1)
    reject()
    console.log(2)
})
// 运行结果：
// 1
// [[PromiseState]]: "rejected"
// [[PromiseResult]]: undefined
// Uncaught (in promise) undefined


new Promise((resolve, reject) => {
    console.log(1)
    throw new Error()
    console.log(2)
})
// 运行结果：
// 1
// [[PromiseState]]: "rejected"
// [[PromiseResult]]: Error at <anonymous>:4:11 at new Promise (<anonymous>) at <anonymous>:1:1
// VM1466:4 Uncaught (in promise) Error
```

## Promise 的状态一旦改变，就不会再变

> 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。