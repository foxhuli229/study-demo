import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/home'),
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '基本地图'
    },
    component: () => import('@/views/home/index'),
  },
  {
    path: '/demo-map/watershed-one-picture-demo',
    name: '流域监管一张图',
    meta: {
      title: '流域监管一张图'
    },
    component: () => import('@/components/OlMap/Zexamples/watershed-one-picture')
  },
  {
    path: '/watershed-risk-analysis-demo',
    name: '流域风险分析-[饮用水源地+河流断面]',
    meta: {
      title: '流域风险分析-[饮用水源地+河流断面]'
    },
    component: () => import('@/components/OlMap/Zexamples/watershed-risk-analysis')
  },
  {
    path: '/ol-sichuan',
    name: '四川地图',
    meta: {
      title: '四川地图'
    },
    component: () => import('@/components/OlMap/Zexamples/base')
  },
  {
    path: '/ol-map',
    name: '***一张图',
    meta: {
      title: '***一张图'
    },
    component: () => import('@/components/OlMap/Zexamples/ol-map')
  },
  {
    path: '/dot-map',
    name: '打点，画线，画面',
    meta: {
      title: '打点，画线，画面'
    },
    component: () => import('@/components/OlMap/Zexamples/dotmap')
  },
  {
    path: '/enter-bz',
    name: '企业标注',
    meta: {
      title: '企业标注'
    },
    component: () => import('@/components/OlMap/Zexamples/enter-bz')
  },
  {
    path: '/envir-quality',
    name: '环境质量GIS',
    meta: {
      title: '环境质量GIS'
    },
    component: () => import('@/components/OlMap/Zexamples/envir-quality')
  },
  {
    path: '/industry-distribution',
    name: '警情分布',
    meta: {
      title: '警情分布'
    },
    component: () => import('@/components/OlMap/Zexamples/industry-distribution')
  },
  {
    path: '/command-dispatch',
    name: '指挥调度',
    meta: {
      title: '指挥调度'
    },
    component: () => import('@/components/OlMap/Zexamples/command-dispatch')
  },
  {
    path: '/grid-one-picture',
    name: '网格化管理一张图',
    meta: {
      title: '网格化管理一张图'
    },
    component: () => import('@/components/OlMap/Zexamples/grid-one-picture')
  },
  {
    path: '/one-picture-control-demo',
    name: '一图管控',
    meta: {
      title: '一图管控'
    },
    component: () => import('@/components/OlMap/Zexamples/one-picture-control')
  }
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