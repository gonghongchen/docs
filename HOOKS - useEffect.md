**useEffect**

```javascript
// 用法
useEffect(didUpdate);

// 示例
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

  * useEffect
    * If you’re familiar with React class lifecycle methods, you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined.
    （如果你熟悉 React 生命周期的话，你可以把 useEffect 当做是 componentDidMount、componentDidUpdate 以及 componentWillUnmount 的结合体）

    * The function passed to useEffect will run after the render is committed to the screen. 
    （传入给 useEffect 的函数需要等到真正渲染完成后才会执行）

    * By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.
    （默认情况下，effect 在每次渲染完成后执行，但你也可以选择在某些值改变后就执行）

    * Why is useEffect called inside a component? Placing useEffect inside the component lets us access the state variable (or any props) right from the effect.
    （为什么要把 useEffect 放在组件内部进行调用？因为把 useEffect 放在组件内部可以让我们直接拥有获取组件的 state 及 props 的权限）

    * Every time we re-render, we schedule a different effect, replacing the previous one. This is intentional. In fact, this is what lets us read the state value from inside the effect without worrying about it getting stale.
    （每次重新渲染，我们都会计算出一个新的 effect，以替换之前的 effect。实际上，这是有意为之，因为这样可以保证我们在 effect 内读取 state 值的时候不用担心它的值没有改变）

    * Unlike componentDidMount or componentDidUpdate, effects scheduled with useEffect don’t block the browser from updating the screen. This makes your app feel more responsive. The majority of effects don’t need to happen synchronously. In the uncommon cases where they do (such as measuring the layout).
    （与 componentDidMount 及 componentDidUpdate 不同的是，effect 在通过 useEffect 进行计算时并不会阻塞浏览器的渲染，这会使得你的 APP 响应更快。大多数的 effect 并不需要同步执行，而特殊情况下（例如计算布局）则需要）

    * You can tell React to skip applying an effect if certain values haven’t changed between re-renders. To do so, pass an array as an optional second argument to useEffect.
    （在重新渲染的过程中，如果某些值没有改变，那么你可以通过给 useEffect 传入一个数组作为第二个可选的参数来跳过执行 effect）
