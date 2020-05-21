# Antd validator 截流发送请求校验

## 场景
常见发送请求，校验某个名称是否重复

## 问题
如果不做截流处理，用户每次按键都会发送一次请求。

## 方案
使用截流处理，等待用户输入完成之后，只发送一次请求。

## 实现

校验从组建中单独提出
```jsx
import _ from 'lodash';

{
    // 截流校验写法，如果同一个页面多次使用，必须使用不同的key进行区分
    userNameExist(key = '_userNameExit', prevValue, message = '用户名重复') {
        if (!this[key]) this[key] = _.debounce((rule, value, callback) => {
            if (!value) return callback();

            if (prevValue && value === prevValue) return callback();
            console.log('发请求');
            if (value === '1') return callback(message);

            callback();
        }, 500);
        return {
            validator: this[key]
        }
    },
}


import validator from '@/library/utils/validation-rule';


<FormElement
    label="姓名"
    tip="就是姓名"
    field="name"
    required
    initialValue={data.name}
    rules={[
        validator.noSpace(),
        validator.userNameExist(),
    ]}
/>
```

校验写在当前组件
```jsx

import _ from 'lodash';

// 截流校验写法
// 节流校验写法 如果同一个页面多次调用，必须传递key参数
    userNameExist = (key = 'userNameExit', prevValue, message = '用户名重复') => {
        if (!this[key]) this[key] = _.debounce((rule, value, callback) => {
            if (!value) return callback();
            if (prevValue && value === prevValue) return callback();

            if (value === '22') return callback(message);

            console.log('组件内节流发请求');
            return callback();
        }, 500);

        return {validator: this[key]};
    };

<FormElement
    label="姓名"
    tip="就是姓名"
    field="name"
    required
    initialValue={data.name}
    rules={[
        validator.noSpace(),
        {validator: this.userNameExist}
    ]}
/>
```