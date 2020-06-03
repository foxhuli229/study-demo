import Main from '*/views/main'
export const routeMap = {
  path: '/demo-map',
  component: Main,
  meta: { title: 'DemoMap', navMenu: true, icon: 'table' },
  children: [
    {
      path: 'watershed-one-picture-demo',
      name: '流域监管一张图',
      meta: { title: '流域监管一张图', icon: 'table' },
      component: () => import('@/components/OlMap/Zexamples/watershed-one-picture')
    },
    {
      path: 'watershed-risk-analysis-demo',
      name: '流域风险分析-[饮用水源地+河流断面]',
      meta: { title: '流域风险分析-[饮用水源地+河流断面]', icon: 'table' },
      component: () => import('@/components/OlMap/Zexamples/watershed-risk-analysis')
    },
    {
      path: 'ol-sichuan',
      name: '四川地图',
      meta: { title: '四川地图', icon: 'table' },
      component: () => import('@/components/OlMap/Zexamples/base')
    },
    {
      path: 'ol-map',
      name: '***一张图',
      meta: { title: '***一张图', icon: 'table' },
      component: () => import('@/components/OlMap/Zexamples/ol-map')
    },
    {
      path: 'dot-map',
      name: '打点，画线，画面',
      meta: { title: '打点，画线，画面', icon: 'table' },
      component: () => import('@/components/OlMap/Zexamples/dotmap')
    },
    {
      path: 'enter-bz',
      name: '企业标注',
      meta: { title: '企业标注', icon: 'table' },
      component: () => import('@/components/OlMap/Zexamples/enter-bz')
    },
    {
      path: 'envir-quality',
      name: '环境质量GIS',
      meta: { title: '环境质量GIS', icon: 'table' },
      component: () => import('@/components/OlMap/Zexamples/envir-quality')
    },
    {
      path: 'industry-distribution',
      name: '警情分布',
      meta: { title: '警情分布', icon: 'table' },
      component: () => import('@/components/OlMap/Zexamples/industry-distribution')
    },
    {
      path: 'command-dispatch',
      name: '指挥调度',
      meta: { title: '指挥调度', icon: 'table' },
      component: () => import('@/components/OlMap/Zexamples/command-dispatch')
    },
    {
      path: 'grid-one-picture',
      name: '网格化管理一张图',
      meta: { title: '网格化管理一张图', icon: 'table' },
      component: () => import('@/components/OlMap/Zexamples/grid-one-picture')
    },
    {
      path: 'one-picture-control-demo',
      name: '一图管控',
      meta: { title: '一图管控', icon: 'table' },
      component: () => import('@/components/OlMap/Zexamples/one-picture-control')
    }
  ]
}
