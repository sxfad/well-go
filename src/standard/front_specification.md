# 前端规范

### 变更历史
#### 2018年3月23日 v1.0
- 基本规范

## 目录
- [文件规范](#文件规范)

- [编码规范](#编码规范)
	- [html编码规范](#html编码规范)
	- [css编码规范](#css编码规范)
	- [js编码规范](#js编码规范)
		- [基本规范](#基本规范)
		- [es6语法规范](#es6语法规范)
		- [React规范](#React规范)

- [附录](#附录)

## 文件规范

- 尽量做到结构(html文件)、样式(css文件)、功能(js文件)分离；
- 目录名、html、js、css文件用英文小写字母、单词用 `-` 分隔，不能包含空格和特殊字符；
- react组件文件（react-native文件除外）使用 `.jsx` 后缀，使用驼峰命名，首字母大写；

## 编码规范

### html编码规范

- 统一使用 `<!DOCTYPE html>` 来声明html；
- 标签、属性名一律使用小写；
- 嵌套的标签使用 tab（四个空格） 缩进；
- 标签属性使用双引号；
- 尽量减少标签数量和嵌套层级；
- 不使用`<center>`、 `<font>`等HTML5中已弃用的标签；
- 尽量使用语义化标签；
```html
<body>
    <header>...</header>
    <nav>...</nav>
    <main>...</main>
    <footer>...</footer>
</body>
```
详细标签说明参考：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element

```html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>Document Title</title>
    </head>
    <body>
        <header class="header"></header>
    </body>
</html>
```

### css编码规范

- 不使用行内样式，尽量所有样式都写在css文件中；
- css选择器一般情况下都是用class，尽量不要使用id、标签名做选择器；
- class名统一使用小写字母，用 "-" 分隔；

```css
.test-test {
    display: block;
}
```

- 不要使用`@import`引用样式文件；
- 尽量使用属性简写：

```css
padding: 10px 20px 30px 40px;
```

- 属性值为0时省略单位；

```css
margin: 0;
```

- 选择器尽量避免嵌套，最多不要超过4层；
- 每个样式属性都换行；

```css
.test {
    display: block;
    padding: 10px;
}
```

- 每条样式用空行隔开；

```css
h1 {
    ...
}

h2 {
    ...
}
```

- css属性定义按照如下顺序：

```css
.test-box {
    /* 定位相关属性 */
    position: absolute;
    top: 0;
    z-index: 0;
    /* ... */

    /* 盒模型相关属性 */
    display: block;
    width: 100px;
    height: 100px;
    /* ... */

    /* 字体相关属性 */
    font-size: 28px;
    line-height: 40px;
    /* ... */

    /* 其他属性 */
}
```

### js编码规范

#### 基本规范

- 使用字面量声明变量；

- 变量、方法使用首字母小写的驼峰命名法；

```js
var num = 1;
var str = '1';
var arr = [1, 2];
var obj = {};
```

- 同时定义多个变量时，用逗号隔开；

```js
var num = 1,
    str = '1',
    ...
```

- 对象有多个属性时，每个属性独占一行；

```js
var obj = {
    name: '',
    title: '',
};
```

- 公用常量名称使用大写字母，用下划线 `_` 分隔；

- 使用tab键进行缩进，tab设为4个空格；
- `=` `-` 等操作符前后要加空格；

```js
var num = 0;
```

- 方法注释使用 `/**...*/`，包括描述，指定类型以及参数值和返回值

```js
/**
 * 方法描述...
 * @param  {Number} arg1  参数描述...
 * @param  {String} arg2  参数描述...
 * @return {Boolean}     返回值描述...
 */
function foo(arg1, arg2) {
    // ...
    return true;
}

```

- if 判断不要嵌套太多层，一面增加代码负责度，一般最多嵌套两层。if 条件内不要有过多的判断条件；

#### es6语法规范

- 定义变量优先使用 `const`，如变量需要重新赋值再使用 `let`；

#### React规范

- 统一使用ES6作为基础语法；

- 组件及方法命名：
	- 组件命名使用驼峰命名，首字母大写；
	- 组件自定义方法、属性名、state及props属性名使用驼峰命名，首字母小写；

- 组件内函数书写顺序遵循如下顺序规则：
	- constructor
	- static
	- state
	- componentWillMount
	- componentDidMount
	- componentWillReceiveProps
	- shouldComponentUpdate
	- componentWillUpdate
	- componentDidUpdate
	- componentWillUnmount
	- 自定义函数、属性
	- render
- JSX规范
	- JSX多行时用 `()` 包裹；

	```jsx
	render() {
	    return (
	        <div>
	            {/* ... */}
	        </div>
	    );
	}
	```

	- 组件传入多个props时，每个props属性单独占一行；

	```jsx
	<DemoComponent
	    name="name"
	    number={10}
	/>
	```

	- 需要绑定 `this` 的方法使用箭头函数定义，不使用 `bind` 方法；
- redux 规范

## 附录
- [javascript规范](https://github.com/airbnb/javascript)
- [所有HTML标签说明](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)