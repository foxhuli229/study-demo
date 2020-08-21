# study-demo
> 该项目是自己平常学习使用的demo

## 知识点总结

### CSS Grid 网格布局

```css
display: grid;
```

```css
/*css 相关代码*/
<style>
	 /* 
		 * 关键代码
		* display: grid 代表是网格布局
		* grid-template-columns: 1fr 1fr 1fr : fr代表 等比例分配页面宽度
		* 如何页面平均分配，则可以缩写 grid-template-columns: repeat(3, 1fr); 第一个参数：分割成		 * 几份，第二个参数：占页面多少比例
			grid-template-columns: repeat(3, 1fr) == grid-template-columns: 1fr 1fr 1fr
		* gap： 设置每一个 单元格的间距
		* grid-auto-rows: minmax(100px, auto): 设置每一个单元数最小高度为 100px，如果文字超过			* 100px后，则高度默认为文字的高度
		*/
        .wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr
            grid-auto-rows: minmax(100px, auto);
            /* grid-gap 被更改为 gap */
            gap: 1rem;
        }
</style>
```

```html
<style>
 .wrapper {
       display: grid;
     	/*自定义布局， 自定义名称，注意：各个直接不能使用 , */
        grid-template-areas: 
                'header header header header'
                'section section section aside'
                'box-1 box-2 box-3 box-4'
                'footer footer footer footer';
       gap: 1rem;
 }

 header {
    grid-area: header;
 }

 section {
    grid-area: section;
 }

 aside {
    grid-area: aside;
 }

 .box-1 {
     grid-area: box-1;
 }

.box-2 {
    grid-area: box-2;
}

.box-3 {
   grid-area: box-3;
}

footer {
    grid-area: footer;
}
 .wrapper div,
	header,
	section,
	footer,
	aside {
    	padding: 1rem;
    	border: 1px solid #eee;
    	text-align: center;
}
</style>
<body>
    <div class="wrapper">
        <header>我是头部</header>
        <section>我是简介</section>
        <aside>我是侧边栏</aside>
        <div class="box-1">.box-1</div>
        <div class="box-2">.box-2</div>
        <div class="box-3">.box-3</div>
        <div class="box-4">.box-4</div>
        <footer>我是尾部</footer>
    </div>
</body
```

效果图

![image-20200701145920235](https://cdn.jsdelivr.net/gh/foxhuli229/blog-imgs/images/image-20200701145920235.png)