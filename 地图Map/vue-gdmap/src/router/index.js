/*
 * @Author: your name
 * @Date: 2020-05-26 09:48:37
 * @LastEditTime: 2020-06-03 11:24:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-gdmap\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

/* Layout */
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    name: 'Home',
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export function resetRouter() {
  const newRouter = router
  router.matcher = newRouter.matcher // reset router
}

export default router