/*
 * @Author: your name
 * @Date: 2020-05-26 10:01:47
 * @LastEditTime: 2020-06-08 10:33:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \地图Map\vue-baidumap\src\main.js
 */ 
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BaiduMap from 'vue-baidu-map'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(BaiduMap, {
  ak: 'MQNwRpboDhpIA3fBxqfVaVwKKnEIKxCs'
})

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
