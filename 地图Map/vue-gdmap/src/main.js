import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Axios from 'axios'

import 'normalize.css/normalize.css'
import '@/styles/index.scss' // global css
import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI)

Vue.prototype.$axios = Axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
