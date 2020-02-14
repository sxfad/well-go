# 原生js实现元素拖拽及缩放
应用场景：二维码等图片的拖拽缩放。

## Dom结构
### html
```html
<div class="box" id="box">
    <div class="qr-code-wrap" id="qr-code">
        <img
                src='../imgs/logo.ico'
                alt="qr-code"
                class="qr-code"
                onmousedown='handleMove(event)'
        />
        <div
                class="scale"
                onmousedown='handleScale(event)'
        >
        </div>
    </div>
</div>
```

### css
```css
.box {
    width: 100vw;
    height: 100vh;
    position: relative;
}
.qr-code-wrap {
    width: 100px;
    height: 100px;
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
}
.qr-code {
    width: 100%;
    height: 100%;
    cursor: move;
}
.scale {
    border-right: 2px solid rgba(105, 105, 105, .8);
    border-bottom: 2px solid rgba(105, 105, 105, .8);
    width: 8px;
    height: 8px;
    overflow: hidden;
    cursor: se-resize;
    position: absolute;
    right: 0;
    bottom: 0;
}
```

## 拖拽
```js
handleMove = (e) => {
    e.preventDefault();
    
    const box = document.getElementById('box');
    const qr = document.getElementById('qr-code');
    let disX = e.clientX - qr.offsetLeft;
    let disY = e.clientY - qr.offsetTop;
    
    box.onmousemove = function (ev) {
        e = ev;
        e.preventDefault();
        let x = e.clientX - disX;
        let y = e.clientY - disY;
    
        // 图形移动的边界判断
        x = x <= 0 ? 0 : x;
        x = x >= box.offsetWidth - qr.offsetWidth ? box.offsetWidth - qr.offsetWidth : x;
        y = y <= 0 ? 0 : y;
        y = y >= box.offsetHeight - qr.offsetHeight ? box.offsetHeight - qr.offsetHeight : y;
        qr.style.left = x + 'px';
        qr.style.top = y + 'px';
    };
    
    // 图形移出父盒子取消移动事件,防止移动过快触发鼠标移出事件,导致鼠标弹起事件失效
    box.onmouseleave = () => {
        box.onmousemove = null;
        box.onmouseup = null;
    };
    
    box.onmouseup = () => {
        box.onmousemove = null;
        box.onmouseup = null;
    }
};
```

## 缩放
```js
handleScale = (e) => {
    // 阻止冒泡,避免缩放时触发移动事件
    e.stopPropagation();
    e.preventDefault();

    const box = document.getElementById('box');
    const qr = document.getElementById('qr-code');

    // 获取初始位置
    let pos = {
        'w': qr.offsetWidth,
        'h': qr.offsetHeight,
        'x': e.clientX,
        'y': e.clientY
    };

    box.onmousemove = function (ev) {
        ev.preventDefault();
        // 设置图片的最小缩放为30*30
        let w = Math.max(30, ev.clientX - pos.x + pos.w);
        let h = Math.max(30, ev.clientY - pos.y + pos.h); 

        // 设置图片的最大宽高
        w = w >= box.offsetWidth - qr.offsetLeft ? box.offsetWidth - qr.offsetLeft : w;
        h = h >= box.offsetHeight - qr.offsetTop ? box.offsetHeight - qr.offsetTop : h;
        qr.style.width = w + 'px';
        qr.style.height = h + 'px'; // 如果要求图片只能横向放大，不允许纵向放大，可将 h 改为 w
    };

    box.onmouseleave = () => {
        box.onmousemove = null;
        box.onmouseup = null;
    };

    box.onmouseup = () => {
        box.onmousemove = null;
        box.onmouseup = null;
    }
}
```
