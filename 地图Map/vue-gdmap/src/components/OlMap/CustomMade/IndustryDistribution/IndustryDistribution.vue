<template>
  <div class="industry-distribution">
    <div class="header-bz">
      <div class="title">警情分布</div>
      <div class="opt">
        <full-screen2 />
      </div>
    </div>
    <div class="map-bz">
      <ol-map ref="olMapChildIndustry" @registerSingleClickEvent="mapSingleClickEvent">
        <!-- 图例 -->
        <template #legend>
          <legend-box :view-legend="viewLegend" :left-x="0.5" :left-b="1" />
        </template>
        <template #popup2>
          <div v-if="$slots.IDPopup" slot="IDPopup">
            <slot name="IDPopup" />
          </div>
        </template>
        <template #box>
          <zoom-in-out :location="locationInOut" />
        </template>
      </ol-map>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndustryDistribution',
  components: {
    OlMap: () => import('@/components/OlMap'),
    FullScreen2: () => import('@/components/OlMap/ToolContainer/FullScreen2.vue'),
    LegendBox: () => import('@/components/OlMap/LegendBox'),
    ZoomInOut: () => import('@/components/OlMap/ZoomInOut'),
  },
  props: {
    industryData: {
      type: Array,
      default: () => {
        return [
          { id: Math.random(), name: '一级警情', pointType: '0', longitude: 101.483248, latitude: 26.665437, value: 1 },
          { id: Math.random(), name: '二级警情', pointType: '0', longitude: 101.469797, latitude: 26.646842, value: 2 },
          { id: Math.random(), name: '二级警情', pointType: '0', longitude: 101.489023, latitude: 26.614071, value: 3 },
          { id: Math.random(), name: '四级警情', pointType: '0', longitude: 101.483187, latitude: 26.583703, value: 4 }
        ]
      }
    }
  },
  data() {
    return {
      locationInOut: {
        right: '20px',
        bottom: '10px'
      },
      viewLegend: 'industry-legend',
      markerArray: []
    }
  },
  computed: {
    legendView() {
      return this.$store.state.olmap.legendView
    },
    colorLegend() {
      const findVal = this.legendView.find(item => {
        return item.view === this.viewLegend
      })
      return findVal.color
    },
    olmap() {
      return this.$store.state.olmap.olmap
    }
  },
  watch: {
    industryData: {
      handler: function(newVal, oldVal) {
        if (this.markerArray.length > 0) {
          this.olmap._clearMarker(this.markerArray) // 清除点位
        }
        this.addMarker(newVal)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getImgaeUrl(data) {
      const findVal = this.colorLegend.find(item => {
        return item.code === data.value
      })
      return findVal.value
    },
    addMarker(data) {
      data.forEach((item, index) => {
        const marker = this.olmap._addIconMarkersScale(item, this.getImgaeUrl(item), 1, this)
        this.markerArray.push(marker)
      })
    },
    mapSingleClickEvent(data) {
      this.$emit('handlerSingleClick', data)
      // 开启Popup
      this.$store.dispatch('olmap/changePopup', { popupShow: true, popupId: data.id, popupName: data.name, datas: data })
    }
  }
}
</script>

<style lang="scss" scoped>
  .industry-distribution {
    width: 100%;
    height: 100%;
    .header-bz{
      position: absolute;
      top: 0;
      left:0;
      background-color: white;
      width: calc(100%);
      height: 38px;
      z-index: 999;
      .title{
        line-height: 38px;
        float: left;
        margin-left: 10px;
      }
      .opt{
        line-height: 38px;
        float: right;
        margin-right: 10px;
      }
    }
    .map-bz{
      position: absolute;
      top: 0;
      left:0;
      width: calc(100%);
      height: calc(100%);
    }
  }
</style>
