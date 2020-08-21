<!--
 * @Author: your name
 * @Date: 2020-05-27 14:45:51
 * @LastEditTime: 2020-05-27 15:28:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-baidumap\src\views\BaiduApiMap\Map.vue
--> 
<template>
  <div>
      <!-- <div id="allmap"></div> -->
  </div>
</template>

<script>
// import BMap from 'BMap'
export default {
  data() {
    return{
      
    }
  },
  methods: {

    //初始化地图
    getinitializeMap() {
      // // 百度地图API功能
      // let map = new BMap.Map("allmap");    // 创建Map实例
      // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
      // //添加地图类型控件
      // map.addControl(new BMap.MapTypeControl({
      //   mapTypes:[
      //           BMAP_NORMAL_MAP,
      //           BMAP_HYBRID_MAP
      //       ]}));	  
      // map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
      // map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    }
  }

}
</script>

<style>

</style>