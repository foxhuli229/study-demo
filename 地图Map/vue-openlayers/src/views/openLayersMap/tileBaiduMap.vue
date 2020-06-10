<!--
 * @Author: your name
 * @Date: 2020-06-05 09:30:27
 * @LastEditTime: 2020-06-05 09:59:51
 * @LastEditors: Please set LastEditors
 * @Description: 瓦片地图之百度地图
 * @FilePath: \地图Map\vue-openlayers\src\views\openLayersMap\tileBaiduMap.vue
-->
<template>
  <div>
    <div id="baiduMap"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { defaults as defaultControls } from "ol/control";
import Target from "ol/events/Target";


export default {
  data() {
    return {
      map: null,
      baiduMaplayers: null,
    };
  },
  mounted() {
    this.getLayerTitle();
    this.mapint();
  },
  methods: {
    mapint() {
      this.map = new Map({
        target: "baiduMap",
        layers: [this.baiduMaplayers],
        view: new View({
          center: [104.06, 30.67],
          projection: "EPSG:4326",
          zoom: 8,
        }),
      });
    },

    // 百度地图层
    getLayerTitle() {
      this.baiduMaplayers = new TileLayer({
        source: new OSM({
          tilePixelRatio: 2,
          tileUrlFunction: function(tileCoord) {
            // 参数tileCoord为瓦片坐标
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = tileCoord[2];

            // 计算当前层级下瓦片总数的一半，用于定位整个地图的中心点
            var halfTileNum = Math.pow(2, z - 1);
            // 原点移到中心点后，计算xy方向上新的坐标位置
            var baiduX = x - halfTileNum;
            var baiduY = y + halfTileNum;

            // 百度瓦片服务url将负数使用M前缀来标识
            if (baiduX < 0) {
              baiduX = "M" + -baiduX;
            }
            if (baiduY < 0) {
              baiduY = "M" + -baiduY;
            }

            // 返回经过转换后，对应于百度在线瓦片的url
            return (
              "http://online2.map.bdimg.com/onlinelabel/?qt=tile&x=" +
              baiduX +
              "&y=" +
              baiduY +
              "&z=" +
              z +
              "&styles=pl&udt=20160321&scaler=2&p=0"
            );
          },
        }),
      });
    },
  },
};
</script>

<style>
#baiduMap {
    width: 100%;
    height:600px;
}
</style>
