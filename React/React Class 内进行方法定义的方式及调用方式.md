# React Class 内进行方法定义的方式及调用方式
## 方式
``` javascript
import * as React from 'react';

const { PureComponent, Fragment } = React;

class Test extends PureComponent {
    render() {
        return (
            <Fragment>
                <button>click</button>
                <button>click2</button>
            </Fragment>
        );
    }
    // 方式一，常规定义方式
    doClick() {
        console.log(this);
    }
    // 方式二，箭头函数定义方式
    doClick2 = () => {
        console.log(this);
    }
}

export default Test
```
## 区别
1. 正确调用的方式的不同  

    若在上面的示例中的两个按钮上面加上如下的点击事件：
    ```javascript
    render() {
        return (
            <Fragment>
                <button onClick={this.doClick}>click</button>
                <button onClick={this.doClick2}>click2</button>
            </Fragment>
        );
    }
    ```
    分别点击两个按钮后，上面打印出的信息是这样的：
    ```javascript
    doClick() {
        console.log(this);  // undefined
    }
    ```
    ```javascript
    doClick2 = () => {
        console.log(this);  // Test {props: {…}, context: {…}, refs: {…}, updater: {…}, state: {…}, …}
    }
    ```
    使用方式一进行定义的 `doClick` 方法内部的 `this` 为 `undefined`，之所以出现这种情况，原因在于用这种方式进行定义的方法，其内部 `this` 的具体指向需要等到运行时才会进行动态的绑定。上面代码中将 `doClick` 方法赋值给了 `button` 的点击事件，而 `this` 会指向所属函数的调用者（拥有者），点击事件由浏览器的事件处理线程进行执行，这时 `this` 的指向便不再是当前类的实例了。

    解决办法有两种：

    1. 在类的 `constructor` 中进行手动绑定：
        ```javascript
        constructor(props) {
            super(props);
            this.doClick = this.doClick.bind(this);
        }
        ```
        即通过 `bind` 方法将 `doClick` 方法内部的 `this` 绑定到当前类的实例并返回了一个新的函数， 然后将新函数赋值给类的自有属性 `doClick` ，当点击按钮调用 `doClick` 方法时，则是调用的这个新函数。

    2. 在调用的时候用箭头函数进行包裹：
        ```javascript
        <button onClick={() => this.doClick()}>click</button>
        ```
        这样做也可以正确运行，是因为箭头函数内部本身不存在 `this` ，箭头函数内部的 `this` 即是外层的 `this` ，而且 `this` 的绑定在定义时便已完成并固定，会绑定到函数所属的对象，而不是在运行时动态绑定的。所以这里的 `this.doClick()` 的
         `this` 指向的是 `render` 方法里面的 `this` ，即当前类的实例，那么由实例去调用 `doClick` 方法，则可以保证 `doClick` 方法里面的 `this` 也是正确指向当前实例的。

         但是，这种解决方式是不值得推荐的，因为没必要多加一层没有额外操作的匿名函数，而且每次 `render` 时，都会创建不同的匿名函数，当这个匿名函数被当做 `prop` 向下传递时，可能会导致子元素会做额外的重新渲染。

    根据上面的解释，使用箭头函数定义的 `onClick2` 在不经过额外的处理后，可以直接赋值给按钮的点击事件并能够正确运行就不难理解了。

2. 存在于类的位置不同

    使用常规方式定义的方法，存在于类的原型对象上面，而使用箭头函数定义的方法则属于类的自有方法。
