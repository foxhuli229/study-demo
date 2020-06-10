<!--
 * @Author: your name
 * @Date: 2020-06-04 15:22:44
 * @LastEditTime: 2020-06-04 18:15:15
 * @LastEditors: Please set LastEditors
 * @Description: 地图导航 http://linwei.xyz/ol3-primer/ch04/04-01.html
 * @FilePath: \vue-openlayers\src\views\openLayersMap\mapnavigation.vue
-->
<template>
  <div>
    <div ref="map" style="width: 100%; height: 800px"></div>
    <div id="navigate-container">
      <input type="button" @click="moveToLeft" value="左移" />
      <input type="button" @click="moveToRight" value="右移" />
      <input type="button" @click="moveToUp" value="上移" />
      <input type="button" @click="moveToDown" value="下移" />
      <input type="button" @click="moveToChengDu" value="移到成都" />
      <input type="button" @click="zoomIn" value="放大" />
      <input type="button" @click="zoomOut" value="缩小" />
    </div>
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { defaults as defaultControls } from "ol/control";

console.log(TileLayer);


export default {
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.mapint();
  },
  methods: {
    mapint() {
      this.map = new Map({
        target: this.$refs.map,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        controls: new defaultControls({
          attributionOptions: {
            collapsible: false,
          },
        }),

        //logo
        logo: {
          src: "http://linwei.xyz/ol3-primer/img/face_monkey.png",
          href: "http://www.openstreetmap.org/",
        }, // 点击能跳转到对应页面

        view: new View({
          // 设置成都为地图中心，此处进行坐标转换， 把EPSG:4326的坐标，转换为EPSG:3857坐标，因为ol默认使用的是EPSG:3857坐标
          projection: "EPSG:4326",
          center: [104.065735, 30.659462],
          zoom: 7,
          // 限制地图缩放最大级别为14，最小级别为10
          minZoom: 5,
          maxZoom: 14,
        }),
      });
    },

    //向左移动地图
    moveToLeft() {
      let view = this.map.getView();
      //['50104.065735', '0.659462'] 下标为0： X轴，下标为1：y轴
      let mapCenter = view.getCenter();
      console.log(this.map, mapCenter);

      // 让地图中心的x值增加，即可使得地图向左移动，增加的值根据效果可自由设定
      mapCenter[0] -= 5;
      view.setCenter(mapCenter);
      this.map.render();
    },

    //向右移动地图
    moveToRight() {
      let view = this.map.getView();
      //['50104.065735', '0.659462'] 下标为0： X轴，下标为1：y轴
      let mapCenter = view.getCenter();

      // 让地图中心的x值增加，即可使得地图向左移动，增加的值根据效果可自由设定
      mapCenter[0] += 5;
      view.setCenter(mapCenter);
      this.map.render();
    },
    //向上移动地图
    moveToUp() {
      let view = this.map.getView();
      //['50104.065735', '0.659462'] 下标为0： X轴，下标为1：y轴
      let mapCenter = view.getCenter();

      // 让地图中心的x值增加，即可使得地图向左移动，增加的值根据效果可自由设定
      mapCenter[1] += 5;
      view.setCenter(mapCenter);
      this.map.render();
    },
    //向下移动地图
    moveToDown() {
      let view = this.map.getView();
      //['50104.065735', '0.659462'] 下标为0： X轴，下标为1：y轴
      let mapCenter = view.getCenter();

      // 让地图中心的x值增加，即可使得地图向左移动，增加的值根据效果可自由设定
      mapCenter[1] -= 5;
      view.setCenter(mapCenter);
      this.map.render();
    },
    //移动到成都
    moveToChengDu() {
      //   var view = this.map.getView();
      //   console.log(view);

      //   // 设置地图中心为成都的坐标，即可让地图移动到成都
      //   view.setCenter([104.06, 30.67], "EPSG:4326");
      //   this.map.render();
      // 让地图最大化完全地显示区域[104, 30.6, 104.12, 30.74]
      console.log(this.map.getView());
      
      this.map.getView().fit([104, 30.6, 104.12, 30.74], this.map.getSize());
    },
    //放大地图
    zoomIn() {
      let view = this.map.getView();
      console.log(view);

      // 让地图的zoom增加1，从而实现地图放大
      view.setZoom(view.getZoom() + 1);
    },
    //缩小地图
    zoomOut() {
      let view = this.map.getView();
      console.log(view);

      // 让地图的zoom增加1，从而实现地图放大
      view.setZoom(view.getZoom() - 1);
    },
  },
};
</script>

<style></style>
