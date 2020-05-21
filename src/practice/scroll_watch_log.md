# 滚动加载日志等(节流限制)
滚动加载日志，滚动加载博客列表等。

## html
基于react项目编写代码。
```html
<div styleName='scroll-box' ref={node => this.scrollBox = node}>
    {
        this.state.data.map(item => (
            <div>{item}</div>
        ))
    }
</div>
```

## css
```less
.scroll-box {
    width: 300px;
    height: 400px;
    background: goldenrod;
    overflow: scroll;
    > div {
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #fff;
        font-size: 28px;
        border-bottom: 1px solid #fff;
    }
}
```

## js
基于react项目编写代码。
```js
state = {
    data: Array(20).fill().map((item, index) => index + 1),
};

componentDidMount() {
    this.scrollBox.addEventListener('scroll', this.throttle(this.handleScroll, 300))
}

handleScroll = () => {
    const {data} = this.state;
    const {offsetHeight, scrollHeight, scrollTop} = this.scrollBox;
    const height = scrollHeight - offsetHeight;

    // 滚动条每次滚动到距离底部 <=200px 时
    if (height - scrollTop <= 200) {
        // 调ajax请求等
        this.setState({
            data: data.concat(data)
        })
    }
};

throttle = (func, delay) => {
    let prev = Date.now();

    return function() {
        let context = this;
        let args = arguments;
        let now = Date.now();

        // 第一次会立即执行，因为事件绑定函数的时间 - 真正触发事件的时间 一般 >= delay
        if (now - prev >= delay) {
            func.apply(context, args);
            prev = Date.now();
        }
    }
};
```
