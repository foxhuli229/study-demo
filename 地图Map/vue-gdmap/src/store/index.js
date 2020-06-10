import Vue from 'vue'
import Vuex from 'vuex'

import olmap from './olmap'
// import olmap from '@/components/OlMap/store/olmap'
import app from './app'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    olmap,
    app
  }
})

export default store
