# React中关于使用key的意义和要点

## 使用key的意义
我们知道React使得我们并不需要关心更改的内容，```开发者只需要将精力集中于数据的变化，React会负责前后UI更新。```

这时候React就面临一个问题，```如何对比当前render函数生成的元素树与之前的元素树，从而找到最优的方法```(或者说是步骤最少的方法)将一颗树转化成另一棵树，从而去更新真实的DOM元素。

此时开发人员可以通过 key 来暗示，哪些子元素可以在不同的渲染中保持稳定，决定是销毁重新创建组件还是更新组件。```正是key的应用，使得React的渲染效率大大提升。```

## React生成树的过程

- React使用render方法生成元素树 
    - 不同节点
        ```
        // 旧Virtual DOM
        <span>
            <TodoItem/>
            <TodoItem/>
        <span/> 
        
        // 新Virtual DOM
        <div>
            <TodoItem />
            <TodoItem />
        <div /> 
        ```
        对比结果：作为根节点的div与span类型不同。则DOM树中span内的所有节点都会被卸载，重建。这种情况浪费巨大，要注意避免。
    - 相同节点
        ```
        // 旧Virtual DOM
        <div>
            <TodoItem  text="1"/>
        <div /> 
        
        // 新Virtual DOM
        <div>
            <TodoItem text="2"/>
        <div /> 
        ```
        对比结果：DOM树中的```<TodoItem />```不被卸载，只是属性值由"1"变为"2"
        
    - 节点后插
        ```
        // 旧Virtual DOM
        <div>
            <TodoItem  text="1"/>
            <TodoItem  text="2"/>
        <div />

        // 新Virtual DOM
        <div>
            <TodoItem  text="1"/>
            <TodoItem  text="2"/>
            <TodoItem  text="3"/>
        <div />

        ```
        对比结果：```<TodoItem text="3"/>```会被装载，其余DOM树中的节点不变。
        
        
## React使用key的注意点

- key不是给开发者使用的，只能由React自己内部进行获取。所以当进行开发时，```key不可以作为自定义属性名称```，否则会出现获取不到的问题。
- 当使用index作为key使，某种情况下可能会出现坑。例如，对组件进行添加，删除，修改操作等。所以```当需要写key作为唯一标识的时候并且涉及到涉及到数组的动态变更，大家要合理地去考虑是否使用index作为key进行循环渲染```
