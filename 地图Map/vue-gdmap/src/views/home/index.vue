<!--
 * @Author: your name
 * @Date: 2020-05-26 09:48:37
 * @LastEditTime: 2020-06-03 10:45:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-gdmap\src\views\Home.vue
--> 
<template>
  <div class="home">
    <base-map></base-map>
    dd
  </div>
</template>

<script>
import BaseMap from "@/components/OlMap/Map"

export default {
  name: 'Home',
  components: {
    BaseMap
  }
}
</script>
