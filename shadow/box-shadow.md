# box-shadow效果

> [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) `box-shadow` 属性用于在元素的框架上添加阴影效果。可以在同一个元素上设置多个阴影效果，并用逗号将他们分隔开。该属性可设置的值包括阴影的X轴偏移量、Y轴偏移量、模糊半径、扩散半径和颜色。

## 语法

```css
/* x偏移量 | y偏移量 | 阴影颜色 */
box-shadow: 60px -16px teal;

/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色 */
box-shadow: 10px 5px 5px black;

/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

/* 插页(阴影向内) | x偏移量 | y偏移量 | 阴影颜色 */
box-shadow: inset 5em 1em gold;

/* 任意数量的阴影，以逗号分隔 */
box-shadow: 3px 3px red, -1em 0 0.4em olive;

/* 全局关键字 */
box-shadow: inherit;
box-shadow: initial;
box-shadow: unset;
```

指定单个 box-shadow 的用法：

- 给出两个、三个或四个数字值的情况。
  - 如果只给出两个值, 这两个值将被浏览器解释为x轴上的偏移量 和y轴上的偏移量 。
  - 如果给出了第三个值, 这第三个值将被解释为模糊半径的大小。
  - 如果给出了第四个值, 这第四个值将被解释为扩展半径的大小 。
- 可选， 插页(阴影向内) `inset`。
- 可选， 颜色值 `<color>`。

声明多个shadows时， 用逗号将shadows隔开。

## 取值

### inset

**如果没有指定`inset`，默认阴影在边框外，即阴影向外扩散。**
使用 `inset` 关键字会使得阴影落在盒子内部，这样看起来就像是内容被压低了。 此时阴影会在边框之内 (即使是透明边框）、背景之上、内容之下。

### `<offset-x> <offset-y>`

这是头两个 [`<length>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length) 值，用来设置阴影偏移量。

 `<offset-x>` 设置水平偏移量，正值阴影则位于元素右边，负值阴影则位于元素左边。可用单位请查看 [`<length>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length) 。

 `<offset-y>` 设置垂直偏移量，正值阴影则位于元素下方，负值阴影则位于元素上方。可用单位请查看 [`<length>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length) 。

如果两者都是0，那么阴影位于元素后面。这时如果设置了`<blur-radius>` 或`<spread-radius>` 则有模糊效果。

### `blur-radius>`

这是第三个 [`<length>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length) 值。值越大，模糊面积越大，阴影就越大越淡， **不能为负值**。默认为0，此时阴影边缘锐利。

### `<spread-radius>`

这是第四个 [`<length>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length) 值。取正值时，阴影扩大；取负值时，阴影收缩。默认为0，此时阴影与元素同样大。

### `<color>`

相关事项查看 [`<length>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value) 。如果没有指定，则由浏览器决定——通常是[`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color)的值，不过目前Safari取透明。

## 案例说明

![box-shoadw](https://mmbiz.qpic.cn/mmbiz_png/tvYGR7SdzMXR0avzCP3MDMbc5nWOCVliaxKfibCG1vs5Ope24mHrmTYNH4tsUic4ibNdOiaBNSETnWIpOOVHze5ahQQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

![box-shaow内阴影](https://mmbiz.qpic.cn/mmbiz_png/tvYGR7SdzMXR0avzCP3MDMbc5nWOCVlia3QQgmJkQwfl9lTiaSNromTiaZu3ibRCqgQCSUogodpiab0mgQVciaIFYIKA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

![box-shaodw](E:\workspace\study-demo\images\css\box-shaodw.png)

代码：

```css
div {
    width: 150px;
    height: 150px;
    background-color: #fff;
    box-shadow: 120px 80px 40px 20px #0ff;
    /* 顺序为: offset-x, offset-y, blur-size, spread-size, color */
    /* blur-size 和 spread-size 是可选的 (默认为 0) */
}
```

![订单](https://mmbiz.qpic.cn/mmbiz_png/tvYGR7SdzMXR0avzCP3MDMbc5nWOCVliaRatyTp1mP8IhXQRcUJ5oeslFndJXphmPGoOfduibD3NYnImIoeX5UaA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 常用的效果

```css
.box {
            width: 200px;
            height: 200px;
            margin: 40px auto;
            box-sizing: border-box;
            border: 2px solid;
        }
```

### 1、右偏移

```css
  .box1 {
            /* x偏移量, y偏移量， color */
            box-shadow: 60px 16px teal;
        }
```

![订单](E:\workspace\study-demo\images\css\右偏移.png)

### 2、左阴影

````css
.box2 {
    /* x偏移量,y偏移量 , 阴影模糊直径, color */
    box-shadow: -10px 5px 10px black;
}
````

![](E:\workspace\study-demo\images\css\左偏移.png)

### 3、内阴影

```css
  .box4 {
    /* inset：内阴影， x偏移量,y偏移量 , 阴影模糊半径, color  */
    box-shadow: inset 10px 5px 10px rgba(0, 0, 0, 0.2);
    }
```

![](E:\workspace\study-demo\images\css\内阴影.png)

### 4、上内阴影

```css
box-shadow: inset 0px 0px 5px 1px #cccccc;
```

![](E:\workspace\study-demo\images\css\上内阴影.png)

### 5、更多效果请查看

[CSS3 box-shadow 效果大全](https://mp.weixin.qq.com/s?__biz=MzUxMjc3ODc0OQ==&mid=2247483986&idx=1&sn=a997628a2919c436ae8c4035abd235a4&chksm=f95e0ac0ce2983d6cef930eec4c58f5b24c5c1446831902b5151fbdfb01ddf4a8c53f7fd739f&mpshare=1&scene=1&srcid=&sharer_sharetime=1576582044060&sharer_shareid=d917bfceeca8b8479cb5bdb1daf80ef7#rd)



## 参考文献

[ [合格前端]-CSS3 box-shadow 效果大全](https://mp.weixin.qq.com/s?__biz=MzUxMjc3ODc0OQ==&mid=2247483986&idx=1&sn=a997628a2919c436ae8c4035abd235a4&chksm=f95e0ac0ce2983d6cef930eec4c58f5b24c5c1446831902b5151fbdfb01ddf4a8c53f7fd739f&mpshare=1&scene=1&srcid=&sharer_sharetime=1576582044060&sharer_shareid=d917bfceeca8b8479cb5bdb1daf80ef7#rd)

