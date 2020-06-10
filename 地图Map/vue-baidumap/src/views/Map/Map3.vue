<!--
 * @Author: your name
 * @Date: 2020-05-26 10:03:35
 * @LastEditTime: 2020-06-09 18:05:38
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
    <div class="title">
      <p>定标位置：</p>
      经度：<input v-model.number="initPosition.lng" /> 纬度：<input
        v-model.number="initPosition.lat"
      />
      缩放比例：<input v-model.number="initzoom" />
    </div>
    <hr />

    <!-- :mapStyle="mapstyleJson" -->
    <baidu-map
      :center="center"
      :zoom="zoom"
      :minZoom="8"
      scroll-wheel-zoom
      @ready="handler"
      @moving="syncCenterAndZoom"
      @moveend="syncCenterAndZoom"
      @zoomend="syncCenterAndZoom"
    >
      <bm-view class="map" style="flex: 1"></bm-view>
      <!-- 缩放控件：https://dafrok.github.io/vue-baidu-map/#/zh/control/navigation -->
      <!-- <bm-navigation
        anchor="BMAP_ANCHOR_BOTTOM_LEFT"
        type="BMAP_NAVIGATION_CONTROL_LARGE"
        showZoomInfo
        enableGeolocation
      ></bm-navigation> -->

      <!-- 地图类型 地图、混合：https://dafrok.github.io/vue-baidu-map/#/zh/control/map-type -->
      <bm-map-type
        :mapTypes="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
      ></bm-map-type>

      <!-- 定位按钮 https://dafrok.github.io/vue-baidu-map/#/zh/control/geolocation-->
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
        @locationSuccess="locationSuccess"
        @locationError="locationError"
      ></bm-geolocation>

      <!-- 标记： https://dafrok.github.io/vue-baidu-map/#/zh/overlay/marker
        :icon="typeof item.icon != 'undefined' && item.icon != '' ? item.icon : ''"
      -->
      <bm-marker
        v-for="(item, index) in iconItem"
        :key="index"
        :icon="
          typeof item.icon != 'undefined' && item.icon != '' ? item.icon : ''
        "
        :position="item.position"
        :dragging="item.dragging"
        animation="BMAP_ANIMATION_DROP"
        :zoom="zoom"
        @mousedown="bmMousedown"
        @click="infoWindowOpen(index)"
      >
        <bm-label
          :content="item.content"
          :title="item.title"
          :labelStyle="item.labelStyle"
          :offset="{ width: -35, height: 30 }"
        />
        <template v-if="typeof item.icon != 'undefined' && item.icon == ''">
          <bm-info-window
            :show="show"
            @close="infoWindowClose(index)"
            @open="infoWindowOpen(index)"
            >{{ item.winInfo }}
          </bm-info-window>
        </template>
      </bm-marker>

      <!-- 自定义控件 - 指南针 -->
      <bm-control class="compass" anchor="BMAP_ANCHOR_TOP_LEFT">
        <div class="compass_div">
          <button
            title="逆时针转动"
            class="compass_btn1"
            @click="compassClick"
          ></button>
          <button
            itemid="恢复正北方向"
            class="compass_btn2"
            @click="compassClick"
          ></button>
          <button
            title="顺时针转动"
            class="compass_btn3"
            @click="compassClick"
          ></button>
        </div>
      </bm-control>

      <!-- 自定义控件-搜索 -->
      <bm-control :offset="{ width: '10px', height: '10px' }">
        <bm-auto-complete v-model="keyword" :sugStyle="{ zIndex: 1 }">
          <el-input
            class="search_Class"
            v-model="keyword"
            placeholder="请输入内容"
          ></el-input>
        </bm-auto-complete>
      </bm-control>
      <bm-local-search
        :keyword="keyword"
        :auto-viewport="true"
        style="display: none"
      ></bm-local-search>

      <!-- 自定义控件 栏目 -->
      <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT">
        <div class="zhibiaoNum">dd</div>
        <div class="zhibiaoNum">dd</div>
      </bm-control>

      <!-- 自定义控件 按钮 -->
      <bm-control anchor="BMAP_ANCHOR_BOTTOM_LEFT" :offset="{ left: '600px' }">
        <div class="bot_btn">
          <div style="background: #fff; color: #000;" @click="initPositionMet">
            还原
          </div>
          <div style="background-color: rgb(43, 207, 41);">优</div>
          <div style="background-color: rgb(255, 210, 2);">良</div>
          <div style="background-color: rgb(199, 15, 15);">污染</div>
        </div>
      </bm-control>
    </baidu-map>
  </div>
</template>

<script>
const mapstyleJson = require("../../../public/static/custom_map_config");
import { Loading } from "element-ui";

