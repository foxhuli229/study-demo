<template>
  <div class="ol-map">
    <watershed-risk-analysis
      @singleClick="handlerSingleClick"
      @searchMethod="handlerSearchMethod"
    />
  </div>
</template>

<script>
export default {
  components: {
    WatershedRiskAnalysis: () => import('@/components/OlMap/CustomMade/WatershedRiskAnalysis')
  },
  methods: {
    handlerSingleClick(data) {
      // 拿到数据，查询并填充自己的组件
      console.log('拿到数据，查询并填充自己的组件')
      // 返回的数据里里面包含了颜色值
      console.log(data)
    },
    handlerSearchMethod(obj) {
      // 搜索的查询参数
      console.log('搜索的查询参数' + obj)
      this.listBox = [
        { id: Math.random(), name: '111', pointType: '11', longitude: 101.493529, latitude: 26.666813, value: 1 },
        { id: Math.random(), name: '211', pointType: '9', longitude: 101.520651, latitude: 26.648118, value: 1 },
        { id: Math.random(), name: '311', pointType: '9', longitude: 101.547430, latitude: 26.648118, value: 1 },
        { id: Math.random(), name: '411', pointType: '8', longitude: 101.547430, latitude: 26.614317, value: 1 },
        { id: Math.random(), name: '511', pointType: '10', longitude: 103.746681, latitude: 29.556511, value: 1 },
        { id: Math.random(), name: '611', pointType: '9', longitude: 103.746591, latitude: 29.556521, value: 1 },
        { id: Math.random(), name: '711', pointType: '6', longitude: 103.746491, latitude: 29.556321, value: 1 },
        { id: Math.random(), name: '81111', pointType: '5', longitude: 103.746391, latitude: 29.556121, value: 1 }
      ]
      this.$store.dispatch('olmap/changeSideBarViewData', { data: { 'list-box-image': this.listBox }, total: 4 })
    }
  }
}
</script>

<style lang="scss" scoped>
.ol-map{
  position: relative;
  padding: 0;
  overflow: hidden;
  width: calc(100%);
  height: calc(100%);
}
</style>
