import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from './router'

createApp(App).use(store).use(VueRouter).mount('#app')
