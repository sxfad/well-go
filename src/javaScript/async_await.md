# 处理异步之async-await

> async-await和Promise的关系?
    
    我们用async-await书写代码时更加流畅，增强代码可读性，async-await是建立在promise机制之上的，并不能取代其地位。

> async-await有什么缺点？
    
    async-await将异步逻辑以同步方式实现，所以会造成阻塞。
    
    如果多个异步操作之间有因果关系，那么适合用async-await。如果没有，那还是用promise比较适合。
     
## 基本语法

### async
async用来表示函数是异步的，定义的函数会返回一个promise对象，可以使用then方法添加回调函数。
```js
async function testAsync() {
    return 111;
}

testAsync().then(val => {
    console.log(val); // 111
});

// 若async定义的函数有返回值，相当于Promise.resolve(111)。
// 没有return则相当于执行了Promise.resolve()，会返回undefined。
```

### await
**await 必须出现在 async 函数内部**，不能单独使用。
```js
function error() {
  await Math.random();
}

notAsyncFunc(); 

// Uncaught SyntaxError: Unexpected identifier
// 会报错，必须在async内部使用
```

如果await的是promise对象会造成异步函数**停止执行并且等待**promise的解决。

如果等的是正常的表达式则立即执行。
```js
function sleep(second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('enough sleep~');
        }, second);
    })
}

function normalFunc() {
    console.log('normalFunc');
}

async function awaitDemo() {
    await normalFunc(); // 等待普通表达式
    console.log('something, ~~');
    let result = await sleep(2000); // 等待的是promise对象
    console.log(result); // 两秒之后会被打印出来
}

awaitDemo();

// normalFunc
// something, ~~
// enough sleep~ 这句会在两秒后打印
```

### reject错误处理
通过try catch 去处理 Promise.reject 返回来的数据。
```js
function sleep(second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('throw error~');
        }, second);
    })
}

// 视情况而定，如果需要处理reject，就在代码块外面包一层try catch
async function errorDemo() {
    try {
        let result = await sleep(1000);
    } catch (err) {
        console.log(err); // throw error
    }
}

errorDemo();
```

## 项目案例

### 案例1
如果有三个ajax请求需要发生，第三个依赖第二个的结果，第二个依赖第一个的结果。
```js
function sleep(second, param) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(param);
        }, second);
    })
}

// async-await形式
async function test() {
    let result1 = await sleep(2000, 'req1');
  	console.log(result1); // 2秒后输出req1
    
    let result2 = await sleep(1000, 'req2' + result1);
	console.log(result2); // 3秒后输出re2req1
    
    let result3 = await sleep(500, 'req3' + result2);
    console.log(result3); // 3.5秒后输出req3req2req1
}

test();
```

### 案例2 处理并行请求 
如果有三个异步请求需要发送，相互没有关联，只是需要当请求都结束后将界面的 loading 清除掉即可。
```js
function sleep(second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('request have done! ' + Math.random());
        }, second);
    })
}

// async-await形式
async function correctDemo() {
    let p1 = sleep(2000);
    let p2 = sleep(2000);
    let p3 = sleep(2000);
  
    await Promise.all([p1, p2, p3]); // 所以说async-await基于Promise机制
    console.log('clear the loading~');
}

correctDemo(); // clear the loading~
```

## async-await比promise或回调方式好在哪？
通过计时器模拟异步写个例子去看下，不管从代码可读性还是代码数量上async-await看起来更好些。

### 回调方式
```js
// 回调的缺点很明显，仅仅三层，代码可读性很差。
const timer = (delay, num) => {
  setTimeout(() => {
    console.log(num);
    num += 1;
    setTimeout(() => {
      console.log(num);
      num += 1;
      setTimeout(() => {
        console.log(num);
      }, delay, num)
    }, delay, num)
  }, delay, num)
}

timer(1000, 1); // 每隔一秒输出1 2 3
```

### promise
```js
const timer = (delay, num) => {
  return new Promise((resolve, reject) => {
	setTimeout(() => {
        resolve(num);
      }, delay)
  })
}

// 三层的情况下promise看起来还可以，但是如果我们想在步骤3拿到步骤1的val值我们会怎么做？
// 第一种 我们可以把步骤1的val值赋值给一个全局变量，然后在步骤3中可以拿到。
// 第二种 可以把步骤1的val值通过return向下传递。
// 但无疑都是比较麻烦的。
timer(1000, 1)
  .then(val => {
    console.log(val); // 步骤1
    return timer(1000, 2)
  })
  .then(val => {
    console.log(val);
    return timer(1000, 3)
  })
  .then(val => {
    console.log(val); // 步骤3
  })
```

### async-await
```js
const timer = (delay, num) => {
	return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num);
    }, delay)
  })
}

// 像写同步代码那样去编写异步代码
// 并且在async声明的函数内部，可以很方便的拿到每个步骤的返回值
async function start() {
  const step1 = await timer(1000, 1);
  console.log(step1)
  
  const step2 = await timer(1000, 2);
  console.log(step2)
  
  const step3 = await timer(1000, 3);
  console.log(step3)
}

start();
```
