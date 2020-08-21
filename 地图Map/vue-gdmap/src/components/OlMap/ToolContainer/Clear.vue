<template>
  <div class="t-item">
    <a href="javascript:;" @click="clearAll">
      <span class="com-icon tool-icon clear-icon svg-container">
        <svg-icon icon-class="clear" />
      </span>
      <span class="tool-text">清空</span>
    </a>
  </div>
</template>

<script>
import Emitter from '@/components/OlMap/util/minxins/emitter'
export default {
  mixins: [Emitter],
  data() {
    return {
    }
  },
  methods: {
    clearAll() {
      // 清空标线
      this.broadcast('Toolcl', 'clear')
      // 清空标面
      this.broadcast('Toolcm', 'clear')
      // 清空标点
      this.broadcast('Toolbd', 'clear')
      // 清空搜索结果
      this.broadcast('Search', 'clear')
      // 清楚点位
      this.broadcast('SearchListBox', 'clear')
      // 关闭地图弹窗
      this.broadcast('BaseMap', 'clear')
    }
  }
}
</script>

<style lang="scss" scoped>
.t-item{
  &:hover{
    .com-icon, .tool-text{
      color: #409eff;
    }
  }
}
</style>
