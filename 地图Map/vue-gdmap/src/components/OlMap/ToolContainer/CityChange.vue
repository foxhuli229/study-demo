<template>
  <div v-show="show" class="t-item city-change">
    <!--天气-->
    <weather />
    <a href="javascript:;" class="city-change-inner">
      <span>{{name}}</span>
    </a>
  </div>
</template>
<script>
export default {
  name: 'CityChange',
  components: {
    Weather: () => import('./Weather.vue')
  },
  computed: {
    name() {
      return this.$store.state.olmap.currentCity.NAME
    },
    show() {
      return this.$store.state.olmap.currentCity.SHOW
    }
  }
}
</script>
<style scoped>
  .city-change-inner {
    float: left;
    display: inline-block;
    height: 34px;
    line-height: 38px;
    background-color: #fff;
    color: #666;
    font-size: 12px;
    text-decoration: none;
    vertical-align: middle;
    position: relative;
  }
  .city-change-inner span {
    font-size: 12px;
    float: left;
  }
</style>
