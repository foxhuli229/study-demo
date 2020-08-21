<template>
  <div class="biao-zhu-legend">
    <ul>
      <li v-for="(item,index) in colorLegend" :key="index">
        <div class="border" :style="{'background-color': item.value}" />
        <div class="name">{{ item.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BiaoZhuLegend',
  data() {
    return {
      colorLegend: []
    }
  },
  computed: {
    legendView() {
      return this.$store.state.olmap.legendView
    }
  },
  mounted() {
    const findVal = this.legendView.find(item => {
      return item.view === 'biaozhu-legend'
    })
    this.colorLegend = findVal.color
  }
}
</script>

<style lang="scss" scoped>
.biao-zhu-legend{
  display: flex;
  height: 190px;
  width: 120px;
  background-color: #3b3b3b;
  color: white;
  font-size: 12px;
  ul{
    width: calc(100%);
    list-style-type: none;
    padding-left: 10px;
    padding-bottom: 10px;
    li{
      width: calc(100%);
      padding: 5px;
      >div{
        float: left;
      }
      .border{
        width: 20px;
        height: 20px;
        border: 2px solid white;
      }
      .name {
        width: calc(100% - 20px);
        line-height: 28px;
        padding-left: 10px;
      }
    }
  }
}

</style>
