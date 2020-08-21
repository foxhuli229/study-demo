<template>
  <div class="t-box box-tool-a">
    <div class="box-item">
      <a href="javascript:;" @click="toolCl">
        <span class="toolcl">
          <svg-icon icon-class="toolcl" />
        </span>
        <span class="tool-text-two">
          测距
        </span>
      </a>
    </div>
    <div class="box-item">
      <a href="javascript:;" @click="toolCm">
        <span class="toolcl">
          <svg-icon icon-class="toolcm" />
        </span>
        <span class="tool-text-two">
          侧面
        </span>
      </a>
    </div>
    <div class="box-item">
      <a href="javascript:;" @click="clearAll">
        <span class="toolcl">
          <svg-icon icon-class="clear" />
        </span>
        <span class="tool-text-two">
          清除
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import Emitter from '@/components/OlMap/util/minxins/emitter'
import ToolBox from '@/components/OlMap/util/tool/tool-box.js'
export default {
  name: 'BoxTool',
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
  methods: {
    toolCl() {
      this.tool = new ToolBox(this.olmap.map, 'LineString', this.olmap.projection)
      this.tool.open()
    },
    toolCm() {
      this.tool = new ToolBox(this.olmap.map, 'area', this.olmap.projection)
      this.tool.open()
    },
    clear() {
      if (this.tool) {
        this.tool.close()
        delete this.tool
        this.tool = null
      }
    },
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
      // 自己
      this.clear()
    }
  }
}
</script>

<style lang="scss" scoped>
.box-tool-a{
  position: relative;
  float: left;
  display: inline-block;
  padding: 0px 10px;
  background-repeat: no-repeat;
  background-color: #409eff;
  margin-right: 10px;
  .box-item{
    float: left;
    padding: 0px 10px;
    .toolcl{
      display: inline-block;
      background-repeat: no-repeat;
      margin-right: 2px;
      color: white;
    }
    .tool-text-two{
      text-align: center;
      margin-right: 15px;
      font-size: 14px;
      font-style: normal;
      height: 34px;
      line-height: 38px;
      color: #ffffff;
    }
    position: relative;
    &:not(:last-child):after {
      content: '';
      display: block;
      visibility: visible;
      width: 1px;
      height: 21px;
      background: #f4f4f4;
      position: absolute;
      top: 7px;
      right: -1px;
    }
  }
}
</style>
