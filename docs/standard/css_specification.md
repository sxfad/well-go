# CSS / Less 编码规范

*用更合理的方式写 CSS 和 Less，如果和具体项目中ESLint配置有冲突，以ESLint配置为准*


## 术语

### 规则声明

我们把一个（或一组）选择器和一组属性称之为 “规则声明”。举个例子：

```css
.listing {
    font-size: 18px;
    line-height: 1.2;
}
```

### 选择器

在规则声明中，“选择器” 负责选取 DOM 树中的元素，这些元素将被定义的属性所修饰。选择器可以匹配 HTML 元素，也可以匹配一个元素的类名、ID, 或者元素拥有的属性。以下是选择器的例子：

```css
.my-element-class {
    ...
}

[aria-hidden] {
    ...
}
```

### 属性

最后，属性决定了规则声明里被选择的元素将得到何种样式。属性以键值对形式存在，一个规则声明可以包含一或多个属性定义。以下是属性定义的例子：

```css
/* some selector */ {
    background: #f1f1f1;
    color: #333;
}
```

## Class命名

1. 保持 Class 命名为全小写，可以使用短划线（不要使用下划线和 camelCase 命名）。短划线应该作为相关类的自然间断。(例如，.btn 和 .btn-danger)。
1. 避免过度使用简写。.btn 可以很好地描述 button，但是 .s 不能代表任何元素。
1. Class 的命名应该尽量短，也要尽量明确。
1. 使用有意义的名称；使用结构化或者作用目标相关，而不是抽象的名称。
1. 使用 .js-* classes 来表示行为(相对于样式)，但是不要在 CSS 中包含这些 classes。

## 选择器

1. 使用 classes 而不是通用元素标签来优化渲染性能。
1. 避免在经常出现的组件中使用一些属性选择器 (例如，[class^="..."])。浏览器性能会受到这些情况的影响。
1. 减少选择器的长度，每个组合选择器选择器的条目应该尽量控制在 3 个以内。
1. 只在必要的情况下使用后代选择器 (例如，没有使用带前缀 classes 的情况).

    **Bad**
    ```css
    span {
        ...
    }

    .page-container #stream .stream-item .tweet .tweet-header .username {
        ...
    }

    .avatar {
        ...
    }
    ```

    **Good**
    ```css
    .avatar {
        ...
    }

    .tweet-header .username {
        ...
    }

    .tweet .avatar {
        ...
    }
    ```

## 代码组织

1. 不使用行内样式，尽量所有样式都写在css文件中
1. 以组件为单位组织代码。
1. 制定一个一致的注释层级结构。
1. 使用一致的空白来分割代码块，这样做在查看大的文档时更有优势。
1. 当使用多个 CSS 文件时，通过组件而不是页面来区分他们。页面会被重新排列，而组件移动就可以了。
1. 组件化开发，对应的css / less文件放到组件同一目录下。
1. 组件化开发，可以考虑使用css module功能，避免css命名冲突问题。
1. 使用theme.less文件存放主题相关变量，其他less文件引用，方便支持主题功能。


## CSS

### 格式

1. 使用 4 个空格（ soft tabs）作为缩进：

    > 为什么？这个是保证代码在各种环境下显示一致的唯一方式。

    **Bad**
    ```css
    .avatar {
      width: 30px;
      height: 30px;
      color: #fff;
    }

    ```

    **Good**
    ```css
    .avatar {
        width: 30px;
        height: 30px;
        color: #fff;
    }
    ```
