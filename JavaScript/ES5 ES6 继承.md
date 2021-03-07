## ES5继承
### 构造函数继承
```javascript
function Parent(name) {
  this.name = name
  this.sayName = function() {
    console.log(this.name)
  }
}

function Child(name, age) {
  // 构造函数继承，先创建子类的 this 对象，然后将父类的属性和方法绑定到子类的 this 对象上面
  Parent.call(this, name)
  // Parent.apply(this, [name])
  // Parent.bind(this)(name)
  this.age = age
}
```
### 原型对象继承
