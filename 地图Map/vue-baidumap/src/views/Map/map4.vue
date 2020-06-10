<!--
 * @Author: your name
 * @Date: 2020-06-08 11:22:51
 * @LastEditTime: 2020-06-08 13:43:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \地图Map\vue-baidumap\src\views\Map\map4.vue
-->
<template>
  <div>
    <baidu-map :center="{ lng: 116.403765, lat: 39.91485 }" :zoom="11">
      <bm-view class="map"></bm-view>

      <!-- 自定义控件 -->
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
      ></bm-local-search>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
   
  },
};
</script>

<style scoped>
.map {
  width: 700px;
  height: 550px;
  border: #ccc solid 1px;
  font-size: 12px;
}

.search_Class {
  margin: 5px 10px;
}
</style>
