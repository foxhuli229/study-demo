import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页'
    },
    component: (resolve) => require(['@/views/Home'], resolve),
  },
  {
    path: '/map1',
    name: 'Map1',
    meta: {
      title: '控件-地图'
    },
    component: (resolve) => require(['@/views/Map/Map'], resolve),
  },

  {
    path: '/map2',
    name: 'Map2',
    meta: {
      title: '覆盖物-地图'
    },
    component: (resolve) => require(['@/views/Map/Map2'], resolve),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router