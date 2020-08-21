/*
 * @Author: your name
 * @Date: 2020-05-26 10:01:47
 * @LastEditTime: 2020-05-27 15:41:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-baidumap\src\router\index.js
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router