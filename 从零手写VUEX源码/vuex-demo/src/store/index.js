import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { //状态存储
    age: 12
  },
  getters: {
    myAge : (state) => state.age
  },
  mutations: {  //同步方法，更改state的值
    changeAge (state, age) {
      state.age += age; //更新age属性
    }

  },
  actions: { //异步方法，做完后，将结果提交给 mutations, 具有缓存
    changeAge ({ commit }, age) {
      setTimeout(() => {
        commit('changeAge', age)
      }, 1000)
    }
  },
  modules: {
  }
})
