# 常用逻辑运算符
空字符串 0 -0 false NaN null undefined 等7个返回false，其余的都返回true

**Example**
```js
const obj = {
    a: {
        b: ''
    }
};
```

## 链判断运算符 ?.
```js
// b 为 '' 0 false NaN null undefined 等假值时都不会走if
if(obj?.a?.b) {
    console.log(1111);
}
```
```js
const res = obj?.a?.b || 'default'; // default
```
```js
// 判读数组长度时
const obj = {
    a: {
        b: [1, 2, 3]
    }
};

obj?.a?.b?.length && obj.a.b.forEach(item => {
    console.log(item)
});
```

## Null传导运算符 ??
**?? 可以和 || 区分理解。**

**当我们不想让 0 空字符串、false、NaN 被当作假值时，可以选择 ?? 运算符。**
```js
// 只有当 b 为 null 或 undefined时，表达式才会返回default
const res = obj?.a?.b ?? 'default';

// b 为 '' 0 false NaN null undefined 等假值时，表达式才会返回default
const res = obj?.a?.b || 'default';
```

## 三元运算符
```js
// b 为 '' 0 false NaN null undefined 等假值时，表达式会返回 '为假'
const res = obj?.a?.b ? '为真' : '为假';
```

## 与运算符 &&
不管有多少个&&，

如果元素有真有假，则返回第一个属性值为假的元素。

如果所有元素都为真，则返回最后一个元素。

如果所有元素都为假，则返回第一个元素。
```js
const res = 1 && null && undefined; // null 有真有假 返回第一个属性值为假的元素

const res = 1 && 2 && 3; // 3 所有元素都为真，则返回最后一个元素

const res = 0 && null && undefined; // 0 所有元素都为假，则返回第一个元素
```

## 或运算符 ||
不管有多少个||，

如果元素有真有假，则返回第一个属性值为真的元素。

如果所有元素都为真，则返回第一个元素。

如果所有元素都为假，则返回最后一个元素。
```js
const res = '' || 1 || false; // 1 有真有假，返回第一个属性值为真的元素

const res = 1 || 2 || 3; // 1 所有元素都为真，则返回第一个元素

const res = '' || 0 || null; // null 所有元素都为假，则返回最后一个元素。 
```
