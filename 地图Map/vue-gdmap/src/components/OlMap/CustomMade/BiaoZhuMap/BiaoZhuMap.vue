<template>
  <div class="biao-zhu-map">
    <div class="header-bz">
      <div class="title">企业标注</div>
      <div class="opt">
        <el-button type="primary" size="mini" icon="el-icon-download" @click="downloadMapByPDF">导出PDF</el-button>
      </div>
    </div>
    <div class="map-bz">
      <ol-map ref="olMapChildBZ">
        <template #popup2>
          <div v-if="$slots.BzPopup" slot="BzPopup">
            <slot name="BzPopup" />
          </div>
        </template>
        <!-- 图例 -->
        <template #legend>
          <legend-box :view-legend="viewLegend" :left-x="0.5" :left-b="5" />
        </template>
        <template #toolContainer>
          <tool-container #box>
            <full-screen2 />
          </tool-container>
        </template>
        <template #box>
          <zoom-in-out :location="locationInOut" />
        </template>
      </ol-map>
      <layers-box :current-index="1" :expand="false" :show-box="false" :bottom="10" :left="10" />
    </div>
  </div>
</template>

<script>
import { toJpeg } from 'html-to-image'
import jsPDF from 'jspdf'
export default {
  name: 'BiaoZhuMap',
  components: {
    OlMap: () => import('@/components/OlMap'),
    LayersBox: () => import('@/components/OlMap/LayersBox'),
    LegendBox: () => import('@/components/OlMap/LegendBox'),
    ToolContainer: () => import('@/components/OlMap/ToolContainer'),
    FullScreen2: () => import('@/components/OlMap/ToolContainer/FullScreen2.vue'),
    ZoomInOut: () => import('@/components/OlMap/ZoomInOut')
  },
  props: {
    bzData: {
      type: Array,
      default: () => {
        return [
          { id: Math.random(), name: '锅炉废气排放-重大风险源', longitude: 101.503389, latitude: 26.628061, value: 1 },
          { id: Math.random(), name: '锅炉废气排放-较大风险源', longitude: 101.559996, latitude: 26.610565, value: 2 },
          { id: Math.random(), name: '锅炉废气排放-一般风险源', longitude: 101.638081, latitude: 26.585796, value: 3 },
          { id: Math.random(), name: '锅炉废气排放-重大危险源', longitude: 101.576987, latitude: 26.597119, value: 4 },
          { id: Math.random(), name: '锅炉废气排放-废气排放口', longitude: 101.465407, latitude: 26.641939, value: 5 },
          { id: Math.random(), name: '锅炉废气排放-废水排放口', longitude: 101.483946, latitude: 26.587195, value: 6 }
        ]
      }
    }
  },
  data() {
    return {
      viewLegend: 'biaozhu-legend', // 图例
      locationInOut: {
        right: '20px',
        bottom: '50px'
      },
      overlayMarker: [],
      overlayPopup: null
    }
  },
  computed: {
    map() {
      return this.$store.state.olmap.olmap.map
    },
    olmap() {
      return this.$store.state.olmap.olmap
    },
    legendView() {
      return this.$store.state.olmap.legendView
    },
    legendColor() {
      const findVal = this.legendView.find(item => {
        return item.view === this.viewLegend
      })
      return findVal.color
    },
    popup() {
      return this.$store.state.olmap.popup
    }
  },
  watch: {
    bzData: {
      handler(newVal, oldVAL) {
        this._addOverlayMarker(newVal)
      },
      deep: true
    }
  },
  mounted() {
    setTimeout(() => {
      this._addOverlayMarker(this.bzData)
    }, 500)
  },
  methods: {
    _addOverlayMarker(val) {
      this.olmap._clearOverlay(this.overlayMarker)
      val.forEach((item, index) => {
        const bColor = this._MarkerColor(item.value)
        const overlay = this.olmap._createMarkerAnimation(item, 'css_overlay_tetragonum', '', [-15, -15], 15, 15, bColor, this.singleMarker)
        this.overlayMarker.push(overlay)
      })
    },
    singleMarker(data) {
      this.$emit('handlerSingleClick', data)
      const zoom = this.olmap.map.getView().getZoom()
      const coordinates = [data.longitude, data.latitude]
      const overlayPopup = this.$refs['olMapChildBZ'].overlayPopup
      overlayPopup.setPosition(coordinates)
      this.map.addOverlay(overlayPopup)
      const pixel = this.map.getPixelFromCoordinate(coordinates)
      const coordinateFrom = this.map.getCoordinateFromPixel([pixel[0] + 200, pixel[1] - 100])
      this.olmap._setZoom(zoom, coordinateFrom) // 设置中心点
      this.$store.dispatch('olmap/changePopup', { popupShow: true, popupId: data.id, popupName: data.name, datas: data })
    },
    _MarkerColor(value) {
      const findVal = this.legendColor.find(item => {
        return item.code === value
      })
      return findVal.value
    },
    downloadMapByPDF() {
      document.body.style.cursor = 'progress'
      const dims = {
        a0: [1189, 841],
        a1: [841, 594],
        a2: [594, 420],
        a3: [420, 297],
        a4: [297, 210],
        a5: [210, 148]
      }
      const exportOptions = {
        filter: (element) => {
          return element.className ? element.className.indexOf('ol-control') === -1 : true
        }
      }
      const format = 'a3'
      const dim = dims[format]
      this.map.renderSync()
      this.map.once('rendercomplete', (val) => {
        toJpeg(this.map.getTargetElement(), exportOptions).then((dataUrl) => {
          /*eslint-disable */
          let pdf = jsPDF('landscape', undefined, format);
          pdf.addImage(dataUrl, 'JPEG', 0, 0, dim[0], dim[1]);
          pdf.save('map.pdf');
          document.body.style.cursor = 'auto'
        });
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .biao-zhu-map {
    width: 100%;
    height: 100%;
    .header-bz{
      width: calc(100%);
      height: 38px;
      .title{
        line-height: 38px;
        float: left;
      }
      .opt{
        line-height: 38px;
        float: right;
      }
    }
    .map-bz{
      width: calc(100%);
      height: calc(100% - 38px);
    }
  }
</style>
