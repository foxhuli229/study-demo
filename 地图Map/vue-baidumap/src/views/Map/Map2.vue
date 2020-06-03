<!--
 * @Author: your name
 * @Date: 2020-05-26 10:03:35
 * @LastEditTime: 2020-05-27 14:35:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-baidumap\src\views\Map.vue
-->
<template>
  <div>
    <div class="title">
      <p>center位置：</p>
      经度：<input v-model.number="center.lng" /> 纬度：<input
        v-model.number="center.lat"
      />
      缩放比例：<input v-model.number="zoom" />
    </div>
    <hr>
    <div class="title">
      <p>定标位置：</p>
      经度：<input v-model.number="center.lng" /> 纬度：<input
        v-model.number="center.lat"
      />
      缩放比例：<input v-model.number="zoom" />
    </div>
     <hr>
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
      <!-- <bm-city-list
        anchor="BMAP_ANCHOR_TOP_RIGHT"
        @changeBefore="changeCityBefore"
        @changeAfter="changeCityAfter"
      ></bm-city-list> -->

      <!-- 全景 https://dafrok.github.io/vue-baidu-map/#/zh/control/panorama-->
      <!-- <bm-panorama anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-panorama> -->

      <!-- 自定义按钮 -->
      <!-- <bm-control
        anchor="BMAP_ANCHOR_TOP_RIGHT">
        <button @click="addZoom(19)">缩放至最大</button>
        <button @click="addZoom(10)">还原</button>
        <button @click="addZoom(3)">缩放至最小</button>
      </bm-control> -->

      <!-- 标记： https://dafrok.github.io/vue-baidu-map/#/zh/overlay/marker-->
      <bm-marker
        :position="labelPosition"
        :dragging="true"
        animation="BMAP_ANIMATION_DROP"
        :zoom="zoom"
        @mousedown="bmMousedown"
        @dragend="bmdragend"
        @click="infoWindowOpen"
      >
        <bm-label
          content="我在这里下定标"
          :labelStyle="{ color: 'red', fontSize: '12px' }"
          :offset="{ width: -35, height: 30 }"
        />
        <bm-info-window
          :show="show"
          @close="infoWindowClose"
          @open="infoWindowOpen"
          >我在这里哦</bm-info-window
        >
      </bm-marker>
      <!-- <bm-marker 
        class="d1"
        :position="labelPosition" 
        :zoom="zoom"
        dragging
        :zIndex="99999999"
        :gridSize="fontMarker"
        :title="'我家在这里哦！'"
        :labelStyle="{ color: 'red', fontSize: '12px',width: '35px', height: '35px' }"
        :icon="{url: img, size:{width: 30, height: 30, fontSize: '10px', color: 'red'}}"
        >
        </bm-marker> -->

        <!-- 自定义覆盖物 -->
         <my-overlay
            :position="{lng: 104.08, lat: 30.67994285}"
            text="点击我"
            :active="active"
            @mouseover.native="active = true"
            @mouseleave.native="active = false">
          </my-overlay>


    </baidu-map>
  </div>
</template>

<script>
import MyOverlay from '@/components/MyOverlay'
export default {
  components: {
    MyOverlay
  },
  data() {
    return {
      center: {
        //X轴值 经纬度。
        lng: 0,
        //Y轴值 经纬度。
        lat: 0,
      },
      //缩放比例
      zoom: 12,
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
      labelPosition: {
        lng: 0,
        lat: 0,
      },
      //标记文字
      show: true,
      img: require('../../icon/jinggao.png'),
      active: false
    };
  },
  mounted() {},
  methods: {
    //地图初始化
    handler({ BMap }) {
      let this_ = this;
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          this_.center = { lng: r.longitude, lat: r.latitude }; // 设置center属性值
          this_.labelPosition = { lng: r.longitude, lat: r.latitude }; // 设置label的属性值
          this_.show = true;
        },
        { enableHighAccuracy: true }
      );
    },
    /**
     * moving: 地图移动过程中触发此事件
     * moveend: 地图移动结束时触发事件
     * zoomend：地图更改缩放级别结束时触发此事件
     */
    syncCenterAndZoom(e) {
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
      this.zoom = level;
    },

    //鼠标在标注图上按下触发此事件
    bmMousedown({ type, target }) {
      console.log(type, target);
    },

    // 拖拽结束时触发此事件
    bmdragend({ type, target, pixel, point }) {
      console.log("拖拽结束时触发此事件");
      console.log(type, target, pixel, point);

      this.labelPosition.lng = point.lng;
      this.labelPosition.lat = point.lat;
    },

    //点击关闭标记弹框
    infoWindowClose() {
      this.show = false;
    },
    //点击打开标记弹框
    infoWindowOpen() {
      this.show = true;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  padding-top: 0;
  margin-top: 0;
}
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
  padding-bottom: 20px;

  &:first-of-type {
    padding-top: 20px;
  }
}

.fontMarker {
  font-size: 12px;
}

/* /deep/ .BMap_Marker img {
  width: 30px;
  height: 50px;
} */

</style>
