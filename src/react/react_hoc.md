# react高阶组件Hoc(Higher-order component)

## 定义
- Hoc其实是一个函数，接收一个组件作为参数，返回一个包装组件作为返回值。
- 适用范围广，它不需要es6或者其它需要编译的特性，有函数的地方，就有Hoc。
- 代码复用，代码模块化。

## 为什么需要用到react高阶组件？
在React开发过程中，很多情况下，组件需要被“增强”，比如给组件添加或修改一些特定的属性，针对多个组件的代码复用。

## 补充说明装饰器
在下面很多案例中用到了装饰器(@)，修饰器（Decorator）是一个函数，用来**修改类的行为**。

更多用法可参考简书一篇文章：https://www.jianshu.com/p/275bf41f45cf

## 实际应用

### 操作props
可以对原组件的props进行增删改查，需要考虑到不能破坏原组件。
```js
// 添加新的props
function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    render() {
      const newProps = {
        user: 'well-go',
      }
      return <WrappedComponent {...this.props} {...newProps}/>
    }
  }
}

@ppHOC
class Example extends React.Component {
  componentDidMount() {
    console.log(this.props.user); // well-go
  }
}
```

### 抽离state
可以通过传入props把state抽离出来，简单的实现一个react数据双向流的例子。
```js
function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    state = {
        name: ''
    };
    
    handleChangeName(e) {
      this.setState({
        name: e.target.value
      })
    }
    
    render() {
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.handleChangeName.bind(this)
        }
      }
       return <WrappedComponent {...this.props} {...newProps}/>
    }
  }
}

// 使用ppHOC装饰器之后，组件的props被添加了name属性，input会成为受控组件
@ppHOC
class Example extends React.Component {
  render() {
    // 在p标签中会显示每次input中输入的值    
    return (
        <div>
            <input name="name" {...this.props.name}/>
            <p>{this.props.name.value}</p>
        </div>
    )
  }
}
```

### 基于antd封装modal框
项目中，每次打开modal框时，每次销毁modal中数据，防止数据污染。
```js
const modalHoc = (options) => WrappedComponent => {
    const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    return class ModalComponent extends Component {
        // 用Hoc包裹的组件会丢失原先的名字，影响开发和调试，可以在WrappedComponent的名字加前缀来作为HOC的名字
        static displayName = `withModal(${componentName})`;

        render() {
            const {visible, onCancel} = this.props;

            let title;
            if (typeof options === 'string') title = options;

            if (typeof options === 'function') title = options;

            if (typeof options === 'object') title = options.title;

            if (typeof title === 'function') title = title(this.props);

            return (
                <Modal
                    destroyOnClose
                    width="60%"
                    bodyStyle={{padding: 0}}
                    footer={null}

                    {...options}
                    title={title}

                    onCancel={onCancel}
                    visible={visible}
                >
                    <WrappedComponent {...this.props}/>
                </Modal>
            );
        }
    }
};

// 使用
@modalHoc('可以传入不同类型标题')
```

### 封装统一的请求
当需要处理具有相同逻辑的需求时，例如加载很多图表，每个图表都需要发送ajax请求，如果在每个
组件中都写一遍相同的逻辑显得很冗余，可以封装成高阶组件去处理。
```js
const ajaxCommon = (options) => WrappedComponent => {
    const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    return class ajaxComponent extends Component {
        static displayName = `ajaxCommon(${componentName})`;

        state = {
            data: [],
        };

        componentDidMount() {
            const name = options || '';

            this.props.ajax.get(`/chart/${name}`)
                .then(res => {
                    this.setState({data: res || []});
                })
        }

        render() {
            return (
                <WrappedComponent {...this.props} data={this.state.data}/>
            );
        }
    }
};

// 在组件1中使用
@ajaxCommon('chart1')
export default class Home extends Component {
    componentDidMount() {
        console.log(this.props.data);
    }
}

// 在组件2中使用
@ajaxCommon('chart2')
export default class Home extends Component {
    componentDidMount() {
        console.log(this.props.data);
    }
}
```
