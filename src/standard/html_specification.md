# HTML编码规范

如果具体项目中有ESLint配置，以ESLint为准

## 语法

1. 统一使用 `<!DOCTYPE html>` 来声明html。
1. 使用`<meta charset="UTF-8">`作为字符编码。
1. 使用四个空格的 soft tabs — 这是保证代码在各种环境下显示一致的唯一方式。
1. 嵌套的节点应该缩进（四个空格）。
1. 在属性上，使用双引号，不要使用单引号。
1. 标签、属性名一律使用小写。
1. 不要忽略可选的关闭标签（例如，`</li>` 和 `</body>`）。
1. 尽量减少标签数量和嵌套层级。
1. 不使用`<center>`、 `<font>`等HTML5中已弃用的标签。
1. 尽量遵循 HTML 标准和语义化
1. 引入 CSS JavaScript时不需要指明type，默认就是`text/css` 和 `text/javascript`


**Example**
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Page title</title>
        <link rel="stylesheet" href="code-guide.css">
        <style>
            /* ... */
        </style>
        <script src="code-guide.js"></script>
    </head>
<body>
    <img src="images/company-logo.png" alt="Company"/>

    <h1 class="hello-world">Hello, world!</h1>
</body>
</html>
```

## 属性顺序

HTML 属性应该按照特定的顺序出现以保证易读性。

1. `id`
1. `class`
1. `name`
1. `data-*`
1. `src, for, type, href, value , max-length, max, min, pattern`
1. `placeholder, title, alt`
1. `aria-*, role`
1. `required, readonly, disabled`

id作为标签的唯一标识，放在第一位，同时尽量不要给元素添加id属性。

**Example**
```
<a id="..." class="..." data-modal="toggle" href="#">
    Example link
</a>

<input class="form-control" type="text">

<img src="..." alt="...">
```

## Boolean 值属性

不要为Boolean值的属性添加 `true` 或 `false`值。

Boolean 属性指不需要声明取值的属性。XHTML 需要每个属性声明取值，但是 HTML5 并不需要。

了解更多内容，参考 [WhatWG section on boolean attributes](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#boolean-attributes):

_一个元素中 Boolean 属性的存在表示取值 true，不存在则表示取值 false_。

**Example**
```
<input type="text" disabled>

<input type="checkbox" value="1" checked>

<select>
    <option value="1" selected>1</option>
</select>
```