# CSS重构：样式表性能调优

## 第二章 级联

### 样式表优先级

样式表优先级：style > id > class > 属性选择器（ a[href="segmentfault.com"]{}） > 伪类选择器（如 :hover{}） > 伪元素选择器， 如 ::before{} >  标签选择器， 如 span{}   > 通配选择器， 如 *{}

**优先级关系：内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器**

**选择器是从右到左的匹配，选择器最右边的部分叫做关键选择器**

注意：！important 不能添加到行内样式style属性中（例如：<a herf="/" style="color: #fff !important ;"/>）这种写法是错误写法！！



## 第三章 编写更优质的CSS

### 用浏览器引擎前缀组织属性

- Chrome（Blink）、safari（webkit）浏览器 ： -webkit-
- firefox（Gecko）：-moz-
- IE(Trident)：-ms-

> 浏览器按照从上到下的顺序应用声明块的属性



### 盒子模型 box-sizing

**content-box**

width = content (横向相关)

![content-box](https://img-blog.csdn.net/20180817173647734?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI3MDY0NTU5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)



**border-box**

width = content+padding+border (横向相关)

![border-box](https://img-blog.csdn.net/20180817173700740?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI3MDY0NTU5/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

常用下语句规范整个页面的盒子

```css
*{box-sizing:border-box;}
```