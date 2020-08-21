<template>
  <div class="ol-map">
    <industry-distribution
      :industry-data="industryData"
      @handlerSingleClick="handlerSingleClick"
    >
      <template #IDPopup>
        <div style="width: 450px;height: 300px;">填充内容 填充自己的业务组件</div>
      </template>
    </industry-distribution>
  </div>
</template>

<script>
export default {
  components: {
    IndustryDistribution: () => import('@/components/OlMap/CustomMade/IndustryDistribution')
  },
  data() {
    return {
      industryData: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    handlerSingleClick(data) {
      // 拿到数据请求数据渲染弹窗
    },
    getData() {
      setTimeout(() => {
        this.industryData = [{ id: Math.random(), name: '一级警情', pointType: '0', longitude: 101.483248, latitude: 26.665437, value: 1 },
          { id: Math.random(), name: '二级警情', pointType: '0', longitude: 101.469797, latitude: 26.646842, value: 2 },
          { id: Math.random(), name: '二级警情', pointType: '0', longitude: 101.489023, latitude: 26.614071, value: 3 },
          { id: Math.random(), name: '四级警情', pointType: '0', longitude: 101.483187, latitude: 26.583703, value: 4 }]
      }, 500)
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
