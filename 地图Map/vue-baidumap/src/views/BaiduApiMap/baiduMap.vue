<!--
 * @Author: your name
 * @Date: 2020-06-08 09:17:20
 * @LastEditTime: 2020-06-08 10:38:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \地图Map\vue-baidumap\src\views\Map\baiduMapApi.vue
-->
<template>
  <div>
    <div class="el-div">
      center 位置 经度：<el-input
        v-model="center.lng"
        placeholder="请输入内容"
        style="width: 200px"
      ></el-input>
      纬度：<el-input
        v-model="center.lat"
        placeholder="请输入内容"
        style="width: 200px"
      ></el-input>
      比例尺:
      <el-input
        v-model="zoom"
        placeholder="请输入内容"
        style="width: 200px"
      ></el-input>
    </div>
    <div id="allmap"></div>
  </div>
</template>

<script>
import BMap from "BMap";
export default {
  data() {
    return {
      //缩放比例
      zoom: 12,
      center: {
        //X轴值 经纬度。
        lng: 104.075796,
        //Y轴值 经纬度。
        lat: 30.659684,
      },
    };
  },
  mounted() {
    this.mapint();
  },
  methods: {
    mapint() {
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(this.center.lng, this.center.lat);
      map.centerAndZoom(point, this.zoom);
      map.addControl(new BMap.MapTypeControl());
      map.enableScrollWheelZoom(true);
      map.enableDoubleClickZoom(true);
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
    },
  },
};
</script>

<style scoped>
#allmap {
  width: 100%;
  height: 500px;
}
.el-div {
  margin-bottom: 20px;
}
</style>
