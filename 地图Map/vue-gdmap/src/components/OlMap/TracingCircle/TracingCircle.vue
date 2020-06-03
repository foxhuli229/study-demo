<template>
  <div class="tracing-circle">
    <ol-map />
  </div>
</template>

<script>
export default {
  name: 'TracingCircle',
  components: {
    OlMap: () => import('@/components/OlMap')
  },
  props: {
    radius: { // 溯源半径 单位公里
      type: Number,
      default: 2
    },
    centre: {
      type: Object,
      default: () => {
        return {
          longitude: 101.62919700044,
          latitude: 26.6012720002
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tracing-circle{
  width: calc(100%);
  height: calc(100%);
}
</style>
