<!--
 * @Author: your name
 * @Date: 2020-06-03 16:51:13
 * @LastEditTime: 2020-06-05 14:44:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-openlayers\src\views\openLayersMap\printMap.vue
-->
<template>
  <div>
    <div id="map" class="map"></div>
    <hr>
    <form class="form-inline">
      <label>几何类型：</label>
      <select id="type" ref="type" @change="changeSelect">
        <option value="Point">点</option>
        <option value="LineString">线串</option>
        <option value="Polygon">多边形</option>
        <option value="Circle">圈</option>
      </select>
    </form>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Draw, Modify, Snap } from "ol/interaction";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
export default {
  data() {
    return {
      map: null,
      draw: null,
      snap: null,

      source: null,
      vector: null,
      raster: null,
      modify: null,
    };
  },
  mounted() {
    this.mapint();
  },
  methods: {
    mapint() {
      // 瓦片数据源
      this.raster = new TileLayer({
        source: new OSM(),
      });
      // 对应的是矢量地图源，点，线，面等等常用的地图元素(Feature)
      this.source = new VectorSource();
      this.vector = new VectorLayer({
        source: this.source,
        style: new Style({
          fill: new Fill({
            color: 'rgb(255, 255, 255, 0.2)',
          }),
          stroke: new Stroke({
            color: "#ffcc33",
            width: 2,
          }),
          //圈的样式设置
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: "#ffcc33",
            }),
          }),
        }),
      });

      this.map = new Map({
        target: "map",
        layers: [this.raster, this.vector],
        view: new View({
          center: [-11000000, 4600000],
          zoom: 4,
        }),
      });

      this.modify = new Modify({ source: this.source });
      this.map.addInteraction(this.modify);

      this.addInteractions()

      console.log(this.map);
      
    },

    addInteractions() {
      let typeSelect = document.getElementById("type");
      this.draw = new Draw({
        source: this.source,
        type: typeSelect.value,
      });
      this.map.addInteraction(this.draw);
      this.snap = new Snap({ source: this.source });
      this.map.addInteraction(this.snap);
    },

    //select发生改变的时候
    changeSelect() {
      this.map.removeInteraction(this.draw);
      this.map.removeInteraction(this.snap);
      this.addInteractions();
    },
  },
};
</script>

<style>
    .map {
        width: 100%;
        height: 800px;
    }
</style>
