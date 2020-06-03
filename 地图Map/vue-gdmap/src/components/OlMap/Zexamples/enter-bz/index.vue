<template>
  <div class="ol-map">
    <biao-zhu-map :bz-data="biaoZhuData" @handlerSingleClick="handlerSingleClick">
      <template #BzPopup>
        <div style="width: 450px;height: 300px;">填充内容 填充自己的业务组件</div>
      </template>
    </biao-zhu-map>
  </div>
</template>

<script>
export default {
  name: 'EnterBz',
  components: {
    BiaoZhuMap: () => import('@/components/OlMap/CustomMade/BiaoZhuMap')
  },
  props: {
    enterpriseId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      biaoZhuData: [
        { id: Math.random(), name: '锅炉废气排放-重大风险源', longitude: 101.503389, latitude: 26.628061, value: 1 },
        { id: Math.random(), name: '锅炉废气排放-较大风险源', longitude: 101.559996, latitude: 26.610565, value: 2 },
        { id: Math.random(), name: '锅炉废气排放-一般风险源', longitude: 101.638081, latitude: 26.585796, value: 3 },
        { id: Math.random(), name: '锅炉废气排放-重大危险源', longitude: 101.576987, latitude: 26.597119, value: 4 },
        { id: Math.random(), name: '锅炉废气排放-废气排放口', longitude: 101.465407, latitude: 26.641939, value: 5 },
        { id: Math.random(), name: '锅炉废气排放-废水排放口', longitude: 101.483946, latitude: 26.587195, value: 6 }
      ]
    }
  },
  methods: {
    handlerSingleClick(val) {
      // 拿到数据，查询并填充自己的组件
      console.log(val)
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
