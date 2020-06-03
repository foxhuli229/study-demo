<template>
  <div id="olMap">
    <div v-show="popup.popupShow" id="popup" class="ol-popup">
      <div v-if="$slots.popup" class="title">
        <a class="popup-name">{{ popup.popupName }}</a>
        <a href="#" class="ol-popup-closer" @click="closerPopup" />
      </div>
      <div v-if="$slots.popup" id="popup-content" slot="popup" class="popup-content">
        <slot name="popup" />
      </div>
      <div v-if="$slots.popup2" class="title2">
        <a class="popup-name">{{ popup.popupName }}</a>
        <a href="#" class="ol-popup-closer" @click="closerPopup" />
      </div>
      <div v-if="$slots.popup2" slot="popup2" class="popup-content">
        <slot name="popup2" />
      </div>
      <div v-if="$slots.popup3" class="title2">
        <a class="popup-name">{{ popup.popupName }}</a>
        <a href="#" class="ol-popup-closer" @click="closerPopup" />
      </div>
      <div v-if="$slots.popup3" slot="popup3">
        <slot name="popup3" />
      </div>
      <div v-if="$slots.popupAll" slot="popupAll" class="popup-all">
        <a href="#" class="ol-popup-closer" @click="closerPopup" />
        <slot name="popupAll" />
      </div>
      <slot />
    </div>
    <div v-if="$slots.search" slot="search">
      <slot name="search" />
    </div>
    <div v-if="$slots.legend" slot="legend">
      <slot name="legend" />
    </div>
    <div v-if="$slots.layersBox" slot="layersBox">
      <slot name="layersBox" />
    </div>
    <div v-if="$slots.toolContainer" slot="toolContainer">
      <slot name="toolContainer" />
    </div>
    <div v-if="$slots.box" slot="box">
      <slot name="box" />
    </div>
    <div v-if="$slots.rightBox" slot="rightBox">
      <slot name="rightBox" />
    </div>
    <div v-if="$slots.leftBox" slot="leftBox">
      <slot name="leftBox" />
    </div>
    <div v-if="$slots.movePopup" slot="movePopup">
      <slot name="movePopup" />
    </div>
    <div v-if="$slots.movePopup1" slot="movePopup1">
      <slot name="movePopup1" />
    </div>
    <div v-if="$slots.movePopup2" slot="movePopup2">
      <slot name="movePopup2" />
    </div>
    <div v-if="$slots.exportBox" slot="exportBox">
      <slot name="exportBox" />
    </div>
  </div>
</template>

