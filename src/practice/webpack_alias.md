# webpack别名应用

## 问题
在使用import引入自定义组件时，往往要写相对路径，各种`../../`，引入时不好定位，复制粘贴之后还要改。

## 解决方案
1. 把src目录起别名为@，方便组件的引用:
    ```js
    alias: {
        '@': paths.appSrc,
    },
    ```
1. WebStorm设置，选定webpack配置，WebStorm将能识别@，ctrl 或 command + 点击可跳转；
    ```text
    WebStorm -> perferences... -> Languages & FrameWorks -> JavaScript -> Webpack
    ```

## 使用

```
import UserSelect from '@/pages/user/UserSelect';
```