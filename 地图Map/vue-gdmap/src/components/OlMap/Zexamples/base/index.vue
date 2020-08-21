<template>
  <div class="ol-map">
    <ol-map ref="olMapBase" :layer-type="layerType" />
  </div>
</template>

<script>
export default {
  components: {
    OlMap: () => import('@/components/OlMap')
  },
  data() {
    return {
      layerType: 'TianDiTu_sichuan'
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
