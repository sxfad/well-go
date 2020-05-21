# Promise常用API

Promise对象代表一个异步操作，有三种状态：进行中(pending)、已成功(fulfilled)、已失败(rejected)，**任何其他操作都无法改变这个状态**。

一旦状态改变，就不会再变，只有两种可能：pending => fulfilled、pending => rejected。

Promise也有缺点：无法中途取消Promise，**一旦新建它就会立即执行**；如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。

**以下所有案例，状态成功用 fulfilled 表示，状态失败用 rejected 表示**。

## Promise构造函数是同步还是异步执行，then方法呢？
promise构造函数是同步执行，then方法是异步执行的。
```js
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})

promise.then(() => {
  console.log(3)
})

console.log(4)

// 1 2 4 3 
```

## Promise.all()
应用场景：当多个请求都 fulfilled 时取消loading状态。

参数：接收一个数组作为参数，且数组的每个元素必须是promise实例。

特殊点：只要这些参数实例有一个状态变为 rejected，p的状态就变为 rejected。
```js
const p = Promise.all([p1, p2])
        .then(() => {})
        .catch(() => {})

// 分三种情况：
// p1 p2 都 fulfilled，p1 p2 的返回值组成一个数组，传递给p的回调函数
// p1 p2 只要有一个 rejected 或都 rejected，p的状态就变为 rejected，此时第一个被 rejected 实例的返回值，会传递给p的回调函数
// 若 p1 或 p2 定义了自己的catch方法，那么它一旦被 rejected，会执行自己的catch，并不会触发Promise.all()的catch方法
```

## Promise.race()
应用场景：可用于和定时器绑定，可以测试一些接口的响应速度。比如将一个请求，和三秒后执行的定时器包装成promise实例，然后加入promise.race()队列中， 当请求三秒还未响应时候，可以给用户一些提示。

参数：接收一个数组作为参数，且数组的每个元素必须是promise实例。

特殊点：只要这些参数实例有一个率先改变状态，p的状态就跟着改变。
```js
const p = Promise.race([p1, p2])
        .then(() => {})
        .catch(() => {})

// 只要p1、p2之中有一个实例率先改变状态，p的状态就跟着改变。
// 那个最先改变的 Promise 实例的返回值，会传递给p的回调函数。
```
```js
// 针对应用场景写个例子，如果3s内没有获得响应，就将 Promise 的状态变为 rejected
const p = Promise.race([
  fetch('/ajax/request'),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('request timeout')), 3000))
]);

p
.then(() => {})
.catch(() => alert('network error'));
```

## Promise.allSettled()
应用场景：如果我们不关心异步操作的结果，只关心这些操作有没有结束。这时，Promise.allSettled()方法就很有用。如果没有这个方法，想要确保所有操作都结束，就很麻烦。

参数：接收一个数组作为参数，且数组的每个元素必须是promise实例。

特殊点1：只有等到所有这些参数实例都返回结果（无论 fulfilled 或 rejected），包装实例才会结束。

特殊点2：该方法返回的新的 Promise 实例，**状态总是 fulfilled**，不会变成失败。
```js
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(res => console.log(res));

// 返回值是一个数组，fulfilled 时有value属性，rejected 时有reason属性。
// 借助这一点我们可以过滤出失败的请求，并输出原因
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]
```

## Promise.any()
应用场景：注意！该方法依然是实验性的，尚未被所有的浏览器完全支持，它当前处于 TC39 第三阶段草案。

参数：接收一个数组作为参数，且数组的每个元素必须是promise实例。

特殊点1：只要有一个参数实例变成 fulfilled，包装实例就会变成 fulfilled；

特殊点2：只有所有参数实例状态都变为 rejected，包装实例才会变成 rejected。
```js
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);
const alsoRejected = Promise.reject(Infinity);

Promise.any([resolved, rejected, alsoRejected]).then(res => {
    console.log(res); // 42 只要有一个实例变为 fulfilled，包装实例就会有返回值
});


Promise.any([rejected, alsoRejected]).catch(res => {
    console.log(res); // [-1, Infinity] 所有实例都 rejected，包装实例会返回一个数组。
});
```

