# Antd 使用Modal进行数据条件、修改脏数据问题

## 场景
常规的增删改查页面，如果添加、修改的字段并不是很多，推荐使用弹框方式展现。

## 问题
Antd Modal每次展示并不是新建一个弹框，而是现实隐藏，新增和不同数据编辑时，会出现Form表单显示的是上一次的数据。如果通过一些周期函数，或者form.setFieldsValue等API去解决，会增加组件的复杂度。

## 设计
简化调用者的使用，编辑组件只需要一些必要的属性，绝大部分功能在编辑组件内部实现。单一职责原则。

1. 编辑组件接收Modal需要的少量控制显示隐藏的参数；
1. 编辑组件额外接收一个id，用户获取编辑时的回显数据；
2. 编辑组件内部自己发请求获取回显数据，内部自己发请求进行新增或者修改，简化调用者复杂度。方便重用。

## 实现方案

1. Modal 使用 destroyOnClose 属性，每次关闭，都销毁Modal中的子组件；
2. Edit组件单独编写，作为Modal的子组件存在，可以保证每次Modal打开，都会重新创建一个新的Edit组件；
3. Modal不用footer，避免跟Edit组件进行额外的数据交互，Modal单纯的作为一个弹框即可；
4. Edit组件内部模拟弹框的footer样式，保持所有弹框组件底部按钮组样式统一：
    ```
    <div className="ant-modal-footer">
        <Button onClick={this.handleOk} type="primary">保存</Button>
        <Button onClick={this.handleReset}>重置</Button>
        <Button onClick={this.handleCancel}>取消</Button>
    </div>
    ```
    
代码如下（FormElement是封装过的组件，使用原生Antd的Form组件类似）


需要弹框的页面：
```jsx
import React, {Component} from 'react';
import {Button} from 'antd';
import EditModal from './Edit';
import config from '@/commons/config-hoc';

@config({
    path: '/test-modal'
})
export default class index extends Component {
    state = {
        visible: false,
        idForEdit: 0,
    };

    componentDidMount() {

    }

    count = 0;

    handleModify = () => {
        this.setState({visible: true, idForEdit: ++this.count});
    };

    handleAdd = () => {
        this.setState({visible: true, idForEdit: null});
    };

    render() {
        const {
            visible,
            idForEdit,
        } = this.state;

        return (
            <div>
                <Button onClick={this.handleAdd}>添加</Button>
                <Button onClick={this.handleModify}>修改</Button>

                <EditModal
                    visible={visible}
                    idForEdit={idForEdit}
                    onOk={() => this.setState({visible: false})}
                    onCancel={() => this.setState({visible: false})}
                />
            </div>
        );
    }
}

```

弹框组件：
```jsx
import React, {Component} from 'react';
import {Form, Row, Col, Button, Spin} from 'antd';
import _ from 'lodash';
import {FormElement} from '@/library/antd';
import PageContent from '@/layouts/page-content';
import config from '@/commons/config-hoc';
import validator from '@/library/utils/validation-rule';
import modal from '@/components/modal-hoc';

@config({ajax: true})
@Form.create()
@modal(props => props.id === null ? '添加用户' : '修改用户')
export default class EditModal extends Component {
    state = {
        loading: false,
        data: {}, // 表单回显数据
    };

    componentDidMount() {
        const {id} = this.props;

        const isEdit = id !== null;

        if (isEdit) {
            this.setState({loading: true});
            this.props.ajax.get(`/xxx/${id}`)
                .then(res => {
                    this.setState({data: res || {}});
                })
                .finally(() => this.setState({loading: false}));
        }
    }


    handleOk = () => {
        if (this.state.loading) return; // 防止重复提交

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) return;

            const {id} = this.props;
            const isEdit = id !== null;

            if (isEdit) {
                this.setState({loading: true});
                this.props.ajax.put('/xxx', values, {successTip: '修改成功！'})
                    .then(() => {
                        const {onOk} = this.props;
                        onOk && onOk();
                    })
                    .finally(() => this.setState({loading: false}));
            } else {
                this.props.ajax.post('/xxx', values, {successTip: '添加成功！'})
                    .then(() => {
                        const {onOk} = this.props;
                        onOk && onOk();
                    })
                    .finally(() => this.setState({loading: false}));
            }
        });
    };


    // 节流校验写法
    userNameExist = _.debounce((rule, value, callback) => {
        console.log('节流发请求');
    }, 500);

    handleCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel();
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    // 这样可以保证每次render时，FormElement不是每次都创建，这里可以进行一些共用属性的设置
    FormElement = (props) => <FormElement form={this.props.form} labelWidth={100} disabled={this.props.isDetail} {...props}/>;

    render() {
        const {id} = this.props;
        const isEdit = id !== null;
        const {loading, data} = this.state;

        const FormElement = this.FormElement;
        return (
            <Spin spinning={loading}>
                <PageContent footer={false}>
                    <Form onSubmit={this.handleSubmit}>
                        {isEdit ? <FormElement type="hidden" field="id" initialValue={data.id}/> : null}
                        <Row>
                            <Col span={24}>
                                <FormElement
                                    label="名称"
                                    field="name"
                                    initialValue={data.name}
                                    required
                                    rules={[
                                        validator.noSpace(),
                                        validator.userNameExist(),
                                        {validator: this.userNameExist}
                                    ]}
                                />
                            </Col>
                        </Row>
                    </Form>
                </PageContent>
                <div className="ant-modal-footer">
                    <Button onClick={this.handleOk} type="primary">保存</Button>
                    <Button onClick={this.handleReset}>重置</Button>
                    <Button onClick={this.handleCancel}>取消</Button>
                </div>
            </Spin>
        );
    }
}
```