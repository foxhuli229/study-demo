<template>
  <div class="industry-legend">
    <template v-for="(item,index) in colorLegend">
      <div :key="index" class="bix">
        <div class="image" :style="{'background-image': getImageUrl(item)}" />
        <div class="name">{{ item.name }}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'IndustryLegend',
  data() {
    return {
      colorLegend: []
    }
  },
  computed: {
    legendView() {
      return this.$store.state.olmap.legendView
    },
    configObj() {
      return this.$store.state.olmap.configObj
    }
  },
  mounted() {
    const findVal = this.legendView.find(item => {
      return item.view === 'industry-legend'
    })
    this.colorLegend = findVal.color
  },
  methods: {
    getImageUrl(item) {
      const olmapUrl = this.configObj.olmapUrl
      return `url(${olmapUrl}${item.value})`
    }
  }

}
</script>

<style lang="scss" scoped>
  .industry-legend{
    display: flex;
    .bix{
      >div{
        float: left;
      }
      .image{
        width: 25px;
        height: 25px;
        background-repeat: no-repeat;
        background-position: 0px 0px;
        background-size: 100% 100%;
      }
      .name {
        line-height: 35px;
        padding-left: 0px;
        padding-right: 15px;
        font-weight: bold;
        font-size: 16px;
        color: #333333;
      }
    }
  }
</style>

