**useState**

```javascript
const [state, setState] = useState(initialState);
```
  * useState
    * useState 方法需要传入一个初始 state 的值，然后以数组的形式返回 state 值和更新 state 值的方法 setState（之所以用数组的形式而不是以对象的形式，应该是考虑到用数组进行解构赋值是可以自定义 state 和 setState 名字的，若用对象则不行）

  * initialState
    * The initialState argument is the state used during the initial render. In subsequent renders, it is disregarded.
    （初始 state 的值只会在第一次渲染的时候使用，在后面的渲染过程中，初始值都会被忽略）

    * If the initial state is the result of an expensive computation, you may provide a function instead, which will be executed only on the initial render
    （如果初始 state 的值需要通过复杂的计算才能得到，那你可以直接传入一个函数，这个函数也只会在首次渲染的时候执行）
      ```javascript
      const [state, setState] = useState(() => {
        const initialState = someExpensiveComputation(props);
        return initialState;
      });
      ```

  * state
    * During subsequent re-renders, the first value returned by useState will always be the most recent state after applying updates.
    （在后面的重新渲染过程中，调用 useState 方法所返回的数组中的第一个值将会永远是最新的 state 值）

  * setState
    * setState accepts a new state value and enqueues a re-render of the component.
    （setState 接收一个新的 state 值，执行这个方法后会触发组件的重新渲染）

    * If the new state is computed using the previous state, you can pass a function to setState. The function will receive the previous value, and return an updated value. （如果新的 state 值需要通过之前的 state 值计算得到，那么你可以给 setState 传入一个方法，React 会自动为这个方法传入之前的 state 值，并需要你手动返回一个更新后的 state 值）。例如：
      ```javascript
      function Counter({initialCount}) {
        const [count, setCount] = useState(initialCount);
        return (
          <>
            Count: {count}
            <button onClick={() => setCount(initialCount)}>Reset</button>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
          </>
        );
      }
      ```

    * Unlike the setState method found in class components, useState does not automatically merge update objects. You can replicate this behavior by combining the function updater form with object spread syntax（这里的 setState 方法和 class 组件里面的 setState 方法的内部更新实现机制是不一样的，即这里的 setState 方法不会自动将新旧 state 进行合并处理，而是直接替换的。你可以使用对象拓展语法和 Object.assign 进行手动实现）:
      ```javascript
      setState(prevState => {
        // Object.assign would also work
        return {...prevState, ...updatedValues};
      });
      ```
    * If you update a State Hook to the same value as the current state, React will bail out without rendering the children or firing effects. (React uses the Object.is comparison algorithm.)
    （如果在调用 setState 方法时，传入的新的 state 值和当前的 state 值是一样的，React 将不会进行更新及触发 effect 事件。 React 使用了 Object.is 方法进行新旧 state 值的对比）
  
