/*
 * @Author: your name
 * @Date: 2020-05-17 09:03:51
 * @LastEditTime: 2020-05-17 09:43:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \基于vue实战 实现Excel表格上传与导出\excel-upload-download-demo\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import("../views/Home")
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import("../views/download")
  },

  {
    path: '*',
    redirect: "/"
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router