# 基础数据下拉封装

## 场景
一个项目中的基础数据往往多处以下拉的形式会用到。

## 问题
如果每次用到都发送请求获取数据，然后构造下拉，会存在大量的重复代码。

## 方案
将基础数据下拉进行封装，下拉内部自己获取数据，调用者当做普通的Antd Select使用即可。不仅仅是Select，Transfer、Tree、SelectTree等都可以做类似的封装，方便调用；

## 实现方式

比如用户下拉
```
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Select} from 'antd';
import config from '@/commons/config-hoc';

const {Option} = Select;

@config({
    ajax: true,
})
export default class UserSelect extends Component {
    static propTypes = {
        labelAsValue: PropTypes.bool,
    };

    state = {
        dataSource: [],
    };

    componentDidMount() {
        this.props.ajax.get('/user/all')
            .then(data => {
                const {} = this.props;
                let dataSource = [];

                if (data && data.length) {
                    dataSource = data.map(item => ({value: item.id, label: item.realname}));
                }

                this.setState({dataSource});
            });
    }

    render() {
        const {dataSource} = this.state;

        return (
            <Select allowClear showSearch optionFilterProp="children" {...this.props}>
                {dataSource.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
            </Select>
        );
    }
}

```

使用方法
```
import UserSelect from 'path/to/UserSelect';

// 将UuserSelect当成Antd原生的Select方式使用即可
```