<template>
  <toolcom :item="item" />
</template>
<script>
import Overlay from 'ol/Overlay.js'
import OlMapLocalConfig from '@/components/OlMap/api/olmap-local-config.js'
export default {
  name: 'Toolbd',
  components: {
    Toolcom: () => import('./ToolCom')
  },
  data() {
    return {
      pointerMoveHandler: null,
      measureTooltipElement: null,
      measureTooltip: null,
      point: null,
      item: {
        className: 'toolbd',
        name: '标点',
        open: false
      },
      divicon: [],
      addFlag: false
    }
  },
  computed: {
    configObj() {
      return this.$store.state.olmap.configObj
    },
    map() {
      return this.$store.state.olmap.map
    },
    olmap() {
      return this.$store.state.olmap.olmap
    },
    imagesObj() {
      return this.$store.state.olmap.imagesObj
    },
    divicons() {
      return this.$store.state.olmap.divicons
    }
  },
  watch: {
    'item': {
      handler: function(val) {
        if (val.open) {
          this.rmMoveDivIcon()
          this.map.un('pointermove', this.mousemoveHandler)
          this.map.un('click', this.mouseclickHandler)
          this.map.un('singleclick', this.singleclickHandler)
          if (!this.addFlag) {
            this.addFlag = !this.addFlag
            this.divicon = {
              className: 'hover-icon',
              iconSize: [18, 28],
              lnglat: {
                lng: '',
                lat: ''
              },
              popupType: 'tool-bd-popup-cont-component',
              popupTitle: '点标注',
              geoinfo: {
                name: ''
              },
              // 鼠标移动时的marker
              type: 'move',
              idx: this.divicons.length
            }
            this.divicons.push(this.divicon)
            this.$store.dispatch('olmap/changeDivIcons', this.divicons)
            this.map.on('pointermove', this.mousemoveHandler)
            this.map.on('click', this.mouseclickHandler)
            this.map.on('singleclick', this.singleclickHandler)
            //    ================================= 覆盖物
            if (this.measureTooltip) {
              this.map.removeOverlay(this.measureTooltip)
            }
            this.measureTooltipElement = document.createElement('div')
            this.measureTooltipElement.className = ''
            this.measureTooltip = new Overlay({
              element: this.measureTooltipElement,
              offset: [0, 0],
              positioning: 'bottom-center'
            })
            this.map.addOverlay(this.measureTooltip)
            //    ================================= 点位
            if (this.point) {
              this.olmap.MarkerVectorLayer.getSource().removeFeature(this.point)
              this.point = null
            }
          }
        }
      },
      deep: true
    }
  },
  mounted() {
    // 清空
    this.$on('clear', this.clear)
  },
  methods: {
    clear() {
      if (this.measureTooltip) {
        this.map.removeOverlay(this.measureTooltip)
      }
      if (this.point) {
        this.olmap.MarkerVectorLayer.getSource().removeFeature(this.point)
        this.point = null
      }
      this.$store.dispatch('olmap/changeDivIcons', [])
    },
    mousemoveHandler(evt) {
      const coordinate = evt.coordinate
      const longitude = coordinate[0].toFixed(6)
      const latitude = coordinate[1].toFixed(6)
      this.divicon.lnglat = { lng: longitude, lat: latitude }
      this.measureTooltipElement.innerHTML = `<div style="background: url('${this.configObj.olmapUrl}${this.imagesObj.Red_Png_}');width: 12px; height: 18px;background-size:contain;"></div>`
      this.measureTooltip.setPosition(coordinate)
    },
    // 移除鼠标移动时创建的divicon
    rmMoveDivIcon() {
      const self = this
      const divicons = this.divicons.filter((item) => {
        if (item === self.divicon) {
          return false
        }
        return true
      })
      this.$store.dispatch('olmap/changeDivIcons', divicons)
    },
    singleclickHandler(evt) {
      this.map.un('singleclick', this.singleclickHandler)
      this.$store.dispatch('olmap/changePopup', { popupShow: false, popupId: Math.random() })
    },
    mouseclickHandler(evt) { // 鼠标点击事件
      this.item.open = false
      this.addFlag = false
      if (this.measureTooltip) {
        this.map.removeOverlay(this.measureTooltip)
      }
      const coordinate = evt.coordinate
      const longitude = coordinate[0].toFixed(6)
      const latitude = coordinate[1].toFixed(6)
      this.divicons.lnglat = { lng: longitude, lat: latitude }
      this.divicons.iconLabelFlag = false
      this.divicons.type = 'stand'
      this.$store.dispatch('olmap/changeDivIcons', this.divicons)
      if (this.point) {
        this.olmap.MarkerVectorLayer.getSource().removeFeature(this.point)
        this.point = null
      }
      this.point = this.olmap._addIconMarkers({ longitude: longitude, latitude: latitude }, this.imagesObj.Red_Png_, this)
      this.map.un('pointermove', this.mousemoveHandler)
      this.map.un('click', this.mouseclickHandler)
      this.measureTooltip.setOffset([0, -20])
      this.map.addOverlay(this.measureTooltip)
      let address = ''
      OlMapLocalConfig.searchAddressByPoint({
        key: this.configObj.T_MAP_KEY,
        longitude: longitude,
        latitude: latitude
      }).then(res => {
        const result = res.result
        address = result.formatted_address
        this.measureTooltipElement.innerHTML = `<a href="#" title="删除" id="tool-bd-closer" class="tool-closer" xmlns="http://www.w3.org/1999/html"></a>
                                                    <div class="tool-bd-panle">
                                                             <div><span> 经度:</span> <e>${longitude}</e></div>
                                                             <div><span> 纬度:</span> <e>${latitude}</e></div>
                                                             <div><span> 地址：</span> <e>${address}</e></div>
                                                    </div>
                                                    <div class="tdt-infowindow-tip-container"><div class="tdt-infowindow-tip"></div></div>
                                                 `
        this.measureTooltip.setPosition(coordinate)
        const toolCloser = document.getElementsByClassName('tool-closer')
        if (toolCloser) {
          for (let i = 0; i < toolCloser.length; i++) {
            toolCloser[i].onclick = (e) => {
              this.clear()
            }
          }
        }
      })
    }
  }
}
</script>
