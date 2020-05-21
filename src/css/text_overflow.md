# 文本溢出截断省略
分类：单行文本溢出省略、多行文本溢出省略。

## 单行文本溢出省略
没有兼容性问题。文本是中文英文数字都可以。
```css
.box {
    width: 50px;
    white-space: nowrap; /* 在一行显示，不能换行 */
    overflow: hidden; /* 超出隐藏 */
    text-overflow: ellipsis; /* 文本溢出时，以省略号显示 */
}
```
```html
<div class="box" id="box">
    测试文字测试文字测试文字测试文字测试文字测试文字测试文字
</div>
```

## 多行文本溢出省略

### css实现
只有 WebKit 内核的浏览器才支持。文本是中文英文数字都可以。
```css
.box {
    width: 100px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2; /* 限制显示的文本行数 */
    -webkit-box-orient: vertical; /* 检索子元素排列方式为垂直 */
}
```

### js实现
没有兼容性问题。
```js
const cutStr = (text = '测试文字测试文字测试文字测试文字测试文字测试文字测试文字') => {
    const totalTextLen = text.length;
    const ele = document.getElementById('box');
    const lineNum = 2; // 限定行数
    const baseFontSize = window.getComputedStyle(ele).fontSize.slice(0, -2); // 16px 获取元素字体大小 用slice将px截掉
    const lineWidth = window.getComputedStyle(ele).width.slice(0, -2); // 100px 获取元素的总宽度 用slice将px截掉

    let content = '';

    const strNum = Math.floor(lineWidth / baseFontSize); // 一行可容纳字数
    const totalStrNum = Math.floor(strNum * lineNum); // 总共可显示的字数
    const lastIndex = totalStrNum - totalTextLen; // 要从末尾开始截取 所以最好获取一个负数

    if (totalTextLen > totalStrNum) {
        content = text.slice(0, lastIndex - 2).concat('...');
    } else {
        content = text;
    }

    ele.innerHTML = content;
};
```
