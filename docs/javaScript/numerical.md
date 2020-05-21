# 数值转换

- 在js当中，有三个函数可以将非数值的变量转换成数值,这三个数值对于同样的输入会返回不同的结果。
    - Number()
    - parseInt()
    - parseFloat()

- Number()函数可以用于任何数据类型，另两个函数专门用于把字符串转换成数值


## Number()的转换规则

- Boolean

```
Number(true);
//  1

Number(false);
//  0
```

- Number：只是简单的传入和返回
```
Number(123);
//  123
```

- null
```
Number(null);
//  0
```
- undefined
```
Number(undefined);
//  NaN
```

- String
    - 字符串中只包含数字（若首位含有0，则0被省略）
    ```
    Number("123456");
    //  123456
    Number("011111");
    //  11111
    ```
    - 字符串包含有效的浮点格式
    ```
    Number("1.1");
    //  1.1
    ```
    -   如果字符串中包含有效的十六进制格式，则将其转换为相同大小的十进制整数值
    - 空字符串
    ```
    Number("")
    //  0
    ```
    - 如果字符串中包含除上述之外的其他字符
    ```
    Number("abc123");
    //  NaN
    ```
    
- 如果是对象，则先调用对象的valueOf()方法，然后依照前面的值转换，如转换后的结果是NaN，则再调用对象的toString()方法再次进行比较。


## parseInt()

- 会忽略字符串前面的空格，直至找到第一个非空字符
- 如果一个字符不是数字符号或者是负号
    ```
    parseInt("BLUE");
    //  NaN
    ```
- 如果第一个字符是数字字符，parseInt()会继续解析第二个字符，直到遇到非数字字符，停止转换
    ```
    parseInt("123blue");
    //  123
    parseInt("1.2");
    //  1
    ```
    
## parseFloat()
- 会忽略字符串前面的空格，直至遇见一个无效的浮点数字字符未知，也就是说，字符串中的一个小数点是有效的，第二个小数点是无效的，因此第二个小数点后的字符就将被忽略

```
parseFloat("  1.2");
//  1.2
parseFloat("1.2.2");
//  1.2
parseFloat("1.2abbbb");
//  1.2
```


## 总结
- 对于数值转换，由于他们的转换规则不同，Number和parseInt对于相同的值，可能会得出不同的结果

```
Number(null);
//  0
parseInt(null);
//  NaN

Number("");
//  0
parseInt("");
//  NaN

Number("123blue");
//  NaN
parseInt("123blue");
//  123

Number("123.123.123");
//  NaN
parseInt("123.123.123");
//  123.123
```





