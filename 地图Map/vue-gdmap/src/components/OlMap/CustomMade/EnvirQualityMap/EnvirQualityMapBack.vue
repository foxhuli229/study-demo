<template>
  <div class="envir-quality-map">
    <ol-map ref="olMapChildEQM" @registerSingleClickEvent="mapSingleClickEvent">
      <template #search>
        <search-tool :panel-expand="false" :mouseout-flag="false" @searchClick="searchMethod" @clear="clearMethod">
          <template #listBox>
            <div v-if="$slots.EQMSearchBox" slot="EQMSearchBox">
              <slot name="EQMSearchBox" />
            </div>
          </template>
        </search-tool>
      </template>
      <template #legend>
        <legend-box :view-legend="viewLegend" :left-x="35" :left-b="2" />
      </template>
      <template v-if="olmap" #toolContainer>
        <tool-container :tool-obj="toolPropsObj" :adminis-options="adminisOptions" :key-area-options="keyAreaOptions"/>
      </template>
      <template #popup>
        <div v-if="$slots.EQMPopup" slot="EQMPopup">
          <slot name="EQMPopup" />
        </div>
      </template>
      <template #rightBox>
        <right-box :updown-expand="true" :panel-expand="false" :default-expand="true">
          <template #title>
            {{ topTypeClick.name }} 统计
          </template>
          <template #all>
            <div v-if="$slots.rightBoxAll" slot="rightBoxAll">
              <slot name="rightBoxAll" />
            </div>
          </template>
          <template #head>
            <div v-if="$slots.rightBoxHead" slot="rightBoxHead">
              <slot name="rightBoxHead" />
            </div>
          </template>
          <template #middle>
            <div v-if="$slots.rightBoxMiddle" slot="rightBoxMiddle">
              <slot name="rightBoxMiddle" />
            </div>
          </template>
          <template #bottom>
            <div v-if="$slots.rightBoxBottom" slot="rightBoxBottom">
              <slot name="rightBoxBottom" />
            </div>
          </template>
        </right-box>
      </template>
      <template #leftBox>
        <left-box :bottom-y="2" :updown-expand="true" :panel-expand="false" :tree-data="treeData" :left-box-expand="true" />
      </template>
    </ol-map>
  </div>
</template>

