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