<template>
  <div :id="id" ref="echart" class="chart-wrap" :style="style" />
</template>

<script>
import Emitter from '@/components/OlMap/util/minxins/emitter.js'
export default {
  name: 'EchartsBox',
  mixins: [Emitter],
  props: {
    // 父组件需要传递的参数：id，width，height，option
    id: {
      type: String
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    option: {
      type: Object,
      // Object类型的prop值一定要用函数return出来，不然会报错。原理和data是一样的，
      // 使用闭包保证一个vue实例拥有自己的一份props
      default() {
        return {
        }
      }
    }
  },
  computed: {
    style() {
      return {
        height: this.height,
        width: this.width,
        maxHeight: this.maxHeight
      }
    }
  },
  data(){
    return {
      maxHeight: ''
    }
  },
  watch: {
    option(curVal, oldVal) {
      this.init()
    },
    width(n, o) {
      this.init()
    }
  },
  mounted() {
    this.init()
    this.$on('on-echarts-box-drag', () => {
      setTimeout(() => {
        this.myChart.resize()
      }, 200)
    })
  },
  methods: {
    init() {
      const height = window.innerHeight
      let maxHeight = `${Math.round(height * 0.55)}px`
      if (height >= 600 && height <= 750) {
        maxHeight = `${Math.round(height * 0.6)}px`
      } else if (height >= 750 && height <= 850) {
        maxHeight = `${Math.round(height * 0.65)}px`
      } else if (height > 850 && height <= 1000) {
        maxHeight = `${Math.round(height * 0.7)}px`
      } else if (height > 1000) {
        maxHeight = `${Math.round(height * 0.8)}px`
      }
      this.maxHeight = maxHeight

      const $this = this
      // setTimeout(function() {
      if (!$this.id && $this.id.length !== 0) {
        return
      }
      const echarts = require('echarts')
      // 基于准备好的dom，初始化echarts实例
      $this.myChart = echarts.init(document.getElementById($this.id))
      // 绘制图表
      $this.myChart.resize()
      $this.option.backgroundColor = 'rgba(76,83,91,0)'
      $this.myChart.clear()
      $this.myChart.setOption($this.option, true)
    }
  }
}
</script>

<style lang="scss" scoped>
  .chart-wrap {
    position: relative;
    overflow: hidden;
  }
</style>
