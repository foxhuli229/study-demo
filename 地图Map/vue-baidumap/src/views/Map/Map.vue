<!--
 * @Author: your name
 * @Date: 2020-05-26 10:03:35
 * @LastEditTime: 2020-05-26 17:06:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-baidumap\src\views\Map.vue
-->
<template>
  <div>
    <div class="title">
      经度：<input v-model.number="center.lng" /> 纬度：<input
        v-model.number="center.lat"
      />
      缩放比例：<input v-model.number="zoom" />
    </div>
    <baidu-map
      class="map"
      :center="center"
      :zoom="zoom"
      scroll-wheel-zoom
      @ready="handler"
      @moving="syncCenterAndZoom"
      @moveend="syncCenterAndZoom"
      @zoomend="syncCenterAndZoom"
    >
      <!-- 比例尺 https://dafrok.github.io/vue-baidu-map/#/zh/control/scale-->
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>

      <!-- 缩放控件：https://dafrok.github.io/vue-baidu-map/#/zh/control/navigation -->
      <!-- anchor="BMAP_ANCHOR_TOP_LEFT" 将控件定位到地图的左上角 -->
      <bm-navigation
        anchor="BMAP_ANCHOR_BOTTOM_LEFT"
        type="BMAP_NAVIGATION_CONTROL_LARGE"
        showZoomInfo
        enableGeolocation
      ></bm-navigation>

      <!-- 地图类型 地图、混合：https://dafrok.github.io/vue-baidu-map/#/zh/control/map-type -->
      <bm-map-type
        :mapTypes="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>

      <!-- 缩略图控件：https://dafrok.github.io/vue-baidu-map/#/zh/control/overview-map -->
      <bm-overview-map
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :isOpen="true"
      ></bm-overview-map>

      <!-- 定位按钮 https://dafrok.github.io/vue-baidu-map/#/zh/control/geolocation-->
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
        @locationSuccess="locationSuccess"
        @locationError="locationError"
      ></bm-geolocation>

      <!-- 城市列表：https://dafrok.github.io/vue-baidu-map/#/zh/control/city-list -->
      <bm-city-list
        anchor="BMAP_ANCHOR_TOP_RIGHT"
        @changeBefore="changeCityBefore"
        @changeAfter="changeCityAfter"
      ></bm-city-list>

      <!-- 全景 https://dafrok.github.io/vue-baidu-map/#/zh/control/panorama-->
      <bm-panorama anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-panorama>

      <!-- 自定义按钮 -->
      <bm-control class="bmContrClass" anchor="BMAP_ANCHOR_TOP_RIGHT">
        <button @click="addZoom(19)">缩放至最大</button>
        <button @click="addZoom(10)">还原</button>
        <button @click="addZoom(3)">缩放至最小</button>

      </bm-control>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      center: {
        //X轴值 经纬度。
        lng: 0,
        //Y轴值 经纬度。
        lat: 0,
      },
      //缩放比例
      zoom: 3,
      //自定义样式
      // :mapStyle="mapStyle"
      mapStyle: {
        styleJson: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: {
              hue: "#007fff",
              saturation: 89,
            },
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: {
              color: "#ffffff",
            },
          },
        ],
      },
    };
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 104.072745;
      this.center.lat = 30.578994;
      this.zoom = 12;
    },
    syncCenterAndZoom(e) {
      // console.log(e);

      const { lng, lat } = e.target.getCenter();
      this.center.lng = lng;
      this.center.lat = lat;
      this.zoom = e.target.getZoom();
    },

    //定位成功
    locationSuccess(point) {
      console.log("定位成功！");
      console.log(point);
    },

    //定位失败
    locationError(StatusCode) {
      console.log("定位失败");
      console.log(StatusCode);
    },

    //点击切换城市控件前
    changeCityBefore() {
      console.log("点击切换城市控件前");
    },

    //点击切换城市控件后
    changeCityAfter() {
      console.log("点击切换城市控件后");
    },

    // 缩放至最大、还原、缩放至最小
    addZoom(level) {
      console.log(typeof level);
      this.zoom = level;
      console.log(this.zoom);
    },

   
  },
};
</script>

<style lang="scss" scoped>
.map {
  width: 700px;
  height: 550px;
  border: #ccc solid 1px;
  font-size: 12px;
}

.bml {
  width: 700px;
  height: 550px;
  margin-top: 40px;
}
.title {
  padding: 20px 0;
}
.bmContrClass {
  display: flex;
  flex-direction: column;
  margin: 45px 10px 0 0;
}
.bmContrClass button {
  margin-bottom: 5px;
  padding: 10px;
  background-color: #fff;
  border: none;
  font-size: 12px;
  cursor: pointer;
}
.bmContrClass button:hover {
  color: #3b93ff;
}
</style>
