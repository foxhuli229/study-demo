<template>
  <div v-show="showMapDiv" v-clickoutside="hideBox" class="t-item tool-box">
    <a href="javascript:;" :class="{active: showFlag}" @click="toggleBox">
      <span class="com-icon tool-icon tool-box-icon">
        <svg-icon icon-class="tool-box-icon" />
      </span>
      <span class="tool-text">工具</span>
      <em class="triangle tool-container-triangle">
        <svg-icon icon-class="downward" />
      </em>
    </a>
    <transition name="slide-tool-box">
      <ul v-show="showFlag" class="tool-ul">
        <li class="tool-li">
          <toolcl ref="toolcl" @click.native="clickTool" />
        </li>
        <li class="tool-li">
          <toolcm ref="toolcm" @click.native="clickTool" />
        </li>
        <li class="tool-li">
          <toolbd ref="toolbd" @click.native="clickTool" />
        </li>
        <!--<li class="tool-li">-->
        <!--4-->
        <!--</li>-->
      </ul>
    </transition>
  </div>
</template>

<script>
import clickoutside from '@/components/OlMap/util/directives/clickoutside.js'
import Emitter from '@/components/OlMap/util/minxins/emitter.js'
export default {
  name: 'ToolBox',
  directives: { clickoutside },
  components: {
    Toolcl: () => import('./Tools/Toolcl.vue'),
    Toolcm: () => import('./Tools/Toolcm.vue'),
    Toolbd: () => import('./Tools/Toolbd.vue')
  },
  mixins: [Emitter],
  data() {
    return {
      showFlag: false
    }
  },
  computed: {
    showMapDiv() {
      return this.$store.state.olmap.showMapDiv
    }
  },
  mounted() {
    this.$on('on-tool-switch', (item) => {
      const children = this.$children
      // 将其他工具置为未选中
      children.forEach((child) => {
        if (child.item !== undefined) {
          if (child.item === item) {
            this.$set(child.item, 'uuid', Math.random())
            return
          }
          if (child.item.open) {
            child.item.open = false
          }
        }
      })
    })
  },
  methods: {
    toggleBox() {
      this.showFlag = !this.showFlag
    },
    hideBox() {
      this.showFlag = false
    },
    clickTool(item) {
      this.toggleBox()
    }
  }
}
</script>

<style lang="scss">
  .tool-box{
    .tool-box-icon {
      width: 15px;
    }
    .tool-ul {
      padding: 0;
      margin: 0;
      position: absolute;
      width: 87px;
      background: #fff;
      top: 34px;
      left: 0;
      color: #333333;
      box-shadow: 1px 2px 1px rgba(0, 0, 0, .15);
    }
    .tool-li {
      padding: 0;
      margin: 0;
      width: 100%;
      display: block;
    }
    .tool-li:not(:last-child) {
      border-bottom: 1px solid #ddd;
    }
    .tool-item {
      overflow: hidden;
      display: block;
    }
    .tool-item .com-icon {
      margin-left: 15px;
      margin-top: 5px;
    }
    .tool-item .tool-text{
      margin-left: 4px;
      line-height: 24px;
      height: 24px;
    }
    .tool-item:hover .tool-text  {
      color: $hover-color
    }
    .slide-tool-box-enter-active {
      transition: all .2s ease-in-out;
      height: 190px;
    }
    .slide-tool-box-leave {
      transition: all .2s ease-in-out;
    }
    .slide-tool-box-leave-active {
      height: 190px;
    }
    .slide-tool-box-enter, .slide-tool-box-leave-active {
      opacity: 0;
      height: 190px;
    }
  }
</style>
