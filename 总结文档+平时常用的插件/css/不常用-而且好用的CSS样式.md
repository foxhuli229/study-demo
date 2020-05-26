# 不常用-而且好用的CSS样式

[TOC]

## 	前言

> 给大家推荐一个公众号：CSS特效世界。 里面有很多分享的CSS视频。PS：主要是 前端小智分享出来的链接，手把手教你5分钟实现一个动画效果。牛吧！牛就加上学习。

## [object-fit  属性](https://blog.csdn.net/qq_39364032/article/details/82287528)

> mdn：https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit
>
> 参考文档：https://blog.csdn.net/qq_39364032/article/details/82287528

**`object-fit`** [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 属性指定[可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)的内容应该如何适应到其使用的高度和宽度确定的框。

**取值**

- `contain`

  被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。 整个对象在填充盒子的同时保留其长宽比，因此如果宽高比与框的宽高比不匹配，该对象将被添加“[黑边](https://zh.wikipedia.org/wiki/黑邊)”。

- `cover`

  被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框。

- `fill`

  被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。

- `none`

  被替换的内容将保持其原有的尺寸。

- `scale-down`

  内容的尺寸与 `none` 或 `contain` 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。

###  

## background-attachment

**`background-attachment`** [CSS](https://developer.mozilla.org/en-US/docs/CSS) 属性决定背景图像的位置是在[视口](https://developer.mozilla.org/en-US/docs/Glossary/视口)内固定，或者随着包含它的区块滚动

**语法**

```css
/* 关键 属性值 */
background-attachment: scroll;
background-attachment: fixed;
background-attachment: local;

/* 全局 属性值 */
background-attachment: inherit;
background-attachment: initial;
background-attachment: unset;
```

**取值**

*<u>fixed</u>*

此关键属性值表示背景相对于视口固定。即使一个元素拥有滚动机制，背景也不会随着元素的内容滚动。

*local*

此关键属性值表示背景相对于元素的内容固定。如果一个元素拥有滚动机制，背景将会随着元素的内容滚动， 并且背景的绘制区域和定位区域是相对于可滚动的区域而不是包含他们的边框。

*<u>scroll</u>*

此关键属性值表示背景相对于元素本身固定， 而不是随着它的内容滚动（对元素边框是有效的）。

**效果**

![](E:\workspace\study-demo\images\css\background-attachment.png)

**具体效果请查看：[background-attachment](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-attachment)**



##  **background-clip**

`background-clip` 设置元素的背景（背景图片或颜色）是否延伸到边框、内边距盒子、内容盒子下面。

**语法**

```css
/* Keyword values */
background-clip: border-box;
background-clip: padding-box;
background-clip: content-box;
background-clip: text;

/* Global values */
background-clip: inherit;
background-clip: initial;
background-clip: unset;
```

**值***

- `border-box`

  背景延伸至边框外沿（但是在边框下层）。

- `padding-box`

  背景延伸至内边距（[`padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding)）外沿。不会绘制到边框处。

- `content-box`

  背景被裁剪至内容区（content box）外沿。

- `text` 

  <u>背景被裁剪成文字的前景色。</u>

![](E:\workspace\study-demo\images\css\background-clip.png)

**更多详情请查看：[background-clip](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)**



## background-position

**`background-position`** 为每一个背景图片设置初始位置。 这个位置是相对于由 [`background-origin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-origin) 定义的位置图层的。

**语法**

```css
/* Keyword values */
background-position: top;
background-position: bottom;
background-position: left;
background-position: right;
background-position: center;

/* <percentage> values */
background-position: 25% 75%;

/* <length> values */
background-position: 0 0;
background-position: 1cm 2cm;
background-position: 10ch 8em;

/* Multiple images */
background-position: 0 0, center;

/* Edge offsets values */
background-position: bottom 10px right 20px;
background-position: right 3em bottom 10px;
background-position: bottom 10px right;
background-position: top right 10px;

/* Global values */
background-position: inherit;
background-position: initial;
background-position: unset; 
```

![](E:\workspace\study-demo\images\css\background-position.png)

**更多详情请查看：[background-position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position)**

## **background-repeat**

**`background-repeat`** [CSS](https://developer.mozilla.org/en-US/docs/CSS) 属性定义背景图像的重复方式。背景图像可以沿着水平轴，垂直轴，两个轴重复，或者根本不重复。

**语法**

```css
/* 单值语法 */
background-repeat: repeat-x;
background-repeat: repeat-y;
background-repeat: repeat;
background-repeat: space;
background-repeat: round;
background-repeat: no-repeat;

/* 双值语法: 水平horizontal | 垂直vertical */
background-repeat: repeat space;
background-repeat: repeat repeat;
background-repeat: round space;
background-repeat: no-repeat round;

background-repeat: inherit;
```

**值**

| **单值**    | **等价于双值**        |
| ----------- | --------------------- |
| `repeat-x`  | `repeat no-repeat`    |
| `repeat-y`  | `no-repeat repeat`    |
| `repeat`    | `repeat repeat`       |
| `space`     | `space space`         |
| `round`     | `round round`         |
| `no-repeat` | `no-repeat no-repeat` |

| `repeat`    | 图像会按需重复来覆盖整个背景图片所在的区域. 最后一个图像会被裁剪, 如果它的大小不合适的话. |
| ----------- | ------------------------------------------------------------ |
| `space`     | 图像会尽可能得重复, 但是不会裁剪. 第一个和最后一个图像会被固定在元素(element)的相应的边上, 同时空白会均匀地分布在图像之间. [`background-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position)属性会被忽视, 除非只有一个图像能被无裁剪地显示. 只在一种情况下裁剪会发生, 那就是图像太大了以至于没有足够的空间来完整显示一个图像. |
| `round`     | 随着允许的空间在尺寸上的增长, 被重复的图像将会伸展(没有空隙), 直到有足够的空间来添加一个图像. 当下一个图像被添加后, 所有的当前的图像会被压缩来腾出空间. 例如, 一个图像原始大小是260px, 重复三次之后, 可能会被伸展到300px, 直到另一个图像被加进来. 这样他们就可能被压缩到225px.译者注: 关键是浏览器怎么计算什么时候应该添加一个图像进来, 而不是继续伸展. |
| `no-repeat` | 图像不会被重复(因为背景图像所在的区域将可能没有完全被覆盖). 那个没有被重复的背景图像的位置是由[`background-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position)属性来决定. |

![](E:\workspace\study-demo\images\css\background-repeat.png)

**更多详情请查看：[background-repeat](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-repeat)**



## **border-image-source**

[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) 属性 **`border-image-source`** 用于声明元素的[边框图片（border-image）](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image)的资源 

![ **border-image-source**](E:\workspace\study-demo\images\css\border-image-source.png)