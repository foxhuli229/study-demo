<!--
 * @Author: your name
 * @Date: 2020-05-26 16:06:48
 * @LastEditTime: 2020-05-26 16:31:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-baidumap\src\views\Home.vue
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
  name: "Home",
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
