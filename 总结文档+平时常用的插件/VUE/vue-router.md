##vue-router

### [缓存](https://router.vuejs.org/zh/api/#exact-active-class)
    keep-alive 首次会被加载数据，并且存缓存中 
    exclude：排出页面缓存
    例：
    <keep-alive 
      exclude="Detail">
      <router-view />
    </keep-alive>
### [mode](https://router.vuejs.org/zh/api/#mode)
    hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。
    history: 依赖 HTML5 History API 和服务器配置。查看 HTML5 History 模式。
    abstract: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。
### [Router 实例方法](https://router.vuejs.org/zh/api/#router-currentroute)
    router.beforeEach((to, from, next) => {
        /* 必须调用 `next` */
    })

    router.beforeResolve((to, from, next) => {
        /* 必须调用 `next` */
    })

    router.afterEach((to, from) => {})
### [滚动行为](https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html)
    scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
    }
