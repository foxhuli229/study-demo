<!-- 分布图的图例 -->
<template>
  <div class="picture-control-legend">
    <template v-for="(item,index) in colorLegend">
      <div :key="index" class="t-item">
        <a href="javascript:;">
          <span class="com-icon tool-icon" :style="{'background-image': getImageUrl(item)}" />
          <span class="tool-text">
            {{ item.name }}
          </span>
        </a>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'PictureControlLegend',
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
      return item.view === 'picture-control-legend'
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
  .picture-control-legend{
    display: flex;
    position: relative;
    float: left;
    height: 38px;
    z-index: 999;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 4px rgba(75,83,102,0.08);
    opacity:1;
    border-radius:2px;
    .t-item {
      padding: 0 15px;
      position: relative;
      float: left;
    }
    .t-item > a {
      overflow: hidden;
      display: block;
    }
    .t-item:not(:last-child):after {
      content: '';
      display: block;
      visibility: visible;
      width: 1px;
      height: 21px;
      background: #e1e1e1;
      position: absolute;
      top: 7px;
      right: -1px;
    }
    .com-icon {
      display: inline-block;
      background-repeat: no-repeat;
      background-position: 0px 0px;
      background-size: 100% 100%;
      width: 25px;
      height: 25px;
    }
    .tool-icon {
      float: left;
      margin-right: 6px;
      margin-top: 6px;
    }
    .tool-text {
      float: left;
      font-size: 12px;
      font-style: normal;
      height: 34px;
      line-height: 38px;
      display: inline-block;
      color: #333;
    }
  }
</style>

