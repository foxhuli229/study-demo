import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

const state = {
  configObj: {}, // 地图配置对象
  map: null, // 地图对象
  olmap: null, // 地图工具对象,
  layers: [
    { name: '地图', id: 'vec_type', url: '', isShow: 0 },
    { name: '影像', id: 'img_type', url: '', isShow: 0 },
    { name: '地形', id: 'ter_type', url: '', isShow: 0 }
  ],
  imagesObj: {}, // 地图marker 点位路径
  sideBarShow: true, // 左侧栏显示,
  sideBarView: {
    currentView: 'collect-component', // 显示的视图 动态显示搜索的结果，不同类型的结果搜索出来的视图可能不一样。
    total: 0, // 总条数
    data: {} // 数据
  }, //  左侧栏需要显示的组件,
  sideBoxRigthShow: true, // 右侧盒子组件 显示
  queryData: { // 查询条件
    currentPage: 1,
    pageSize: 10,
    searchKey: '', // 查询关键字
    administrative: '', // 行政区划
    keyArea: '' // 重点区域
  },
  showMapDiv: true, // 工具
  drawVectorLayer: null,
  polygon: {
    centre: [],
    data: []
  },
  toolBox: null, // 工具实例
  divicons: [], // 存取点数据
  currentCity: {}, // 当前城市
  // 弹出窗口的属性信息
  popup: {
    popupShow: false,
    popupName: '',
    layer: {},
    currentView: '',
    offset: {
      x: 0,
      y: -10
    },
    lonlat: [],
    datas: {},
    closePopupCallback: null
  },
  // 默认地图加载的边界层
  boundaryLayer: [],
  // 是否启用了打点组件
  dotMapStatus: false,
  topToolType: [// 顶部组件
    { id: 1, name: '大气环境', icon: 'icon-atmosphere', show: true, component: 'air-legend', triangle: true },
    { id: 2, name: '水质环境', icon: 'icon-water', show: true, component: 'water-legend', triangle: false },
    { id: 3, name: '土壤环境', icon: 'icon-soil', show: true, component: 'soil-legend', triangle: false },
    { id: 4, name: '噪声环境', icon: 'icon-noise', show: false, component: 'noise-legend', triangle: false }

  ],
  topTypeClick: { id: 1, name: '大气环境', icon: 'icon-atmosphere', show: true, component: 'air-legend', triangle: true }, // 选中
  legendView: [ // 系统存在的图例
    { id: 1, name: '大气环境图例', view: 'air-legend', show: false,
      color: [
        { id: 1, name: '优', code: 1, value: '#2BCF29' },
        { id: 2, name: '良', code: 2, value: '#ffd202' },
        { id: 3, name: '轻度污染', code: 3, value: '#FF7805' },
        { id: 4, name: '中度污染', code: 4, value: '#FF4A49' },
        { id: 5, name: '重度污染', code: 5, value: '#9E004F' },
        { id: 6, name: '严重污染', code: 6, value: '#790222' }
      ]
    },
    { id: 2, name: '企业点位图例', view: 'enter-legend', show: false },
    { id: 3, name: '水质环境图例', view: 'water-legend', show: false,
      color: [
        { id: 1, name: 'I 类', code: 1, value: '#2BCF29', logogram: 'I类' },
        { id: 2, name: 'II 类', code: 2, value: '#ffd202', logogram: 'II类' },
        { id: 3, name: 'III 类', code: 3, value: '#FF7805', logogram: 'III类' },
        { id: 4, name: 'IV 类', code: 4, value: '#FF4A49', logogram: 'IV类' },
        { id: 5, name: 'V 类', code: 5, value: '#9E004F', logogram: 'V类' },
        { id: 6, name: '劣V类', code: 6, value: '#000000', logogram: '劣V' }
      ]
    },
    { id: 4, name: '土壤环境图例', view: 'soil-legend', show: false,
      color: [
        { id: 1, name: '无污染', code: 1, value: '#2BCF29', logogram: '无' },
        { id: 2, name: '轻微污染', code: 2, value: '#fff90a', color: '#000000', logogram: '轻微' },
        { id: 3, name: '轻度污染', code: 3, value: '#ffca28', logogram: '轻度' },
        { id: 4, name: '中度污染', code: 4, value: '#FF4A49', logogram: '中度' },
        { id: 5, name: '重度污染', code: 5, value: '#9E004F', logogram: '重度' }
      ]
    },
    { id: 5, name: '噪声环境图例', view: 'noise-legend', show: false },
    { id: 6, name: '企业标注信息的图例', view: 'biaozhu-legend', show: false,
      color: [
        { id: 1, name: '重大风险源', code: 1, value: '#ff2628' },
        { id: 2, name: '较大风险源', code: 2, value: '#ffb12e' },
        { id: 3, name: '一般风险源', code: 3, value: '#faf64e' },
        { id: 4, name: '重大危险源', code: 4, value: '#2a4fcd' },
        { id: 5, name: '废气排放口', code: 5, value: '#7889e7' },
        { id: 6, name: '废水排放口', code: 6, value: '#bed5ff' }
      ]
    },
    { id: 7, name: '警情分布图例', view: 'industry-legend', show: false,
      color: [
        { id: 1, name: '一级预警', code: 1, value: '/static/olmap/images/industry-distribution/一级警情.png' },
        { id: 2, name: '二级预警', code: 2, value: '/static/olmap/images/industry-distribution/二级警情.png' },
        { id: 3, name: '三级预警', code: 3, value: '/static/olmap/images/industry-distribution/三级警情.png' },
        { id: 4, name: '四级预警', code: 4, value: '/static/olmap/images/industry-distribution/四级警情.png' }
      ]
    },
    { id: 8, name: '网格化分布图图例', view: 'distribution-legend', show: false,
      color: [
        { id: 1, name: '待执行', code: 1, value: '/static/olmap/images/grid-one-picture/daizhixing.png' },
        { id: 2, name: '执行中', code: 2, value: '/static/olmap/images/grid-one-picture/zhixingzhong.png' },
        { id: 3, name: '已执行', code: 3, value: '/static/olmap/images/grid-one-picture/yizhixing.png' }
      ]
    },
    { id: 9, name: '一图管控图例', view: 'picture-control-legend', show: false,
      color: [
        { id: 1, name: '异常污染源', code: 1, value: '/static/olmap/images/one-picture-control/异常污染源.png' },
        { id: 2, name: '正常污染源', code: 2, value: '/static/olmap/images/one-picture-control/正常污染源.png' }
      ]
    }
  ],
  leftBoxShow: true, // 左侧专题图层
  leftDefaultKeys: {
    keys: [],
    keysData: []
  }, // 专题图层选中的
  excursion: true // 启动地图点击根据点位像素进行偏移  false 的话，当前点位为中心点，不去走复杂的计算
}
const mutations = {
  setConfigObj(state, configObj) {
    state.configObj = configObj
  },
  setMap(state, map) {
    state.map = map
  },
  setOlMap(state, olmap) {
    state.olmap = olmap
  },
  setLayers(state, layers) {
    state.layers = layers
  },
  setImagesObj(state, imagesObj) {
    state.imagesObj = imagesObj
  },
  setSideBarShow(state, sideBarShow) {
    state.sideBarShow = sideBarShow
  },
  setSideBarView(state, sideBarView) {
    state.sideBarView = sideBarView
  },
  setSideBarViewData(state, data) {
    state.sideBarView = _.assign(state.sideBarView, data)
  },
  setSideBoxRigthShow(state, sideBoxRigthShow) {
    state.sideBoxRigthShow = sideBoxRigthShow
  },
  setQueryData(state, queryData) {
    state.queryData = _.assign(state.queryData, queryData)
  },
  setShowMapDiv(state, showMapDiv) {
    state.showMapDiv = showMapDiv
  },
  setDrawVectorLayer(state, drawVectorLayer) {
    state.drawVectorLayer = drawVectorLayer
  },
  setPolygon(state, polygon) {
    state.polygon = polygon
  },
  setToolBox(state, toolBox) {
    state.toolBox = toolBox
  },
  setDivIcons(state, divicons) {
    state.divicons = divicons
  },
  setCurrentCity(state, city) {
    state.currentCity = city
  },
  setPopup(state, popup) {
    state.popup = _.assign(state.popup, popup)
  },
  setBoundaryLayer(state, boundaryLayer) {
    state.boundaryLayer = boundaryLayer
  },
  setDotMapStatus(state, dotMapStatus) {
    state.dotMapStatus = dotMapStatus
  },
  setTopToolType(state, topToolType) {
    state.topToolType = topToolType
  },
  setTopTypeClick(state, topTypeClick) {
    state.topTypeClick = topTypeClick
  },
  setLegendView(state, legendView) {
    state.legendView.forEach((item) => {
      if (item.view === legendView.view) { item.show = legendView.show }
    })
  },
  setLegendViewAll(state, legendView) {
    state.legendView = legendView
  },
  setLeftBoxShow(state, leftBoxShow) {
    state.leftBoxShow = leftBoxShow
  },
  setLeftDefaultKeys(state, leftDefaultKeys) {
    state.leftDefaultKeys = _.assign(state.leftDefaultKeys, leftDefaultKeys)
  },
  setExcursion(state, excursion) {
    state.excursion = excursion
  }
}
const actions = {
  changeConfigObj(context, configObj) {
    context.commit('setConfigObj', configObj)
  },
  changeMap(context, map) {
    context.commit('setMap', map)
  },
  changeOlMap(context, olmap) {
    context.commit('setOlMap', olmap)
  },
  changeLayers(context, layers) {
    context.commit('setLayers', layers)
  },
  changeImagesObj(context, imagesObj) {
    context.commit('setImagesObj', imagesObj)
  },
  toggleSideBarShow(context, sideBarShow) {
    context.commit('setSideBarShow', sideBarShow)
  },
  changeSideBarView(context, sideBarView) {
    context.commit('setSideBarView', sideBarView)
  },
  // 只改变数据，不改变视图
  changeSideBarViewData(context, data) {
    context.commit('setSideBarViewData', data)
  },
  toggleSideBoxRigthShow(context, sideBoxRigthShow) {
    context.commit('setSideBoxRigthShow', sideBoxRigthShow)
  },
  changeQueryData(context, queryData) {
    context.commit('setQueryData', queryData)
  },
  changeShowMapDiv(context, showMapDiv) {
    context.commit('setShowMapDiv', showMapDiv)
  },
  changeDrawVectorLayer(context, drawVectorLayer) {
    context.commit('setDrawVectorLayer', drawVectorLayer)
  },
  changePolygon(context, polygon) {
    context.commit('setPolygon', polygon)
  },
  changeToolBox(context, toolBox) {
    context.commit('setToolBox', toolBox)
  },
  changeDivIcons(context, divicons) {
    context.commit('setDivIcons', divicons)
  },
  changeCurrentCity(context, city) {
    context.commit('setCurrentCity', city)
  },
  changePopup(context, popup) {
    context.commit('setPopup', popup)
  },
  changeBoundaryLayer(context, boundaryLayer) {
    context.commit('setBoundaryLayer', boundaryLayer)
  },
  changeDotMapStatus(context, dotMapStatus) {
    context.commit('setDotMapStatus', dotMapStatus)
  },
  changeTopToolType(context, topToolType) {
    context.commit('setTopToolType', topToolType)
  },
  changeTopTypeClick(context, topTypeClick) {
    context.commit('setTopTypeClick', topTypeClick)
  },
  changeLegendView(context, viewObj) {
    context.commit('setLegendView', viewObj)
  },
  changeLegendViewAll(context, viewObj) {
    context.commit('setLegendViewAll', viewObj)
  },
  toggleLeftBoxShow(context, leftBoxShow) {
    context.commit('setLeftBoxShow', leftBoxShow)
  },
  changeLeftDefaultKeys(context, leftDefaultKeys) {
    context.commit('setLeftDefaultKeys', leftDefaultKeys)
  },
  changeExcursion(context, excursion) {
    context.commit('setExcursion', excursion)
  }
}
const getters = {
  map: state => state.map,
  olmap: state => state.olmap,
  layers: state => state.layers,
  imagesObj: state => state.imagesObj,
  sideBarShow: state => state.sideBarShow,
  sideBarView: state => state.sideBarView,
  queryData: state => state.queryData,
  divicons: state => state.divicons,
  showMapDiv: state => state.showMapDiv,
  popup: state => state.popup,
  dotMapStatus: state => state.dotMapStatus,
  excursion: state => state.excursion
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
