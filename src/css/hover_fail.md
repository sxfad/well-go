# css hover失效的几种情况

## a标签hover时失效
注意下 a 标签伪类的使用顺序
```css
a:link 
a:visited
a:hover
a:active
```

## 鼠标悬浮，让其他元素改变样式
只有 **后代元素** 和 **紧邻它后面的兄弟元素(一定是它后面的)** 会生效。
```html
<div class="father">
    <div class="child1"></div>
    <div class="child2"></div>
</div>
```

**后代元素**
```css
.father:hover .child1 {
    background: red;
}
```

**紧邻它后面的兄弟元素，并且一定要加上加号**
```css
.child1:hover +.child2 {
    background: red;
}
```

## 若父元素相对定位，子元素绝对定位，依旧遵循上面的规则
