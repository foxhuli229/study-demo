# [sass](https://www.sass.hk/)
学习地址：https://www.bilibili.com/video/av52065062?p=2

## 将scss文件编辑成 css文件
### 1、将scss文件编辑成 css文件命令
```javascript
  sass 文件名.scss 编辑后的文件名.css

  例如: sass main.scss main.css
```

### 2、监视scss文件是否发现变化，变化后，自动更新成 对应的css文件（更新单个）
```javascript
  sass --wacth 文件名.scss:编辑后的文件名.css

  例如: sass --wacth main.scss:main.css
```
### 3、监视scss文件是否发现变化，变化后，自动更新成 对应的css文件（更新多个，并且存放在对应的文件夹）
```javascript
  sass --wacth scss:文件目录/css

  例如: sass --wacth scss:dist/css
```
### 4. 只需部分sass文件编译成css
>当通过 ` @import` 把 `sass` 样式分散到多个文件时，你通常只想生成少数几个 `css`文件。那些专门为 `@import` 命令而编写的 `sass` 文件，并不需要生成对应的独立 `css` 文件，这样的 `sass` 文件称为局部文件。<br>
对此，`sass` 有一个特殊的约定来命名这些文件。此约定即，`sass` 局部文件的文件名以下划线开头。这样，`sass` 就不会在编译时单独编译这个文件输出 `css`，而只把这个文件用作导入。当你`@import`一个局部文件时，还可以不写文件的全名，即省略文件名开头的下划线。举例来说，你想导入 **`themes/_night-sky.scss`** 这个局部文件里的变量，你只需在样式表中写 **`@import "themes/night-sky"`;**。

### 5. 默认变量值
使用 `sass` 的 `!default` 标签可以实现这个目的。它很像  `css` 属性中 `!important` 标签的对立面，不同的是 `!default` 用于变量，含义是：如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值。
例：
```javascript
  $fancybox-width: 400px !default;
  .fancybox {
  width: $fancybox-width;
  }
```




## 语法
### 1. & 父选择器
 &：代表 父选择器
 例如：
 ```javascript
    body {
        padding: 0;
        margin: 0;
    }
    body::after {
        color: red;
    }

    等价于
    body {
        padding: 0;
        margin: 0;

        &::after {
            color: red;
        }
    }
 ```
