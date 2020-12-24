<template>
  <div id="app">
    年龄： {{this.$store.getters.myAge}}  <br>
    年龄： {{this.$store.state.age}}
    <button @click="changeAge">更新年龄 getters</button>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  mounted() {
    console.log('====================================');
    console.log(this.$options);
    console.log('====================================');
  },
  methods: {
    changeAge() {
      this.$store.dispatch('changeAge', this.$store.state.age + 1)
    },
    ...mapActions([])
  },
 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
