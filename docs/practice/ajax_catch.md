# ajax 请求缓存

对ajax结果进行缓存（一般是get请求），可以有效节省ajax请求次数，但是也要注意脏数据问题。

如果一个页面同一个请求发送多次，二期间隔时间比较短，可以考虑使用缓存，比如缓存设置有效期5秒。

如果对ajax结果进行缓存，请求间隔时间比较短，第一次请求结果还没有返回，还没有设置缓存，后续几次依旧无法使用缓存。

可以对promise进行缓存，解决时间间隔比较小的情况下，缓存未设置情况。

```js
const cache = new Map();

function getXxx(url) {
    const catchAjax = cache.get(url);
    if(catchAjax) return catchAjax;
    
    const getAjax = ajax.get(url);
    cache.set(url, getAjax);
    
    return getAjax;    
}
```