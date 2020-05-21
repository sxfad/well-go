# == 隐式类型转换
非严格匹配: 会产生类型转换，但是有前提条件，一共有六种情况(示例以x == y说明)

## x和y都是null或undefined
规则: 没有隐式类型转换，无条件返回true。
```js
console.log (null == undefined); // true
console.log (null == null); // true
console.log (undefined == undefined); // true
```

## x或y 有一方是null或undefined
规则: 没有隐式类型转换，无条件返回false。
```js
console.log (null == []); // false
console.log (null == 123); // false
console.log (undefined == ''); // false
console.log (undefined == {a: 123}); // false
```

## x或y是NaN  NaN与任何值都不相等
规则：没有隐式类型转换，无条件返回false。
```js
console.log (NaN == NaN); // false
```

## x和y都是string，boolean，number
规则：有隐式类型转换，无论是boolean类型还是string类型，都会调用Number()方法统一转换成number类型在进行比较。

**Example**
```
console.log(1 == true); // true 
(1) 1 == Number(true)
```
```
console.log(1 == "true"); // false
(1) 1 == Number('true')
(2) 1 == NaN
```
```
console.log(1 == !"true"); // false
(1) !运算符会将变量转换为Boolean类型
(2) 1 == !Boolean('true')
(3) 1 == false
(4) 1 == Number(false)
(5) 1 == 0 
```
```
console.log(true == 'true') // false
(1) Number(true) == Number('true')
(2) 1 == NaN
```

## x或y 有一方是复杂数据类型
规则：有隐式类型转换，会先获取复杂数据类型的原始值之后再做比较。

获取原始值：先调用valueOf()，在调用toString()方法。

**Example**
```js
// 需要注意的特殊点
console.log([].valueOf().toString()); // 空字符串
console.log({}.valueOf().toString()); // [object Object]
console.log({} == '[object Object]'); // true
```
```
console.log([1,2,3] == '1,2,3'); // true
(1) [1,2,3].valueOf().toString() == '1,2,3';
(2) '1,2,3' == '1,2,3'
```
```
console.log([] == true); // false
(1) [].valueOf().toString() == Boolean(true)
(2) Number('') == Number(true)
(3) 0 == 1
```
```
console.log([1] == 1); // true
(1) [1].valueOf().toString() == 1；
(2) '1' == 1;
(3) Number('1') == 1;
```

## x和y都是复杂数据类型
规则：只比较地址，如果地址一致则返回true，否则返回false。
```js
const arr1 = [10,20,30];
const arr2 = [10,20,30];
const arr3 = arr1; // 将arr1的地址拷贝给arr3

console.log (arr1 == arr2); // 虽然arr1与arr2中的数据是一样，但是它们两个不同的地址
console.log (arr3 == arr1); // true 两者地址是一样

console.log([] == []); // false
console.log({} == {}); // false
```

## 转换中可能遇到的特殊情况
转换为布尔值时的假值有：undefined、null、空字符串、0、-0、NaN，其余例如{}、[]都是真值。

**Example**
```
console.log([] == ![]) // true
(1) [] == !Boolean([])
(2) [] == false
(3) [].valueOf().toString() == Number(Boolean(false))
(4) '' == 0
(5) Number('') == 0
(6) 0 == 0
```
```
console.log({} == !{}) // false
(1) {} == !Boolean({})
(2) {} == false
(3) {}.valueOf().toString() == Number(Boolean(false))
(4) [object Object] == 0;
(5) Number([object Object]) == 0
(6) NaN == 0
```
```js
// 数组元素为null或undefined时，该元素被当做空字符串处理
[null] == false // true
[undefined] == false // true
```
