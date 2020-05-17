/*
 * @Author: your name
 * @Date: 2020-05-16 00:08:26
 * @LastEditTime: 2020-05-17 09:11:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \基于vue实战 实现Excel表格上传与导出\excel-upload-download-demo\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import './config/element-config'


Vue.config.productionTip = false
Vue.prototype.$axios = Axios;

new Vue({
 router,
 render: h => h(App)
}).$mount('#app')
