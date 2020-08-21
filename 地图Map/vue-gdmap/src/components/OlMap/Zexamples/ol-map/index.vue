
<template>
  <div class="ol-map">
    <!-- 地图-->
    <ol-map ref="olMapChild" @registerSingleClickEvent="mapSingleClickEvent">
      <!-- 自定义弹窗内容-->
      <template #popup>
        <div style="width: 450px;height: 300px;">填充内容 填充自己的业务组件</div>
        <!--<enterprise-popup :single-data="singleData" />-->
      </template>
    </ol-map>
    <!-- 左上搜索 searchMethod: 查询回调 ,clear:清空搜索结果的回调-->
    <search-tool :panel-expand="panelExpand" @searchClick="searchMethod" @clear="clearMethod">
      <!-- 自定义搜索展示-->
      <!--<template #listBox>-->
      <!--111111-->
      <!--</template>-->
    </search-tool>
    <!-- 左下角地图底图切换 -->
    <layers-box :current-index="0" :expand="false" :show-box="true" :bottom="10" :left="10" />
    <!-- 地图右上角工具集装箱，功能和使用请查看组件下readme.md 记录 -->
    <tool-container :tool-obj="toolPropsObj">
      <!--<template #toolBox>-->
      <!--111111-->
      <!--</template>-->
    </tool-container>
    <!-- 右侧盒子-->
    <right-box :updown-expand="false" :panel-expand="true">
      <template #head>
        <div class="div-box">
          头部 填充自己的业务组件
        </div>
      </template>
      <template #middle>
        <div class="div-box">
          中间 填充自己的业务组件
        </div>
      </template>
      <template #bottom>
        <div class="div-box">
          底部 填充自己的业务组件
        </div>
      </template>
    </right-box>
    <!-- 图例 -->
    <legend-box :view-legend="viewLegend" />
    <!--移动的弹窗-->
    <move-popup :is-full="true" :popup-property="popupProperty">
      <template #popupAll>
        <div class="popup-all-dragx">
          <div class="title-dragx drag-box">
            <a class="popup-name-dragx">11111</a>
          </div>
          <div class="div-box-dragx">
            填充内容 填充自己的业务组件 点击可拖拽
            <br>
            填充内容 填充自己的业务组件 点击可拖拽
          </div>
        </div>
      </template>
    </move-popup>
    <move-popup :is-full="true" :popup-property="popupProperty2">
      <template #popupAll2>
        <div class="popup-all-dragx">
          <div class="title2-dragx drag-box">
            <a class="popup-name-dragx">2222</a>
          </div>
          <div class="div-box-dragx">
            <TreeBox
              :tree-height="300"
              :tree-data="imageTreeData"
              :left-default-keys="imageTreeKeys"
              :filter-falg="true"
              :is-edit-object="{
                addParentNode: true,
                expandOnClickNode: false ,
                editFlag: true,
                deleteFlag: true,
                uploadFlag: true,
                downloadFlag: true,
                addNodeFlag: true
              }"
            />
          </div>
        </div>
      </template>
    </move-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    OlMap: () => import('@/components/OlMap'),
    SearchTool: () => import('@/components/OlMap/SearchTool'),
    LayersBox: () => import('@/components/OlMap/LayersBox'),
    ToolContainer: () => import('@/components/OlMap/ToolContainer'),
    RightBox: () => import('@/components/OlMap/RightBox'),
    LegendBox: () => import('@/components/OlMap/LegendBox'),
    MovePopup: () => import('@/components/OlMap/Popup/MovePopup'),
    TreeBox: () => import('@/components/OlMap/TreeBox')
  },
  data() {
    return {
      panelExpand: true, // 面板是否具备左侧缩进功能
      toolPropsObj: {
        fullScreen: true, // 启用全屏/退出全屏功能
        clear: true, // 启用默认的清楚功能
        toolBox: true,
        cityChange: true
      },
      viewLegend: 'air-legend', // 图例
      locaListAll: [],
      locaList: [],
      marker: [], // 搜索出来的地图点位
      singleData: {},
      overlayMarker: [],
      popupProperty: {
        show: true,
        title: 'xxx名称',
        dragBarClass: 'drag-box',
        left: 20,
        top: 120,
        right: 0,
        bottom: 0,
        width: 350,
        height: 300
      },
      popupProperty2: {
        show: true,
        title: 'xxx名称',
        dragBarClass: 'drag-box',
        left: 520,
        top: 180,
        right: 0,
        bottom: 0,
        width: 350,
        height: 420
      },
      imageTreeData: [{
        id: '1',
        name: '任务',
        iconName: '文件夹',
        isEdit: false,
        children: [
          {
            id: '11',
            name: '待响应',
            iconName: '待响应',
            isEdit: false,
            children: []
          },
          {
            id: '12',
            name: '响应中',
            iconName: '响应中',
            isEdit: false,
            children: []
          },
          {
            id: '13',
            name: '已响应',
            iconName: '已响应',
            isEdit: false,
            children: []
          }
        ]
      }, {
        id: '2',
        name: '企业',
        iconName: '文件夹',
        isEdit: false,
        children: [
          {
            id: '21',
            name: '一般风险源企业',
            iconName: '一般风险源企业',
            isEdit: false,
            children: []
          },
          {
            id: '22',
            name: '较大风险源企业',
            iconName: '较大风险源企业',
            isEdit: false,
            children: []
          },
          {
            id: '23',
            name: '重大风险源企业',
            iconName: '重大风险源企业',
            isEdit: false,
            children: []
          }
        ]
      }],
      imageTreeKeys: {
        keys: [],
        keysData: []
      }
    }
  },
  computed: {
    ...mapGetters('app', [
      'sidebar'
    ]),
    ...mapGetters('olmap', [
      'map',
      'olmap',
      'imagesObj'
    ]),
    getOlMap() {
      return this.$refs['olMapChild'].olmap
    }
  },
  methods: {
    searchMethod(queryData) {
      // 拿到查询参数对象
      console.log(queryData)
      // 查询到的结果
      const data = [
        { id: Math.random(), name: '青稞酒业有限责任公司01', pointType: '1', longitude: 101.503389, latitude: 26.628061, value: Math.floor(Math.random() * 500) },
        { id: Math.random(), name: '青稞酒业有限责任公司02', pointType: '1', longitude: 101.559996, latitude: 26.610565, value: Math.floor(Math.random() * 500) },
        { id: Math.random(), name: '青稞酒业有限责任公司03', pointType: '1', longitude: 101.638081, latitude: 26.585796, value: Math.floor(Math.random() * 500) },
        { id: Math.random(), name: '格里坪大气监测微站01-优', pointType: '2', longitude: 101.576987, latitude: 26.597119, value: 20 },
        { id: Math.random(), name: '格里坪大气监测微站02-良', pointType: '2', longitude: 101.465407, latitude: 26.641939, value: 58 },
        { id: Math.random(), name: '格里坪大气监测微站03-轻度污染', pointType: '2', longitude: 101.483946, latitude: 26.587195, value: 112 },
        { id: Math.random(), name: '格里坪大气监测微站04-中度污染', pointType: '2', longitude: 101.466093, latitude: 26.543437, value: 185 },
        { id: Math.random(), name: '格里坪大气监测微站05-重度污染', pointType: '2', longitude: 101.568403, latitude: 26.575586, value: 255 },
        { id: Math.random(), name: '格里坪大气监测微站06-严重污染', pointType: '2', longitude: 101.610918, latitude: 26.589107, value: 350 }
      ]
      this.locaListAll = data
      this.querySearch(queryData.searchKey)
      this.$store.dispatch('olmap/changeSideBarViewData', { data: { 'list-box': this.locaList }, total: 9 })

      this.olmap._clearMarker(this.marker) // 清除点位
      this.olmap._clearOverlay(this.overlayMarker)
      const alarmVal = Math.floor(Math.random() * 300) // 大于这个随机值报警
      this.locaList.forEach((item, index) => {
        if (item.pointType === '1') {
          const marker = this.olmap._addIconMarkers(item, this.imagesObj.Red_Png_, this)
          this.marker.push(marker)
        }
        if (item.pointType === '2') {
          const aqiColor = this.$refs['olMapChild']._aqiColor(item.value)
          let overlay
          if (item.value >= alarmVal) {
            overlay = this.olmap._createMarkerAnimation(item, 'css_overlay_map animation', `<div>${item.value}</div>`, [-15, -15], 30, 30, aqiColor.bColor, this.singleMarker)
          } else {
            overlay = this.olmap._createMarkerAnimation(item, 'css_overlay_map', `<div>${item.value}</div>`, [-15, -15], 30, 30, aqiColor.bColor, this.singleMarker)
          }
          this.overlayMarker.push(overlay)
        }
      })
      const json = this.olmap._findMaxAndMinLngLat(this.locaList) // 得到最大最小经纬度计算 ----OlMap.js
      const lnglatJson = this.olmap._computeMapCenter(json) // 计算地图中心点 ----OlMap.js
      this.olmap._setDefaultZoom([lnglatJson.longitude, lnglatJson.latitude]) // 设置 中心点位 ----OlMap.js
    },
    querySearch(queryString) { // 查询事件
      const restaurants = this.locaListAll
      const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      this.locaList = results
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
      }
    },
    clearMethod() { // 清楚
      this.$store.dispatch('olmap/changeSideBarViewData', { data: { 'list-box': [] }, total: 0 })
      this.olmap._clearMarker(this.marker) // 清除点位
    },
    singleMarker(data) {
      const zoom = this.olmap.map.getView().getZoom()
      const coordinates = [data.longitude, data.latitude]
      const overlayPopup = this.$refs['olMapChild'].overlayPopup
      overlayPopup.setPosition(coordinates)
      this.map.addOverlay(overlayPopup)
      const pixel = this.map.getPixelFromCoordinate(coordinates)
      const coordinateFrom = this.map.getCoordinateFromPixel([pixel[0] + 200, pixel[1] - 100])
      this.olmap._setZoom(zoom, coordinateFrom) // 设置中心点
      this.$store.dispatch('olmap/changePopup', { popupShow: true, popupId: data.id, popupName: data.name, datas: data })
    },
    mapSingleClickEvent(data) { // 地图点击元素的事件 这里涉及到业务逻辑，组件不处理业务相关的内容，需要自己去实现
      console.log(data)
      // 把数据交给自己的弹窗组件
      this.singleData = data
      // 开启Popup
      this.$store.dispatch('olmap/changePopup', { popupShow: true, popupId: data.id, popupName: data.name, datas: data })
    }
  }
}
</script>

<style lang="scss" scoped>
  .ol-map {
    position: relative;
    padding: 0;
    overflow: hidden;
    width: calc(100%);
    height: calc(100%);
  }
</style>
