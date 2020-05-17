[TOC]

# [let 和 const 命令](http://es6.ruanyifeng.com/#docs/let)
## 1. let
在esc6中，块作用域必须要引用 大括号，JavaScript 引擎就认为不存在块级作用域。

## 2. globalThis对象

# [变量的解构赋值](http://es6.ruanyifeng.com/#docs/destructuring)

## 1.数组的解构赋值
以前，为变量赋值，只能直接指定值

    let a=0;
    let b=1;
ESC6允许写成下面这样

    let[a, b, c] = [1, 3, 4]
    let [foo, [[bar], baz]] = [1, [[2], 3]];
    foo // 1
    bar // 2
    baz // 3

    let [ , , third] = ["foo", "bar", "baz"];
    third // "baz"

    let [x, , y] = [1, 2, 3];
    x // 1
    y // 3

    let [head, ...tail] = [1, 2, 3, 4];
    head // 1
    tail // [2, 3, 4]

    let [x, y, ...z] = ['a'];
    x // "a"
    y // undefined
    z // []

    
如果解构不成功，变量的值就等于undefined。

对于Set结构，也可以使用数组的解构赋值

    let [x, y, z] = new Set(['a', 'b', 'c'])

事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。


### <b>默认值</b>
注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
```javascript
    let [x = 1, y = x] = [];     
    // x=1; y=1
    let [x = 1, y = x] = [2];    
    // x=2; y=2
    let [x = 1, y = x] = [1, 2]; 
    // x=1; y=2
    let [x = y, y = 1] = [];     
    // ReferenceError: y is not defined
```
上面最后一个表达式之所以会报错，是因为x用y做默认值时，y还没有声明。

---
## 2.对象的解构赋值
### <b>注意点</b>
```javascript
// 正确的写法
let x;
({x} = {x: 1});
```
上面代码将整个解构赋值语句，放在一个圆括号里面，就可以正确执行。关于圆括号与解构赋值的关系，参见下文。
## 7.用途
### <b>(4)提取JSON数据</b>
解构赋值对提取 JSON 对象中的数据，尤其有用.
```javascript
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```
上面代码可以快速提取 JSON 数据的值。


# [字符串的扩展](http://es6.ruanyifeng.com/#docs/string)
## 1.字符的 Unicode 表示法 
JavaScript 共有 6 种方法可以表示一个字符。
```javascript
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```