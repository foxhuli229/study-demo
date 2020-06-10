/*
 * @Author: your name
 * @Date: 2020-06-03 14:38:55
 * @LastEditTime: 2020-06-05 09:30:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-openlayers\src\router\index.js
 */ 
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
      title: '基本地图-定制logo'
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
  {
    path: '/pointLabelMap',
    name: 'PointLabelMap',
    meta: {
      title: 'Feature类实现批量标注点位上图功能'
    },
    component: () => import('@/views/openLayersMap/pointLabelMap'),
  },
  {
    path: '/openlayersAndBaiDuMap',
    name: 'OpenlayersAndBaiDuMap',
    meta: {
      title: 'openlayers结合百度地图api实现定位功能'
    },
    component: () => import('@/views/openLayersMap/openlayersAndBaiDuMap'),
  },
  {
    path: '/mapnavigation',
    name: 'MapNavigation',
    meta: {
      title: '地图导航'
    },
    component: () => import('@/views/openLayersMap/mapnavigation'),
  },

  {
    path: '/tileBaiduMap',
    name: 'TileBaiduMap',
    meta: {
      title: '瓦片-百度地图'
    },
    component: () => import('@/views/openLayersMap/tileBaiduMap'),
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