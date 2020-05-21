# react中链接跳转到本地html页面
项目中，可能需要链接跳转到静态的h5页面，比如点击帮助手册跳转到本地写好的一个页面。

这时我们一般将h5文件放到public目录下。

> public文件夹作用？

    如果将文件放入public文件夹下，webpack将不会处理它。
    
    在实际项目中，如果希望某些文件（比如jquery.min.js或者一些静态的html页面）不被编译，就可以把文件放在public文件夹中。
    
    这样还可以减少文件构建时间，可以减少构建文件的大小。    

## 如何使用公共文件夹public? 
项目下全局搜索 %PUBLIC_URL% ,会发现关键字在webpack的一些配置文件和public/index.html中涉及到。
    
当运行 yarn start 时，webpack 将替换 %PUBLIC_URL% 为正确的绝对路径，因此即使使用客户端路由时项目也会正常工作。
    
### 步骤1
```js
// public/index.html 文件的script标签设置全局变量 PUBLIC_URL
<script>
    window.PUBLIC_URL = '%PUBLIC_URL%';
</script>
```

### 步骤2
```js
// 项目的组件中 test.html是public下的静态html文件
<a href={`${window.PUBLIC_URL}/test.html`}>click</a>
```