export default {
  components: {},
  data() {
    return {
      //缩放比例
      zoom: 12,
      center: {
        //X轴值 经纬度。
        lng: 0,
        //Y轴值 经纬度。
        lat: 0,
      },

      //默认初始化的地图数据
      initPosition: {
        lng: 104.06792346,
        lat: 30.67994285,
      },
      initzoom: 12,
      //地图样式
      mapstyleJson: {
        styleJson: mapstyleJson,
      },

      //图标
      iconItem: [
        {
          position: {
            lng: 104.071451,
            lat: 30.59031,
          },
          icon: {
            url:
              "http://192.168.0.201:8855//uploadFiles/202006/20200609142043316.png",
            size: { width: 30, height: 30 },
          },
          dragging: false,
          content: "宏伟汽修 68",
          title: "宏伟汽修 68",
          show: true,
          labelStyle: {
            background: "rgba(199, 15, 15, 0.7)",
            color: "#ffffff",
            textAlign: "center",
            padding: "5px 15px",
            position: "absolute",
            border: "2px solid #ffffff",
            fontsize: "15px",
          },
          winInfo: "宏伟汽修-超标了",
        },
        {
          position: { lng: 103.85923, lat: 30.613271 },
          icon: {
            url: "http://api0.map.bdimg.com/images/marker_red_sprite.png",
            size: { width: 30, height: 30 },
          },
          dragging: false,
          content: "弘基木业 77",
          title: "弘基木业 77",
          show: false,
          labelStyle: {
            background: "rgba(43, 207, 41, 0.7)",
            color: "#ffffff",
            textAlign: "center",
            padding: "5px 15px",
            position: "absolute",
            border: "2px solid #ffffff",
            fontsize: "15px",
          },
          winInfo: "弘基木业-超标了",
        },

      ],
      show: true,

      //搜索
      keyword: "",

      loadingInstance: "",
    };
  },
  mounted() {
    this.loadingInstance = Loading.service({
      lock: true,
      text: "加载中……",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
  },
  destroyed() {
    this.distanceTool && this.distanceTool.close();
  },
  methods: {
    //地图初始化
    handler({ BMap }) {
      let this_ = this;
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          this_.center = { lng: r.longitude, lat: r.latitude }; // 设置center属性值
          this_.initPosition = { lng: r.longitude, lat: r.latitude }; // 设置label的属性值
          for(let i=0; i<this_.iconItem; i++) {
            this_.iconItem[i].show = true
          }

          console.log(this_.iconItem);

        },
        { enableHighAccuracy: true }
      );
      this.loadingInstance.close();
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

    //鼠标在标注图上按下触发此事件
    bmMousedown({ type, target }) {
      // console.log(type, target);
    },

    //点击关闭标记弹框
    infoWindowClose(index) {
      console.log("infoWindowClose", index);
      this.iconItem[index].show = false;
    },
    //点击打开标记弹框
    infoWindowOpen(index) {
      console.log("infoWindowOpen", index);
      console.log(this.iconItem);
      console.log(this.iconItem[index]);

      this.iconItem[index].show = true;
    },

    /**
     * 指南针
     */
    compassClick() {
      console.log("点击了指南针");
    },

    //还原按钮
    initPositionMet() {
      this.center = { ...this.initPosition };
      this.zoom = this.initzoom;
    },
  },
};
</script>

<style lang="scss" scoped>
.map {
  width: 100vw;
  height: 76vh;
  overflow-x: hidden;
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

.compass {
  margin-top: 50px;

  .compass_div {
    position: absolute;
    z-index: 5;
    top: 0px;
    left: 0px;
    width: 52px;
    height: 54px;
    background: url(https://webmap0.bdimg.com/image/api/earth-navi-control-pc4.png)
      0% 0% / 266px no-repeat;

    .compass_btn1 {
      position: absolute;
      outline: none;
      border: none;
      background: url(//webmap0.bdimg.com/image/api/earth-navi-control-pc4.png) -75px -5px /
        266px no-repeat;
      cursor: pointer;
      left: 2px;
      top: 5px;
      z-index: 1;
      width: 15px;
      height: 42px;
      opacity: 1;
    }

    .compass_btn2 {
      position: absolute;
      outline: none;
      border: none;
      background: url(https://webmap0.bdimg.com/image/api/earth-navi-control-pc4.png) -56px -4px /
        266px no-repeat;
      cursor: pointer;
      left: 19px;
      top: 4px;
      width: 14px;
      height: 44px;
      transform: rotate(0deg);
      opacity: 1;
    }

    .compass_btn3 {
      position: absolute;
      outline: none;
      border: none;
      background: url(https://webmap0.bdimg.com/image/api/earth-navi-control-pc4.png) -75px -5px /
        266px no-repeat;
      cursor: pointer;
      right: 2px;
      top: 5px;
      z-index: 1;
      width: 15px;
      height: 42px;
      transform: scaleX(-1);
      opacity: 1;
    }
  }
}

.search_Class {
  margin: 10px 10px;
}

.zhibiaoNum {
  display: inline-block;
  box-sizing: border-box;
  width: 150px;
  height: 120px;
  margin-left: 20px;
  border: 2px solid #ffffff;
  border-radius: 20px;
  background-color: rgba(0, 78, 185, 0.16);
}

.sample {
  width: auto;
  background: rgba(0, 0, 0, 0.5);
  /* overflow: hidden; */
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
  border: 3px solid #ffffff;
}

/* 自定义控件- 按钮样式 */
.bot_btn {
  display: flex;
  margin: 0 auto;
  text-align: center;
  margin-left: 45vw;
  margin-bottom: 10px;

  & > div {
    width: 60px;
    height: 30px;
    margin-right: 5px;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: white;
    align-items: center;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
}
</style>
