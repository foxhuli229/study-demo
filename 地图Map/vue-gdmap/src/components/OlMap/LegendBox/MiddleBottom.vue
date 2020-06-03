<template>
  <div class="middle-bottom" :style="{left: leftLocation, bottom: bottomLocation}">
    <div v-if="$slots.legend" slot="legend">
      <slot name="legend" />
    </div>
    <component :is="currentView" v-else />
  </div>
</template>

<script>
export default {
  name: 'MiddleBottom',
  components: {
    'enter-legend': () => import('./legend/EnterLegend'),
    'air-legend': () => import('./legend/AirLegend'),
    'water-legend': () => import('./legend/WaterLegend'),
    'noise-legend': () => import('./legend/NoiseLegend'),
    'soil-legend': () => import('./legend/SoilLegend'),
    'biaozhu-legend': () => import('./legend/BiaoZhuLegend'),
    'industry-legend': () => import('./legend/IndustryLegend'),
    'distribution-legend': () => import('./legend/DistributionLegend'),
    'picture-control-legend': () => import('./legend/PictureControlLegend')
  },
  props: {
    leftX: {
      type: Number,
      default: 35
    },
    leftB: {
      type: Number,
      default: 2
    },
    viewLegend: {
      type: String,
      default: 'air-legend'
    }
  },
  data() {
    return {
      leftLocation: this.leftX + '%',
      bottomLocation: this.leftB + '%'
    }
  },
  computed: {
    legendView() {
      return this.$store.state.olmap.legendView
    },
    currentView() {
      let view = ''
      this.legendView.forEach((item) => {
        if (item.show) {
          view = item.view
        }
      })
      return view
    },
    topTypeClick() {
      return this.$store.state.olmap.topTypeClick
    }
  },
  watch: {
    viewLegend(val) {
      this.$nextTick(() => {
        this.$store.dispatch('olmap/changeLegendView', { view: val, show: true })
      })
    },
    topTypeClick(val) {
      this.destroyLegend()
      this.$store.dispatch('olmap/changeLegendView', { view: val.component, show: true })
    }
  },
  beforeDestroy() {
    this.destroyLegend()
  },
  mounted() {
    this.$store.dispatch('olmap/changeLegendView', { view: this.viewLegend, show: true })
  },
  methods: {
    destroyLegend() {
      this.legendView.forEach((item) => {
        item.show = false
      })
      this.$store.dispatch('olmap/changeLegendViewAll', this.legendView)
    }
  }
}
</script>

<style lang="scss" scoped>
.middle-bottom{
  position: absolute;
  width: auto;
  height: auto;
  transition: left .5s ease;
  z-index: 998;
  border-collapse: separate;
}
@media screen and (max-width: 1366px) {
  .middle-bottom{
    position: absolute;
    width: auto;
    height: auto;
    transition: left .5s ease;
    z-index: 998;
    border-collapse: separate;
  }
}
</style>