1. 类名建议使用破折号代替驼峰法。如果你使用 BEM，也可以使用下划线（参见下面的 [OOCSS 和 BEM](#oocss-and-bem)）：

    **Bad**
    ```css
    mainContent {
        ...
    }
    ```
    **Good**
    ```css
    main-content {
        ...
    }
    ```

1. 不要使用 ID 选择器：

    > 为什么？ID具有唯一性，如果重复定义，会引起意料之外的bug，并且不可复用


1. 在一个规则声明中应用了多个选择器时，每个选择器独占一行：

    > 为什么？独占一行可以增加可读性，便于增删。

    **Bad**
    ```css
    .one, .tow, .three {
        ...
    }
    ```

    **Good**
    ```css
    .one,
    .tow,
    .three {
        ...
    }
    ```

1. 在规则声明的左大括号 `{` 前加上一个空格：

    **Bad**
    ```css
    .selector{
        ...
    }
    ```

    **Good**
    ```css
    .selector {
        ...
    }
    ```


1. 在属性的冒号 `:` 后面加上一个空格，前面不加空格：

    **Bad**
    ```css
    .selector {
        height:30px;
        width :30px;
        color : #fff;
    }
    ```

    **Good**
    ```css
    .selector {
        height: 30px;
        width: 30px;
        color: #fff;
    }
    ```

1. 规则声明的右大括号 `}` 独占一行：

    > 为什么？这样比较容易区分一个声明的结束位置，并便于在最后属性回车添加新属性；

    **Bad**
    ```css
    .selector {
        height: 30px;
        width: 30px;}
    ```

    **Good**
    ```css
    .selector {
        height: 30px;
        height: 30px;
    }
    ```

1. 规则声明之间用空行分隔开：

    > 为什么？空行可以作为各个声明的分割线，比较容易区分各个声明

    **Bad**
    ```css
    .one {
        ...
    }
    .tow {
        ...
    }
    .three {
        ...
    }
    ```

    **Good**
    ```css
    .one {
        ...
    }

    .tow {
        ...
    }

    .three {
        ...
    }
    ```

1. 每个属性最后以`;`号结尾，最后一条属性`;`号虽然可以省略，但是也要以`;`号结尾：

    > 为什么？最后一个属性以`;`号结尾，方便以后增删属性，同时可以保持清洁的 gif diff 记录

    **Bad**
    ```css
    .selector {
        width: 30px;
        height: 30px;
        color: #fff
    }
    ```

    **Good**
    ```css
    .selector {
        width: 30px;
        height: 30px;
        color: #fff;
    }
    ```

1. ','分割的多属性值，','后添加一个空格：

    **Bad**
    ```css
    .selector {
        color: rgba(0,0,0,.5);
        box-shadow: 0 1px 2px #ccc,inset 0 1px 0 #fff;
    }
    ```

    **Good**
    ```css
    .selector {
        color: rgba(0, 0, 0, .5);
        box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
    }
    ```

1. 分数属性值，省略不必要的0：

    > 为什么？这有助于区分多个属性值（逗号、空格）和多个属性值（逗号和空格）

    **Bad**
    ```css
    .selector {
        color: rgba(0, 0, 0, 0.5);
    }
    ```

    **Good**
    ```css
    .selector {
        color: rgba(0, 0, 0, .5);
    }
    ```

1. 所有的十六进制属性值使用小写字母：

    > 为什么？小写字母有跟多的外形，在阅读过程中能够更轻松的被区分开来

    **Bad**
    ```css
    .selector {
        color: #ffEEdd;
        background-color: #FFF;
    }
    ```

    **Good**
    ```css
    .selector {
        color: #fed;
        background-color: #fff;
    }
    ```

1. 尽可能使用简写十六进制属性值；

    **Bad**
    ```css
    .selector {
        color: #ffffff;
        background: #aabbcc;
    }
    ```

    **Good**
    ```css
    .selector {
        color: #fff;
        background: #abc;
    }
    ```

1. 为选择器中的属性取值添加引号：

    **Bad**
    ```css
    input[type=text] {
        ...
    }
    ```

    **Good**
    ```css
    input[type="text"] {
        ...
    }
    ```

1. 不要为属性值0指定单位:

    **Bad**
    ```css
    .selector {
        width: 0px;
    }
    ```

    **Good**
    ```css
    .selector {
        width: 0;
    }
    ```

1. 在定义无边框样式时，使用 `0` 代替 `none`。

    **Bad**
    ```css
    .foo {
        border: none;
    }
    ```

    **Good**
    ```css
    .foo {
        border: 0;
    }
    ```

### 声明顺序
> 一致的声明顺序方便阅读查找，据说也能够增加浏览器解析css速度。Positioning 处在第一位，因为他可以使一个元素脱离正常文本流，并且覆盖盒模型相关的样式。盒模型紧跟其后，因为他决定了一个组件的大小和位置。其他属性只在组件 内部 起作用或者不会对前面两种情况的结果产生影响，所以他们排在后面。

相关的属性声明应该以下面的顺序分组处理：

1. Positioning 位置
1. Box model 盒模型
1. Typographic 排版
1. Visual 外观

也可以理解为：

1. 位置
1. 大小
1. 自身属性
1. 内容属性
1. 其他

    **Bad**
    ```css
    .selector {
        text-align: center;
        color: #fff;
        width: 30px;
        position: relative;
    }
    ```

    **Good**
    ```css
    .selector {
        position: relative;
        width: 30px;
        color: #fff;
        text-align: center;
    }
    ```

    **Good**
    ```css
    {
        /* Positioning */
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;

        /* Box-model */
        display: block;
        float: right;
        width: 100px;
        height: 100px;

        /* Typography */
        font: normal 13px "Helvetica Neue", sans-serif;
        line-height: 1.5;
        color: #333;
        text-align: center;

        /* Visual */
        background-color: #f5f5f5;
        border: 1px solid #e5e5e5;
        border-radius: 3px;

        /* Misc */
        opacity: 1;
    }
    ```

    **Recess的order参考**
    ```js
    var order = [
        'position',
        'top',
        'right',
        'bottom',
        'left',
        'z-index',
        'display',
        'float',
        'width',
        'height',
        'max-width',
        'max-height',
        'min-width',
        'min-height',
        'padding',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',
        'margin',
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',
        'margin-collapse',
        'margin-top-collapse',
        'margin-right-collapse',
        'margin-bottom-collapse',
        'margin-left-collapse',
        'overflow',
        'overflow-x',
        'overflow-y',
        'clip',
        'clear',
        'font',
        'font-family',
        'font-size',
        'font-smoothing',
        'osx-font-smoothing',
        'font-style',
        'font-weight',
        'hyphens',
        'src',
        'line-height',
        'letter-spacing',
        'word-spacing',
        'color',
        'text-align',
        'text-decoration',
        'text-indent',
        'text-overflow',
        'text-rendering',
        'text-size-adjust',
        'text-shadow',
        'text-transform',
        'word-break',
        'word-wrap',
        'white-space',
        'vertical-align',
        'list-style',
        'list-style-type',
        'list-style-position',
        'list-style-image',
        'pointer-events',
        'cursor',
        'background',
        'background-attachment',
        'background-color',
        'background-image',
        'background-position',
        'background-repeat',
        'background-size',
        'border',
        'border-collapse',
        'border-top',
        'border-right',
        'border-bottom',
        'border-left',
        'border-color',
        'border-image',
        'border-top-color',
        'border-right-color',
        'border-bottom-color',
        'border-left-color',
        'border-spacing',
        'border-style',
        'border-top-style',
        'border-right-style',
        'border-bottom-style',
        'border-left-style',
        'border-width',
        'border-top-width',
        'border-right-width',
        'border-bottom-width',
        'border-left-width',
        'border-radius',
        'border-top-right-radius',
        'border-bottom-right-radius',
        'border-bottom-left-radius',
        'border-top-left-radius',
        'border-radius-topright',
        'border-radius-bottomright',
        'border-radius-bottomleft',
        'border-radius-topleft',
        'content',
        'quotes',
        'outline',
        'outline-offset',
        'opacity',
        'filter',
        'visibility',
        'size',
        'zoom',
        'transform',
        'box-align',
        'box-flex',
        'box-orient',
        'box-pack',
        'box-shadow',
        'box-sizing',
        'table-layout',
        'animation',
        'animation-delay',
        'animation-duration',
        'animation-iteration-count',
        'animation-name',
        'animation-play-state',
        'animation-timing-function',
        'animation-fill-mode',
        'transition',
        'transition-delay',
        'transition-duration',
        'transition-property',
        'transition-timing-function',
        'background-clip',
        'backface-visibility',
        'resize',
        'appearance',
        'user-select',
        'interpolation-mode',
        'direction',
        'marks',
        'page',
        'set-link-source',
        'unicode-bidi',
        'speak',
    ];
    ```

### 不要使用@import

相比`<link>`标签，`@import`性能不好，会增加额外的页面请求，也会引发其他未知问题

**Bad**

```css
@import url("more.css");
```

**Good**
```html
<link rel="stylesheet" href="more.css"/>
```

**Good**
```less
// 使用less引入
@import "../../index.less";
```

### 媒体查询位置

尽量将媒体查询的位置靠近他们相关的规则。不要将他们一起放到一个独立的样式文件中，或者丢在文档的最底部。这样做只会让大家以后更容易忘记他们。这里是一个典型的案例。

**Good**
```css
.element { ... }
.element-avatar { ... }
.element-selected { ... }

@media (min-width: 480px) {
    .element { ...}
    .element-avatar { ... }
    .element-selected { ... }
}
```

### 前缀属性

当使用厂商前缀属性时，通过缩进使取值垂直对齐以便多行编辑。一般项目环境通过构建可以自动添加前缀，编写css时不必关心前缀问题

**Bad**
```css
.selector {
    -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.15);
    box-shadow: 0 1px 2px rgba(0,0,0,.15);
}
```

**Good**
```css
.selector {
    -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.15);
            box-shadow: 0 1px 2px rgba(0,0,0,.15);
}
```


### 注释

* 建议使用行注释 (在 less 中是 `//`) 代替块注释。
* 建议注释独占一行。避免行末注释。
* 给没有自注释的代码写上详细说明，比如：
  - 为什么用到了 z-index
  - 兼容性处理或者针对特定浏览器的 hack

### OOCSS 和 BEM

出于以下原因，我们鼓励使用 OOCSS 和 BEM 的某种组合：

  * 可以帮助我们理清 CSS 和 HTML 之间清晰且严谨的关系。
  * 可以帮助我们创建出可重用、易装配的组件。
  * 可以减少嵌套，降低特定性。
  * 可以帮助我们创建出可扩展的样式表。

**OOCSS**，也就是 “Object Oriented CSS（面向对象的CSS）”，是一种写 CSS 的方法，其思想就是鼓励你把样式表看作“对象”的集合：创建可重用性、可重复性的代码段让你可以在整个网站中多次使用。

参考资料：

  * Nicole Sullivan 的 [OOCSS wiki](https://github.com/stubbornella/oocss/wiki)
  * Smashing Magazine 的 [Introduction to OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)

**BEM**，也就是 “Block-Element-Modifier”，是一种用于 HTML 和 CSS 类名的_命名约定_。BEM 最初是由 Yandex 提出的，要知道他们拥有巨大的代码库和可伸缩性，BEM 就是为此而生的，并且可以作为一套遵循 OOCSS 的参考指导规范。

  * CSS Trick 的 [BEM 101](https://css-tricks.com/bem-101/)
  * Harry Roberts 的 [introduction to BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

**示例**

```html
<article class="listing-card listing-card--featured">

  <h1 class="listing-card__title">Adorable 2BR in the sunny Mission</h1>

  <div class="listing-card__content">
    <p>Vestibulum id ligula porta felis euismod semper.</p>
  </div>

</article>
```

```css
.listing-card { }
.listing-card--featured { }
.listing-card__title { }
.listing-card__content { }
```

  * `.listing-card` 是一个块（block），表示高层次的组件。
  * `.listing-card__title` 是一个元素（element），它属于 `.listing-card` 的一部分，因此块是由元素组成的。
  * `.listing-card--featured` 是一个修饰符（modifier），表示这个块与 `.listing-card` 有着不同的状态或者变化。

### ID 选择器

在 CSS 中，虽然可以通过 ID 选择元素，但大家通常都会把这种方式列为反面教材。ID 选择器给你的规则声明带来了不必要的高[优先级](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)，而且 ID 选择器是不可重用的。

想要了解关于这个主题的更多内容，参见 [CSS Wizardry 的文章](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/)，文章中有关于如何处理优先级的内容。

### JavaScript 钩子

避免在 CSS 和 JavaScript 中绑定相同的类。否则开发者在重构时通常会出现以下情况：轻则浪费时间在对照查找每个要改变的类，重则因为害怕破坏功能而不敢作出更改。

我们推荐在创建用于特定 JavaScript 的类名时，添加 `.js-` 前缀：

```html
<button class="btn btn-primary js-request-to-book">Request to Book</button>
```

## Less

### 嵌套选择器

尽量避免使用嵌套。_如果有必要_用到嵌套选择器，把它们放到最后，在规则声明和嵌套选择器之间要加上空白，相邻嵌套选择器之间也要加上空白。嵌套选择器中的内容也要遵循上述指引。

```scss
.btn {
  background: green;
  font-weight: bold;
  @include transition(background 0.5s ease);

  .icon {
    margin-right: 10px;
  }
}
```

**请不要让嵌套选择器的深度超过 3 层！**

```scss
.page-container {
  .content {
    .profile {
      // STOP!
    }
  }
}
```

再说一遍: **永远不要嵌套 ID 选择器！**

如果你始终坚持要使用 ID 选择器（劝你三思），那也不应该嵌套它们。如果你正打算这么做，你需要先重新检查你的标签，或者指明原因。如果你想要写出风格良好的 HTML 和 CSS，你是**不**应该这样做的。


### 变量

尽量使用主题定义的变量，有助于生成不同的主题；

1. 变量名应使用破折号（例如 `@my-variable`）代替 camelCased 和 snake_cased 风格

    **Bad**
    ```less
    @camelCased: #fff;
    @snake_cased: #fff;
    ```

    **Good**
    ```less
    @my-variable: #fff;
    ```

1. 对于仅用在当前文件的变量，可以在变量名之前添加下划线前缀，可以区分变量来源（例如 `@_my-variable`）。