<script>
import OlMapLocalConfig from '@/components/OlMap/api/olmap-local-config.js'
import OlMap from '@/components/OlMap/util/OlMap.js'
import Overlay from 'ol/Overlay'
import store from '@/store'
import { mapGetters } from 'vuex'
export default {
  name: 'BaseMap',
  props: {
    /**
     *  该属性不向外提供使用，只用于组件内部验证地图底图的时候使用
     * **/
    layerType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      configOlMap: null, // 地图初始化参数对象
      olmap: null, // 地图工具对象，里面包含了map对象 olmap.map
      overlayPopup: null,
      dotMapflag: false,
      adminPolygon: [] // 默认地图显示的面，边界
    }
  },
  computed: {
    ...mapGetters('app', [
      'sidebar'
    ]),
    ...mapGetters('olmap', [
      'popup',
      'divicons',
      'dotMapStatus',
      'excursion'
    ])
  },
  watch: {
    sidebar: {
      handler(newVal, oldVal) {
        setTimeout(() => {
          this.olmap.map.updateSize()
        }, 300)
      },
      deep: true
    },
    dotMapStatus(val) {
      this.dotMapflag = val
    }
  },
  mounted() {
    // 创建的时候把配置信息拿回来
    OlMapLocalConfig.configOlMap().then(res => {
      this.configOlMap = res
      /**
       *  把地图配置单元对象进行存储
       * **/
      store.dispatch('olmap/changeConfigObj', this.configOlMap)
      this.initMap()
    })
    // 清空
    this.$on('clear', this.closerPopup)
  },
  methods: {
    /**
     *  初始化地图
     * **/
    initMap() {
      const options = {
        systemType: this.configOlMap.type,
        olmapUrl: this.configOlMap.olmapUrl,
        target: 'olMap',
        tmapkey: this.configOlMap.T_MAP_KEY,
        center: this.configOlMap.MAP_CENTER_,
        zoom: this.configOlMap.MAP_Zoom_,
        minZoom: this.configOlMap.MAP_MinZoom_,
        fitExtent: this.configOlMap.MAP_Extent_,
        layerType: this.layerType !== '' ? this.layerType : this.configOlMap.MAP_LAYER_Type_
      }
      const olmap = new OlMap(options)
      if (olmap instanceof OlMap) {
        olmap._createMap()
        /**
         *  隐藏地图原生的放大缩小组件
         * **/
        document.querySelector('.ol-zoom').style.display = 'none'
        olmap._setZoom(this.configOlMap.MAP_Zoom_, this.configOlMap.MAP_CENTER_)
        this.olmap = olmap
        /**
         *  map 原生对象
         * **/
        store.dispatch('olmap/changeMap', this.olmap.map)
        /**
         *  olmap 工具实例
         * **/
        store.dispatch('olmap/changeOlMap', this.olmap)
        /**
         *  vuex存储地图要是用的图标路径
         * **/
        store.dispatch('olmap/changeImagesObj', this.configOlMap.IMAGES_MARKER_)
        /**
         *  vuex存储地图地图图层地址对象 方便灵活切换地图
         * **/
        store.dispatch('olmap/changeLayers', this.configOlMap.MAP_lAYERS_)
        /**
         *  vuex存储当前城市
         * **/
        store.dispatch('olmap/changeCurrentCity', this.configOlMap.CURRENT_CITY_)
        /**
         *  地图注入事件 让地图元素无差异，位置刷新
         * **/
        olmap.map.on('click', (e) => {
          olmap.map.updateSize()
          this.$emit('registerClickEvent', e)
        })
        this._showPopup()
        /**
         *  地图注入元素点击事件 单击
         * **/
        olmap.map.on('singleclick', (e) => {
          if (!this.dotMapflag) { // 在启用打点组件的时候 不执行这里的代码块
            const pixel = olmap.map.getEventPixel(e.originalEvent)
            const feature = olmap.map.forEachFeatureAtPixel(pixel, (feature, layer) => {
              return feature
            })
            if (feature) {
              if (feature.id_) {
                if (feature.id_.indexOf('AdminPolygon') !== -1) {
                  return
                }
                if (feature.id_.indexOf('AddMarker') !== -1) {
                  const coordinates = feature.getGeometry().getCoordinates()
                  if (coordinates) {
                    const data = feature.data
                    const coordinates = feature.getGeometry().getCoordinates()
                    const zoom = olmap.map.getView().getZoom()
                    if (this.divicons.length === 0) { // 启用 - 未启用标注
                      this.overlayPopup.setPosition(coordinates)
                      this.$emit('registerSingleClickEvent', data)
                      olmap.map.addOverlay(this.overlayPopup)
                      if (this.excursion) { // 启用偏移计算
                        const pixel = olmap.map.getPixelFromCoordinate(coordinates)
                        const coordinateFrom = olmap.map.getCoordinateFromPixel([pixel[0] + 260, pixel[1] - 200])
                        olmap._setZoom(zoom, coordinateFrom)
                      } else {
                        olmap._setZoom(zoom, coordinates)
                      }
                    } else {
                      olmap._setZoom(zoom, coordinates)
                    }
                  }
                }
              }
            }
          }
        })
        /**
         *  地图注入元素双击事件
         * **/
        olmap.map.on('dblclick', (e) => {
          this.$emit('registerDblClickEvent', e)
        })
        /**
         *  地图注入鼠标移入事件
         * **/
        olmap.map.on('moveend', (e) => {
          olmap.map.updateSize()
          this.$emit('registerMoveendEvent', e)
        })
        this.adminPolygon = []
        const opt = {
          key: this.configOlMap.T_MAP_KEY,
          searchWord: this.configOlMap.CURRENT_CITY_.NAME
        }
        OlMapLocalConfig.searchKeyWord(opt).then(res => {
          const area = res.area
          const points = area.points
          if (points !== undefined & points !== '') {
            points.forEach((item) => {
              const polygonString = item.region.toString()
              const polygon = olmap._showAdminPolygon(polygonString, olmap)
              this.adminPolygon.push(polygon)
            })
            const level = area.level
            const coordinates = area.lonlat.split(',')
            const pixel = olmap.map.getPixelFromCoordinate(coordinates)
            const coordinateFrom = olmap.map.getCoordinateFromPixel([pixel[0] - 300, pixel[1] - 40])
            olmap._setZoom(level, coordinateFrom)
            /**
             *  vuex存储地图默认边界图层
             * **/
            store.dispatch('olmap/changeBoundaryLayer', this.adminPolygon)
          }
        })
      }
    },
    closerPopup() {
      if (this.overlayPopup) {
        this.olmap.map.removeOverlay(this.overlayPopup)
      }
      store.dispatch('olmap/changePopup', { popupShow: false })
      if (this.excursion) { // 启用偏移计算
        const pixel = this.olmap.map.getPixelFromCoordinate(this.configOlMap.MAP_CENTER_)
        const coordinateFrom = this.olmap.map.getCoordinateFromPixel([pixel[0] - 300, pixel[1] - 100])
        this.olmap._setDefaultZoom(coordinateFrom)
      } else {
        this.olmap._setDefaultZoom(this.configOlMap.MAP_CENTER_)
      }

    },
    _aqiColor(value) {
      if (value >= 0 && value <= 50) {
        // fColor：左侧文字/主要颜色，rClolor：右侧文字 bColor：背景颜色
        return {
          fColor: '#2BCF29',
          fText: '优',
          rClolor: '#fff',
          bColor: '#2BCF29'
        } // 优
      } else if (value >= 51 && value <= 100) {
        return {
          fColor: '#f3bd02',
          fText: '良',
          rClolor: '#fff',
          bColor: '#ffd202'
        } // 良
      } else if (value >= 101 && value <= 150) {
        return {
          fColor: '#FF7805',
          rClolor: '#fff',
          fText: '轻度污染',
          bColor: '#FF7805'
        } // 轻度
      } else if (value >= 151 && value <= 200) {
        return {
          fColor: '#FF4A49',
          rClolor: '#fff',
          fText: '中度污染',
          bColor: '#FF4A49'
        } // 中度
      } else if (value >= 201 && value <= 300) {
        return {
          fColor: '#9E004F',
          rClolor: '#fff',
          fText: '重度污染',
          bColor: '#9E004F'
        } // 重度
      } else if (value > 300) {
        return {
          fColor: '#790222',
          rClolor: '#fff',
          fText: '严重污染',
          bColor: '#790222'
        } // 严重
      } else if (value === -1) {
        return {
          fColor: '#d1c5e2',
          fText: '无数据',
          rClolor: '#fff',
          bColor: '#d1c5e2'
        }
      }
    },
    _showPopup() {
      if (this.overlayPopup) {
        this.olmap.map.removeOverlay(this.overlayPopup)
      }
      this.overlayPopup = new Overlay({
        element: document.getElementById('popup'),
        stopEvent: false,
        offset: [this.popup.offset.x, this.popup.offset.y],
        className: 'overlay-popup'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    #olMap {
      width: calc(100%);
      height: calc(100%);
      overflow: hidden;
      position: absolute;
      z-index: 1;
      .ol-popup {
        position: absolute;
        border: 1px solid #cccccc;
        bottom: 12px;
        left: -50px;
        box-shadow:0px 8px 20px 0px rgba(4,0,0,0.3);
        border-radius:4px;
        display: block;
        background: white;
        z-index: 999;
        .title{
          width: calc(100%);
          height: calc(100%);
          padding: 5px;
          border-bottom: 1px solid #dddddd;
          margin-bottom: 5px;
          font-size: 14px;
          color: white;
          display: inline-flex;
          min-width: 220px;
          background-image: linear-gradient(to right, rgba(64, 158, 255, 0.77), #1890ff);
          .popup-name{
            font-size: 14px;
            width: auto;
            white-space:nowrap;     //强制不换行
            overflow:hidden;           //自动隐藏文字
            text-overflow: ellipsis;    //文字隐藏后添加省略号
            -o-text-overflow:ellipsis; //适用于opera浏览器
            max-width: 220px;
          }
        }
        .title2{
          width: calc(100%);
          height: calc(100%);
          padding: 5px;
          border-bottom: 1px solid #dddddd;
          font-size: 12px;
          color: #000000;
          display: inline-flex;
          min-width: 220px;
          .popup-name{
            font-size: 14px;
            width: auto;
            white-space:nowrap;     //强制不换行
            overflow:hidden;           //自动隐藏文字
            text-overflow: ellipsis;    //文字隐藏后添加省略号
            -o-text-overflow:ellipsis; //适用于opera浏览器
            max-width: 220px;
          }
        }
      }
      .ol-popup:after, .ol-popup:before {
        top: 100%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
      }
      .ol-popup:after {
        border-top-color: white;
        border-width: 5px;
        left: 48px;
        margin-left: -5px;
      }
      .ol-popup:before {
        border-top-color: #cccccc;
        border-width: 5px;
        left: 48px;
        margin-left: -5px;
      }
      .ol-popup-closer {
        text-decoration: none;
        position: absolute;
        top: 5px;
        right: 5px;
      }
      .ol-popup-closer:after {
        content: "✖";
      }
      .popup-content {
        top: 0px;
        position: relative;
        padding: 10px;
      }
      .popup-all{
        width: calc(100%);
        height: calc(100%);
        padding: 10px;
        font-size: 12px;
        color: #000000;
        display: inline-flex;
        min-width: 10px;
      }
    }
</style>

<style lang="scss">
  .tooltip {
    position: relative;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    color: white;
    padding: 4px 15px 4px 8px;
    opacity: 0.7;
    white-space: nowrap;
    z-index: 1000;
    font-size: 10px;
    line-height: 20px;
  }
  .tooltip-measure {
    opacity: 1;
    font-weight: bold;
  }
  .tooltip-static {
    background-color: #ffcc33;
    color: black;
    border: 1px solid white;
  }
  .tooltip-measure:before,
  .tooltip-static:before {
    border-top: 6px solid rgba(0, 0, 0, 0.5);
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    content: "";
    position: absolute;
    bottom: -6px;
    margin-left: -7px;
    left: 50%;
  }
  .tooltip-static:before {
    border-top-color: #ffcc33;
  }
  .tool-closer{
    text-decoration: none;
    position: absolute;
    font-size: 10px;
    width: 10px;
    height: auto;
    top: 0px;
    right: 0px;
    color: red;
    line-height: 20px;
  }
  .tool-closer:after {
    content: "✖";
  }
  .tool-point-image{
    width: 12px;
    height: 18px;
    background-size:contain;
  }
  .tool-bd-panle{
    margin: 0 auto;
    min-width: 300px;
    width: auto;
    height: 100px;
    overflow: hidden;
    pointer-events: none;
    background: #fff;
    color: #333;
    padding: 10px 10px 10px 10px;
    box-shadow: 0 3px 14px rgba(0,0,0,.4);
    >div{
      width: calc(100%);
      padding: 5px;
      font-size: 12px;
      > span{
        font-weight: bold;
      }
      >e{
        margin-left: 10px;
      }
    }
  }
  .tool-bd-panle:after, .tool-bd-panle:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: auto;
    width: auto;
    position: absolute;
    pointer-events: none;
  }
  .tool-bd-panle:after {
    border-top-color: white;
    border-width: 5px;
    left: 50%;
    margin-left: -5px;
  }
  .tool-bd-panle:before {
    border-top-color: #cccccc;
    border-width: 6px;
    left: 50%;
    margin-left: -6px;
  }
  /*aqi*/
  .css_overlay_map {
    border-radius: 100%;
    border: 1px solid white;
    animation-iteration-count: infinite;
    z-index: 1;
    >div{
      width: 100%;
      color: white;
      font-size: 10px;
      text-align:center;
      padding: 3px 0px 0px 0px;
      z-index: 2;
      position: relative;
      text-align: center;
    }
  }
  .css_overlay_map{
   .name {
      font-size: 12px;
      text-align: center;
      margin-top: 1px;
    }
    .css_overlay_map.animation {
      &::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 100%;
        animation: myfirst-map 2.5s;
        animation-iteration-count: infinite;
        z-index: 1;
        transform-origin: 50% 50%;
        background: inherit;
        font-size: 12px;
      }
    }
  }
  @keyframes myfirst-map {
    to {
      transform: scale(3);
      background: rgba(0, 0, 0, 0);
    }
  }
  /* 企业标注方形 */
  .css_overlay_tetragonum {
    border: 1px solid white;
    animation-iteration-count: infinite;
    z-index: 1;
  }
  .overlay-popup{
    z-index: 1001;
  }
</style>

