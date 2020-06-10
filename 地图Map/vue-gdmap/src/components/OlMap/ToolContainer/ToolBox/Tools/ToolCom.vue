<!--
 * @Author: your name
 * @Date: 2020-06-03 09:40:32
 * @LastEditTime: 2020-06-05 16:06:35
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \地图Map\vue-gdmap\src\components\OlMap\ToolContainer\ToolBox\Tools\ToolCom.vue
--> 
<template>
  <div class="tool-item-box">
    <a href="javascript:;" class="tool-item" @click.stop="clickItem(item)">
      <span class="com-icon tool-icon" :class="item.className">
        <svg-icon :icon-class="item.className" />
      </span>
      <span class="tool-text">{{ item.name }}</span>
    </a>
    <slot />
  </div>
</template>
<script>
import Emitter from '@/components/OlMap/util/minxins/emitter.js'
export default {
  mixins: [Emitter],
  props: {
    item: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    clickItem(item) {
      this.item.open = true
      this.$set(this.item, 'uuid', Math.random())
      this.dispatch('ToolBox', 'on-tool-switch', this.item)
    }
  }
}
</script>
<style lang="scss" scoped>
  .tool-item-box {
    position: relative;
    .tool-item{
      &:hover{
        color: #409eff
      }
      .toolbd{
        color: red;
      }
    }
    &:hover{
      .com-icon, .tool-text{
        color: #409eff;
      }
    }
  }
</style>
