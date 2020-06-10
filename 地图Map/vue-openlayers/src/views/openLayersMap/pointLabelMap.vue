<!--
 * @Author: your name
 * @Date: 2020-06-04 09:05:18
 * @LastEditTime: 2020-06-04 14:24:19
 * @LastEditors: Please set LastEditors
 * @Description: 参考文章：https://blog.csdn.net/qq_36410795/article/details/106361074
 * @FilePath: \vue-openlayers\src\views\openLayersMap\pointLabelMap.vue
-->
<template>
  <div>
    <div id="map1" ref="map" class="map"
        @click="handClick"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import { Map, View, Feature, ol } from "ol";
import { Style, Stroke, Fill, Icon } from "ol/style";
import { Point, Polygon, MultiPolygon } from "ol/geom";
import { defaults as defaultControls, OverviewMap } from "ol/control";
import { fromLonLat } from "ol/proj";

// 边界json数据
import areaGeo from "@/geoJson/cdprovince.json";

export default {
  data() {
    return {
      map: null,
      featuresArr: [],
    };
  },
  mounted() {
    this.initMap();
    //省描边代码
    this.addArea(areaGeo);
    //鼠标悬浮改变图标样式
    this.pointerMove();
    // 模拟点数据
    let coordinates = [
      { x: "103.165034", y: "31.881932", type: "lv" },
      { x: "106.918082", y: "31.441314", type: "lv" },
      { x: "102.741896", y: "30.839974", type: "bule" },
    ];
    //批量根据经纬度坐标打点
    this.addPoints(coordinates);
  },
  methods: {
    /**
     * 初始化地图
     */
    initMap() {
      this.map = new Map({
        // 地图的容器，元素本身或id元素的。
        target: this.$refs.map,
        // 最初添加到地图的控件。如果未指定， module:ol/control~defaults则使用。
        controls: defaultControls({
          zoom: true,
        }).extend([]),
        // 图层。如果未定义，则将渲染没有图层的地图。请注意，层是按提供的顺序渲染的，因此，例如，如果要使矢量层出现在图块层的顶部，则它必须位于图块层之后
        layers: [
          //创建地图
          new TileLayer({
            source: new XYZ({
              url:
                "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
            }),
          }),
        ],

        // 地图的视图
        view: new View({
          projection: "EPSG:4326",
          //   center: fromLonLat([104.065735, 30.659462]),
          center: [104.065735, 30.659462],
          zoom: 7,
          maxZoom: 19,
          minZoom: 5,
        }),
      });
    },

    /**
     * 省描边代码
     */
    addArea(geo = []) {
      if (geo.length == 0) {
        return false;
      }
      let features = [];
      geo.forEach((g) => {
        let lineData = g.features[0];
        let routeFeature = "";
        if (lineData.geometry.type == "MultiPolygon") {
          //多边形集合
          routeFeature = new Feature({
            geometry: new MultiPolygon(lineData.geometry.coordinates),
          });
        } else if (lineData.geometry.type == "Polygon") {
          //多边形
          routeFeature = new Feature({
            geometry: new Polygon(lineData.geometry.coordinates),
          });
        }
        routeFeature.setStyle(
          new Style({
            fill: new Fill({
              //描边中间部分内容颜色值
              color: "#4e98f444",
            }),
            stroke: new Stroke({
              width: 3,
              color: [1, 137, 227, 1],
            }),
          })
        );
        features.push(routeFeature);
      });
      let routeLayer = new VectorLayer({
        source: new VectorSource({
          features: features,
        }),
      });
      this.map.addLayer(routeLayer);
    },

    /**
     * 批量根据经纬度坐标打点
     * 1、创建一个图层
     * 2、图层添加到map地图
     * 3、循环（点经纬度）数组
     * 4、创建feature对象，最后添加到图层
     */
    addPoints(coordinates) {
      // 设置图层
      this.flagLayer = new VectorLayer({
        source: new VectorSource(),
      });
      // 添加图层
      this.map.addLayer(this.flagLayer);
      // 循环添加feature
      for (let i = 0; i < coordinates.length; i++) {
        // 创建feature，一个feature就是一个点坐标信息
        let feature = new Feature({
          geometry: new Point([coordinates[i].x, coordinates[i].y]),
        });
        feature.setStyle(this.getIcon(coordinates[i].type));
        this.featuresArr.push(feature);
      } // for 结束
      // 批量添加feature
      this.flagLayer.getSource().addFeatures(this.featuresArr);
    },

    /**
     * ① 根据传参类型判断 设置图标样式
     */
    getIcon(type) {
      let src = "";
      type == "bule"
        ? (src = require("../../assets/images/dingwei_blue.png"))
        : (src = require("../../assets/images/dingwei_red.png"));
      var styleIcon = new Style({
        // 设置图片效果
        image: new Icon({
          src: src,
          anchor: [1, 1],
        }),
      });
      return styleIcon;
    },

    /**
     * 鼠标悬浮改变图标样式
     */
    pointerMove() {
      let _that = this;
      this.map.on("pointermove", function(evt) {
        _that.map.getTargetElement().style.cursor = _that.map.hasFeatureAtPixel(
          evt.pixel
        )
          ? "pointer"
          : "";
      });
    },


    handClick(options) {
        console.log("点击了地图", options);
        
    }
  },
};
</script>

<style>
.map {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
