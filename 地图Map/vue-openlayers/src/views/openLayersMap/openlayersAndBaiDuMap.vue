<!--
 * @Author: your name
 * @Date: 2020-06-04 15:06:57
 * @LastEditTime: 2020-06-04 15:12:05
 * @LastEditors: Please set LastEditors
 * @Description: openlayes结合百度地图API实现定位功能
 * @FilePath: \vue-openlayers\src\views\openLayersMap\openlayersAndBaiDuMap.vue
-->
<template>
  <div>
    <div ref="map" class="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.mapint();
  },
  methods: {
    mapint() {
        
    },
  },
};
</script>

<style>
.map {
  height: 400px;
  width: 800px;
}
</style>
