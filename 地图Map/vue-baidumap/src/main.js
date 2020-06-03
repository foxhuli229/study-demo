import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  ak: 'MQNwRpboDhpIA3fBxqfVaVwKKnEIKxCs'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
