<!--
 * @Author: your name
 * @Date: 2020-06-03 14:42:14
 * @LastEditTime: 2020-06-03 16:00:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-openlayers\src\views\home.vue
-->
<template>
  <div>
    <ul>
      <router-link
        class="lis"
        v-for="(item, index) in routesList"
        :key="index"
        tag="li"
        :to="item.path"
      >
        {{ item.meta.title }}
      </router-link>

    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //所有路由信息
      routesList: [],
    };
  },
  mounted() {
    this.routesList = this.$router.options.routes;
  },
 
};
</script>

<style>
ul {
  text-decoration: none;
}
.lis {
  color: #3689ee;
  cursor: pointer;
}
</style>
