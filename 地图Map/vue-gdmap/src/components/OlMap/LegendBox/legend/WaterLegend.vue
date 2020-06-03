<template>
  <div class="water-legend">
    <template v-for="(item,index) in colorLegend" >
      <div :style="{'background-color': item.value}" :key="index">{{ item.name }}</div>
    </template>
  </div>
</template>

<script>
export default {
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
      return item.view === 'water-legend'
    })
    this.colorLegend = findVal.color
  }
}
</script>

<style lang="scss" scoped>
.water-legend{
  display: flex;
  >div{
    width:60px;
    height: 30px;
    margin-right: 5px;
    font-size:12px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    align-items: center;
    text-align: center;
    line-height: 30px;
  }
}
</style>
