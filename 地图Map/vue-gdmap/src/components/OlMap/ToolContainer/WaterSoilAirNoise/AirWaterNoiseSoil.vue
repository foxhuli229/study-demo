<template>
  <!--大气环境 ，水环境， 噪声环境， 土壤环境-->
  <div class="t-item-box">
    <template v-for="(item, index) in topToolType">
      <div v-show="item.show" :key="index" class="t-item-awns" :class="{activebg:[item.id] == topTypeClick.id}">
        <a href="javascript:;" @click="changeTopTypeClick(item)">
          <span class="tool-text">{{ item.name }}</span>
        </a>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AirWaterNoiseSoil',
  computed: {
    topToolType() {
      return this.$store.state.olmap.topToolType
    },
    topTypeClick() {
      return this.$store.state.olmap.topTypeClick
    }
  },
  methods: {
    changeTopTypeClick(item) {
      this.$store.dispatch('olmap/changeTopTypeClick', item)
    }
  }
}
</script>

<style lang="scss" scoped>
  .t-item-box{
    padding: 0;
    position: relative;
    float: left;
  }
  .t-item-awns {
    padding: 0px 25px 0px 25px;
    position: relative;
    float: left;
    color: #333;
    &.activebg{
      background:rgba(19,153,248,1);
      opacity:1;
      border-radius:4px;
      .tool-text{
        color: #ffffff;
      }
    }
  }
  .t-item-awns > a {
    overflow: hidden;
    display: block;
  }
  .t-item-awns:not(:last-child):after {
    content: '';
    display: block;
    visibility: visible;
    width: 1px;
    height: 21px;
    background: #eee;
    position: absolute;
    top: 7px;
    right: -1px;
  }
</style>
