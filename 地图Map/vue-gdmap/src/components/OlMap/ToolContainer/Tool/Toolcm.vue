<template>
  <div class="t-item">
    <a href="javascript:;" @click="toolCm">
      <span class="com-icon tool-icon svg-container">
        <svg-icon icon-class="toolcm" />
      </span>
      <span class="tool-text">
        测面
      </span>
    </a>
  </div>
</template>

<script>
import Emitter from '@/components/OlMap/util/minxins/emitter'
import ToolBox from '@/components/OlMap/util/tool/tool-box.js'
export default {
  name: 'Toolcm',
  mixins: [Emitter],
  data() {
    return {
      tool: null
    }
  },
  computed: {
    olmap() {
      return this.$store.state.olmap.olmap
    }
  },
  mounted() {
    // 清空
    this.$on('clear', this.clear)
  },
  methods: {
    toolCm() {
      this.clear()
      this.tool = new ToolBox(this.olmap.map, 'area', this.olmap.projection)
      this.tool.open()
    },
    clear() {
      if (this.tool) {
        this.tool.close()
        delete this.tool
        this.tool = null
      }
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
