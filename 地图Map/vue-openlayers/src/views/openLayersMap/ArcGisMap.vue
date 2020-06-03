<!--
 * @Author: your name
 * @Date: 2020-06-03 15:39:27
 * @LastEditTime: 2020-06-03 16:05:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-openlayers\src\views\openLayersMap\ArcGisMapServer.vue
-->
<template>
  <div id="map1" class="map"></div>
</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile as TileLayer, Image as ImageLayer} from 'ol/layer';
import {OSM, ImageArcGISRest} from 'ol/source';
export default {
  data() {
    return {
      map: null,
      url: 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer'
    };
  },
  mounted() {
      this.mapint()
  },
  methods: {
      mapint() {
          this.map = new Map({
              layers: [
                  new TileLayer({
                      source: new OSM()
                  }),
                  new ImageLayer({
                      source: new ImageArcGISRest({
                          ratio: 1,
                          params: {

                          },
                          url: this.url
                      })
                  })
              ],
              target: 'map1',
              view: new View({
                  center: [-10997148, 4569099],
                  zoom: 4
              })
          })

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
