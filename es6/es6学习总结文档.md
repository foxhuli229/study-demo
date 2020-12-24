# es6学习总结文档

## let

1. 变量不能重复声明。
2. 作用域分为：块级、全局、函数、eval（只能用于严格模式下的）
3. 不存在变量提升
4. 不影响作用域链

练习：

## const常量

1. 声明常量规则
   - 声明常量时一定要付初始值
   - 一般常量采用大写方式
   - 常量的值不能进行修改
   - 块级作用域
   - 对于数组和对象的元素修改，不算对常量的修改，不会报错

## 模板字符串

​	``

1. 声明
2. 内容中直接出现换行符和单引号、双引号。
3. 变量拼接

## 简化对象写法

*es6允许在大括号里面，直接写入 变量和函数。作为对象的属性和方法*

```js
 let name = "尚硅谷"
 let change = function() {
     console.log("我们可以改变你！");
 }

 const school = {
     name,
     change,
     improves() {
         console.log("我在学习ES6");
     }
 }

 console.log(school);
```

结果：

![image-20200817235310122](C:\Users\86252\AppData\Roaming\Typora\typora-user-images\image-20200817235310122.png)



## 箭头函数

![image-20200818000118338](C:\Users\86252\AppData\Roaming\Typora\typora-user-images\image-20200818000118338.png)