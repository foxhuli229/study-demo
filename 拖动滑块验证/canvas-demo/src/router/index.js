/*
 * @Author: your name
 * @Date: 2020-05-28 10:10:09
 * @LastEditTime: 2020-05-28 10:11:16
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \study-demo\拖动滑块验证\canvas-demo\src\router\index.js
 */ 
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
