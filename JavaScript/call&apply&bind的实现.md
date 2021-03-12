# call&apply&bind 的实现

## call
```javascript
Function.prototype.call = function(context, ...args) {
    if (typeof this !== 'function') {
        throw new Error(this + ' is not a function')
    }
    const func = Symbol('func')
    context[func] = this
    context[func](...args)
    delete context[func]
}
```