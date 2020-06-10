<!--
 * @Author: your name
 * @Date: 2020-06-03 14:23:28
 * @LastEditTime: 2020-06-04 17:30:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-openlayers\src\views\openLayersMap\map.vue
-->
<template>
  <div>
    <div id="map" class="map"></div>

    <div id="map1" class="map" style="margin-top: 500px;"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { defaults as defaultControls } from "ol/control";

export default {
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.mapint("map");
    this.mapint("map1");
  },
  methods: {
    mapint(el) {
      this.map = new Map({
        target: el,
        layers: [
          // 瓦片数据源，
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
          center: [0, 0],
          zoom: 0,
        }),
      });
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
.map {
  position: absolute;
  /* height: 100%; */
  height: 400px;
  width: 100%;
  margin-top: 40px;
}
</style>
