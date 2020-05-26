# vue权威指南

[TOC]

## vue操作dom元素

在需要获取dom元素上 使用 `ref`，然后通过 `$refs`来获取dom元素

```vue
<h1 ref="h1" @click.prevent="handClick">获取dom元素</h1>
```

```js
methods: {
    handClick() {
    console.log( this.$refs.h1);
	this.$refs.h1.style.backgroundColor = "red"
    }
 }
```

结果：

![vue获取dom元素](/images/vue/vue获取dom元素.png)

## 路由守卫

### router.beforeEach()

路由一发生改变，就会触发该钩子函数

```js
router.beforeEach((to, from, next) => {
	//to: 进入的下一个页面
	//from： 上一个页面
	//next: 必须调用，才会执行
    next(); //参数为空，默认 进入 to
})
```

通常用于路由拦截，判断用户是否登录

```js
//常见的路由拦截
const whiterRuter = ['/login']; //设置白名单，判断数组中是否存在指定的某个对象，如果不存在，则返回 -1

//路由守卫
router.beforeEach((to, from, next) => {
	if(getToken()) {
		//获取token，
		console.log("存在");
	}else {
		if(whiterRuter.indexof(to.path) !== -1) {
			//属于白名单的路由，不进行拦截
			next();
		}else {
			next("/login");
		}
	}
})

/**
* 1、直接进入index（首页）的时候，参数to被改变了 “/index”，触发路由指向，就会执行 beforeEach()
* 2、再一次next 指向了 login，再次发生路由指向，再跑 beforeEach，参数to就会变成 "/login"
* 3、白名单判断是否存在，存在则直接执行 next(),因为没有参数，所以不会被再次 beforeEach()
*
*/
```



### vue中异步加载

> 参考文档：https://www.cnblogs.com/wenqiangit/p/10421786.html

异步加载方式具有2种，各自有各自的优缺点

方法一：

```js
// 1、Vue异步组件技术：
{
  path: '/home',
  name: 'Home',
  component: resolve => reqire(['../views/Home.vue'], resolve)
}
//当你用require这种方式引入的时候，会将你的component分别打包成不同的js，加载的时候也是按需加载，只用访问这个路由网址时才会加载这个js。
```

方法二：

```js
//如果用import引入的话，当项目打包时路由里的所有component都会打包在一个js中，造成进入首页时，需要加载的内容过多，时间相对比较长。
// 2、es6提案的import()
{
  path: '/',
  name: 'home',
  component: () => import('../views/Home.vue')
}
```



### 解决组件嵌套，请求方法多次被调用bug

> 参考文章：https://blog.csdn.net/qq_36946274/article/details/104041433

给组件加上一个 :key值，这样可以解决组件重复渲染 导致请求重复调用的bug

```vue
 <keep-alive>
         <component :is="currentComponent" :key="agencyid"></component>
 </keep-alive>
```



### url地址参数，应该在created还是**mounted**中获取

> 参考文档：https://www.jb51.net/article/167557.htm

| 生命周期     | 是否获取dom节点 | 是否可以获取data | 是否获取methods |
| :----------- | :-------------- | :--------------- | :-------------- |
| beforeCreate | 否              | 否               | 否              |
| created      | 否              | 是               | 是              |
| beforeMount  | 否              | 是               | 是              |
| mounted      | 是              | 是               | 是              |



## 第一章 遇见vue.js

### MVC

model(模型)、controller（控制器）、view（视图）

### MVP

controller/presenter负责逻辑的处理，model提供数据，view负责显示

### MVVM

controller、viewmodel、view



## 第二章  数据绑定

### 2.1 语法

#### 2.1.1 插值

vue中，采用 双括号 {{}}方式，会被对应的数据对象属性的值所代替。

例如：

```vue
<div id="app">
	<p>{{msg}}</p>
</div>
<script>
	new Vue({
        el: "#app",
        data: {
            msg: 'hello world'
        }
    })
</script>
//结果
hello world
```

- v-once： 实现某个元素只需要渲染一次的效果。
- v-html： 将带有HTML格式的数据，作为HTML渲染在页面。
- v-text：将带有HTML格式的数据，作为普通字符输出，不会编译HTML代码

#### 2.2 表达式

vue中 {{}} 支持表达式