<script>
export default {
  name: 'EnvirQualityMap',
  components: {
    OlMap: () => import('@/components/OlMap'),
    LegendBox: () => import('@/components/OlMap/LegendBox'),
    ToolContainer: () => import('@/components/OlMap/ToolContainer'),
    RightBox: () => import('@/components/OlMap/RightBox'),
    LeftBox: () => import('@/components/OlMap/LeftBox'),
    SearchTool: () => import('@/components/OlMap/SearchTool')
  },
  props: {
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    },
    aqiAlarmVal: { // AQI预警值
      type: Number,
      default: 500
    },
    airData: { // 大气数据
      type: Array,
      default: () => { // 气 value 根据值来区分aqi 的类型
        return []
      }
    },
    waterData: { // 水数据
      type: Array,
      default: () => { // 水 value 根据值来区分类型
        return []
      }
    },
    soilData: { // 土壤数据
      type: Array,
      default: () => {
        return []
      }
    },
    adminisOptions: { // 行政区域
      type: Array,
      default: () => {
        return []
      }
    },
    keyAreaOptions: { // key area  重点区域
      type: Array,
      default: () => {
        return []
      }
    }

  },
  data() {
    return {
      toolPropsObj: {
        fullScreen: true,
        airWaterNoiseSoil: true,
        selectBox: true
      },
      viewLegend: 'air-legend', // 图例
      aqiOverlayMarker: [],
      waterOverlayMarker: [],
      soilOverlayMarker: []
    }
  },
  computed: {
    configObj() {
      return this.$store.state.olmap.configObj
    },
    topTypeClick() {
      return this.$store.state.olmap.topTypeClick
    },
    colorLegend() {
      const findVal = this.legendView.find(item => {
        return item.view === this.topTypeClick.component
      })
      return findVal.color
    },
    legendView() {
      return this.$store.state.olmap.legendView
    },
    map() {
      return this.$store.state.olmap.olmap.map
    },
    olmap() {
      return this.$store.state.olmap.olmap
    },
    imagesObj() {
      return this.$store.state.olmap.imagesObj
    }
  },
  watch: {
    airData: {
      handler(newVal, oldVal) {
        this.clearMarker()
        if (newVal.length > 0) {
          this.addAqiMarker(newVal)
        }
      },
      deep: true
    },
    waterData: {
      handler(newVal, oldVal) {
        this.clearMarker()
        if (newVal.length > 0) {
          this.addWaterMarker(newVal)
        }
      },
      deep: true
    },
    soilData: {
      handler(newVal, oldVal) {
        this.clearMarker()
        if (newVal.length > 0) {
          this.addSoliMarker(newVal)
        }
      },
      deep: true
    }
  },
  mounted() {
    this.$store.dispatch('olmap/changeLegendView', { view: this.topTypeClick.component, show: true })
    this.$store.dispatch('olmap/toggleSideBoxRigthShow', true)
    setTimeout(() => {
      this.clearMarker()
      this.addAqiMarker(this.airData)
      this.addWaterMarker(this.waterData)
      this.addSoliMarker(this.soilData)
    }, 300)
  },
  methods: {
    addAqiMarker(data) {
      if (data.length > 0) {
        data.forEach((item, index) => {
          const aqiColor = this.$refs['olMapChildEQM']._aqiColor(item.value)
          let overlay
          if (item.value >= this.aqiAlarmVal) {
            overlay = this.olmap._createMarkerAnimation(item, 'css_overlay_map animation', `<div>${item.value}</div>`, [-15, -15], 25, 25, aqiColor.bColor, this.singleMarker)
          } else {
            overlay = this.olmap._createMarkerAnimation(item, 'css_overlay_map', `<div>${item.value}</div>`, [-15, -15], 25, 25, aqiColor.bColor, this.singleMarker)
          }
          this.aqiOverlayMarker.push(overlay)
        })
        const json = this.olmap._findMaxAndMinLngLat(data)
        const lnglatJson = this.olmap._computeMapCenter(json)
        this.olmap._setDefaultZoom([lnglatJson.longitude, lnglatJson.latitude])
      }
    },
    addWaterMarker(data) {
      if (data.length > 0) {
        data.forEach((item, index) => {
          const findVal = this.colorLegend.find(item2 => {
            return item2.code === item.value
          })
          const overlay = this.olmap._createMarkerAnimation(item, 'css_overlay_map', `<div class="name">${findVal.logogram}</div>`, [-15, -15], 30, 30, findVal.value, this.singleMarker)
          this.waterOverlayMarker.push(overlay)
        })
        this.olmap._setZoom(this.configObj.MAP_Zoom_, this.configObj.MAP_CENTER_)
      }
    },
    addSoliMarker(data) {
      if (data.length > 0) {
        data.forEach((item, index) => {
          const findVal = this.colorLegend.find(item2 => {
            return item2.code === item.value
          })
          const overlay = this.olmap._createMarkerAnimation(item, 'css_overlay_map', `<div class="name" style="color:${findVal.color}">${findVal.logogram}</div>`, [-15, -15], 30, 30, findVal.value, this.singleMarker)
          this.waterOverlayMarker.push(overlay)
        })
        this.olmap._setZoom(this.configObj.MAP_Zoom_, this.configObj.MAP_CENTER_)
      }
    },
    singleMarker(data) {
      this.$emit('handlerSingleClick', data)
      const zoom = this.olmap.map.getView().getZoom()
      const coordinates = [data.longitude, data.latitude]
      const overlayPopup = this.$refs['olMapChildEQM'].overlayPopup
      overlayPopup.setPosition(coordinates)
      this.map.addOverlay(overlayPopup)
      const pixel = this.map.getPixelFromCoordinate(coordinates)
      const coordinateFrom = this.map.getCoordinateFromPixel([pixel[0] + 200, pixel[1] - 100])
      this.olmap._setZoom(zoom, coordinateFrom) // 设置中心点
      this.$store.dispatch('olmap/changePopup', { popupShow: true, popupId: data.id, popupName: data.name, datas: data })
    },
    mapSingleClickEvent(data) {
      this.$emit('handlerSingleClick', data)
      // 开启Popup
      this.$store.dispatch('olmap/changePopup', { popupShow: true, popupId: data.id, popupName: data.name, datas: data })
    },
    searchMethod(queryData) {
      // 拿到查询参数对象
      this.$emit('handlerSearchMethod', queryData)
    },
    clearMethod() {
      this.$store.dispatch('olmap/changeSideBarViewData', { data: { 'list-box': [] }, total: 0 })
      this.$store.dispatch('olmap/changeSideBarViewData', { data: { 'list-box-image': [] }, total: 0 })
    },
    clearMarker() {
      this.$store.dispatch('olmap/changePopup', { popupShow: false, popupId: Math.random() })
      if (this.aqiOverlayMarker.length > 0) {
        this.olmap._clearOverlay(this.aqiOverlayMarker)
        this.aqiOverlayMarker = []
      }
      if (this.waterOverlayMarker.length > 0) {
        this.olmap._clearOverlay(this.waterOverlayMarker)
        this.waterOverlayMarker = []
      }
      if (this.soilOverlayMarker.length > 0) {
        this.olmap._clearOverlay(this.soilOverlayMarker)
        this.soilOverlayMarker = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.envir-quality-map{
  width: calc(100%);
  height: calc(100%);
}
</style>
