/*
 * @Author: your name
 * @Date: 2020-05-26 10:01:47

 */ 
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
      title: '控件-地图(初始化自动发送定位申请)'
    },
    component: (resolve) => require(['@/views/Map/Map'], resolve),
  },

  {
    path: '/map2',
    name: 'Map2',
    meta: {
      title: '覆盖物-地图(初始化自动发送定位申请)'
    },
    component: (resolve) => require(['@/views/Map/Map2'], resolve),
  },

  {
    path: '/map3',
    name: 'Map3',
    meta: {
      title: 'vue-baidumap-地图'
    },
    component: (resolve) => require(['@/views/Map/Map3'], resolve),
  },

  {
    path: '/baiduMap4',
    name: 'BaiduMap4',
    meta: {
      title: '百度地图-引用百度地图官网api'
    },
    component: (resolve) => require(['@/views/BaiduApiMap/baiduMap'], resolve),
  },

  {
    path: '/map4',
    name: 'Map4',
    meta: {
      title: '带搜索功能-地图'
    },
    component: (resolve) => require(['@/views/Map/map4'], resolve),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router