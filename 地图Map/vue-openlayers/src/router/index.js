import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [{
    path: '/',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/home'),
  },
  {
    path: '/map',
    name: 'Map',
    meta: {
      title: '基本地图'
    },
    component: () => import('@/views/openLayersMap/map'),
  },
  {
    path: '/arcGisMap',
    name: 'ArcGisMap',
    meta: {
      title: 'ArcGisMap地图'
    },
    component: () => import('@/views/openLayersMap/ArcGisMap'),
  },
  {
    path: '/pointMap',
    name: 'PointMap',
    meta: {
      title: '点地图'
    },
    component: () => import('@/views/openLayersMap/pointMap'),
  },
 
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router