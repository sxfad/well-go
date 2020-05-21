# 关于setTimeout的使用
setTimeout() 方法用于在指定的毫秒数后调用函数或执行表达式。

返回一个 ID（数字），可以将这个ID传递给 clearTimeout() 来取消执行。

## 参数说明

参数|说明|是否必须|默认值
---|---|---|---
function|要延时执行的函数|必须
seconds|延时时间|选填|默认为0
参数|传入函数的参数|选填|可以有多个参数，用逗号隔开

```js
setTimeout(function(a, b) {
  console.log(a, b); // param1 param2
}, 1000, 'param1', 'param2')
```

## 使用例子
只列举了一些常用的。

### 例子1
```js
function test() {
    console.log(111);
    setTimeout(() => console.log(222), 2000);
    setTimeout(() => console.log(333), 0);
    console.log(444);
}

test();
/*
    111
    444
    333
    222
    
    js是单线程的，意味着所有任务需要排队，前一个任务结束，才会执行后一个任务。
    js中同时维护着一个任务队列，上面代码中当遇到setTimeout()时，会把里面对应的函数放在任务队列中。
    当js线程空出来了并达到指定的延时时间后，才会把对应函数放到js线程中执行。
*/
```

### 例子2
利用例子1中setTimeout的延时机制，我们可以应用到react框架中。
```js
// 虽然例子有些不恰当，但是可以用来解释原理。
// 正常来说，由于setState机制，在handleShow函数内部拿不到最新的state。
handleShow = () => {
    // 利用setTimeout把代码块放到任务队列中，当线程中任务为空，再去执行。
    setTimeout(() => console.log(this.state.num), 0); // 最新的state

    console.log(this.state.num); // 之前的state
};

handleClick = () => {
    this.setState({
        num: this.state.num + 1,
    });

    this.handleShow();
};
```
