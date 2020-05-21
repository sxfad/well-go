# js中的变量提升
定义：所有的声明（变量和函数）都会被“移动”到各自作用域的最顶端，这个过程被称为提升。

分类：变量提升和函数提升。主要讨论es5中的变量提升，es6出了let、const防止变量提升。

## 变量提升
变量声明提升到函数的顶部，但是变量赋值不会提升。
```js
console.log(a1);
var a1 = 100;
function test() {
    console.log(a1);
    var a1 = 200;
    console.log(a1);
}
test();
console.log(a1);

// 输出是 undefined undefined 200 100
// 将上面代码变形会得到下面的代码。

var a1;
console.log(a1); // undefined
a1 = 100;
function test() {
    var a1; 
    console.log(a1); // undefined 注意：提升指的是移动到所在作用域的顶端，即当前函数内部作用域。
    a1 = 200;
    console.log(a1); // 200
}
test();
console.log(a1); // 100
```

## 函数提升
js中声明函数一般有两种方式：函数声明（会提升）、变量+匿名函数声明（不会提升）。
```js
function test() {} // 函数声明 会执行函数提升
var test = function() {} // 变量+匿名函数 不会执行函数提升
```

### 函数声明方式
```js
test(); // 可以被提升
function test(){
    console.log("可以被提升");
}
```

### 变量+匿名函数方式
```js
test(); // Uncaught TypeError: test1 is not a function
var test = function() {
    console.log("可以被提升");
}
```

### 两种方式都存在时
当两种方式都存在时，会遵循上面提到的规则，函数声明（会提升）、变量+匿名函数声明（不会提升）
```js
func();

var func = function() {
    console.log('func1');
}

func();

function func() {
    console.log('func2');
}

func();

// 输出是 func2 func1 func1
// 将上面代码变形会得到下面的代码。

function func() { // 函数声明方式会被提升到顶部
    console.log('func2');
}

func(); // func2

var func = function() { // 不会被提升，并且对函数重新赋值
    console.log('func1'); 
}

func(); // func1

func(); // func1
```


