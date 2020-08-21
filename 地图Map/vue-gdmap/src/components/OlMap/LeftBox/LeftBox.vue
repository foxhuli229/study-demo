<template>
  <div class="left-box-map" :style="getStyle" :class="expand">
    <a v-if="panelExpand" :title="title" href="javascript:;" class="side_bar_stretch" @click="toggleStretch">
      <svg-icon :class="toggleStretchTipClass" :icon-class="toggleStretchTipClass" />
    </a>
    <div class="collect-pane drag-box">
      <div class="title-map-left drag-box">
        <div class="title-text">
          <span class="span-title">
            <slot name="title">环境专题图层</slot>
          </span>
        </div>
        <div class="title-box drag-box">
          <slot name="dragBox" />
        </div>
        <div v-if="updownExpand" class="title-icom">
          <div v-show="setFlag" class="title-setting">
            <a title="设置" href="javascript:;" class="set-a" @click="settingClick">
              <span class="icon-set svg-container">
                <svg-icon icon-class="settings" />
              </span>
            </a>
          </div>
          <div class="title-change">
            <a href="javascript:;" class="change-inner" :class="{active:leftBoxFlag }" @click="clickPane">
              <!--<span class="icon-left" :style="iconLeft" />-->
              <span class="icon-left svg-container">
                <svg-icon icon-class="side-to-left" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="$slots.slideBoxAll" slot="slideBoxAll">
      <transition name="slide-box">
        <slot v-if="leftBoxFlag" name="slideBoxAll" class="box-content" />
      </transition>
    </div>
    <div v-else>
      <transition name="slide-box">
        <tree-box v-if="leftBoxFlag" :support-images="supportImages" :left-default-keys="leftDefaultKeys" :tree-height="treeHeight" :tree-data="treeData" class="box-conten-default" @change="handlerChangeTree" />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftBox',
  components: {
    TreeBox: () => import('./../TreeBox')
  },
  props: {
    panelExpand: {
      type: Boolean,
      default: false
    },
    topY: {
      type: Number,
      default: 0
    },
    bottomY: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    updownExpand: {
      type: Boolean,
      default: false
    },
    setFlag: {
      type: Boolean,
      default: false
    },
    leftBoxExpand: {
      type: Boolean,
      default: false
    },
    treeHeight: {
      type: Number,
      default: 250
    },
    supportImages: {
      type: Boolean,
      default: true
    },
    treeData: {
      type: Array,
      default: () => {
        return [
        //   {
        //   id: '1',
        //   name: '名称1',
        //   children: []
        // }
        ]
      }
    }
  },
  data() {
    return {
      leftBoxFlag: false
    }
  },
  computed: {
    configObj() {
      return this.$store.state.olmap.configObj
    },
    iconLeft() {
      const olmapUrl = this.configObj.olmapUrl
      const icon = `background-image: url('${olmapUrl}/static/olmap/images/icon-left.png')`
      return icon
    },
    expand() {
      return {
        show: this.$store.state.olmap.leftBoxShow
      }
    },
    sideBarShow() {
      return this.$store.state.olmap.leftBoxShow
    },
    toggleStretchTipClass() {
      return this.sideBarShow ? 'side-to-left' : 'side-to-right'
    },
    title() {
      return this.sideBarShow ? '关闭' : '打开'
    },
    getStyle() {
      const style = {}
      if (this.bottomY !== 0) {
        this.$set(style, 'bottom', `${this.bottomY}%`)
      } else {
        this.$set(style, 'top', `${this.topY}%`)
      }
      if (this.width !== 0) {
        this.$set(style, 'width', `${this.width}px`)
      }
      return style
    },
    leftDefaultKeys() {
      return this.$store.state.olmap.leftDefaultKeys
    }
  },
  watch: {
    panelExpand(val) {
      this.leftBoxFlag = val
    },
    leftBoxExpand(val) {
      this.leftBoxFlag = val
    }
  },
  mounted() {
    this.leftBoxFlag = this.leftBoxExpand
  },
  methods: {
    clickPane() {
      this.leftBoxFlag = !this.leftBoxFlag
    },
    toggleStretch() {
      this.$store.dispatch('olmap/toggleLeftBoxShow', !this.sideBarShow)
    },
    handlerChangeTree(dataTreeId, treeArray) {
      this.$store.dispatch('olmap/changeLeftDefaultKeys', { keys: dataTreeId, keysData: treeArray })
    },
    settingClick() {
      this.$emit('setting-click')
    }
  }
}
</script>

<style lang="scss" scoped>
.left-box-map{
  position: absolute;
  width: 250px;
  height: auto;
  left: -230px;
  background:rgba(255,255,255,1);
  box-shadow:0px 10px 20px 0px rgba(0, 0, 0, 0.14);
  border-radius:2px;
  transition: right .8s ease;
  z-index: 998;
  border-collapse: separate;
  &.show{
    left: 10px;
  }
  &.close{
    float: right;
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 10px;
    margin-top: 16px;
    background-repeat: no-repeat;
    background-position: -375px -27px;
    cursor: pointer;
  }
  .side_bar_stretch {
    position: absolute;
    width: 20px;
    height: 33px;
    background: rgba(255,255,255,.6);
    top: 5px;
    right: -22px;
    border: 1px solid rgba(234,238,246,1);
    border-left: none;
    cursor: pointer;
    display: block;
    transition: .2s;
  }
  .side-to-left, .side-to-right{
    display: block;
    margin-top: 7px;
    margin-left: 3px;
  }
  .collect-pane{
    width: 100%;
    height: 100%;
    position: relative;
    .title-map-left{
      line-height: 38px;
      div{
        display: inline-block;
      }
      .title-text{
        width: calc(100% - 120px);
        font-size: 14px;
        align-items: center;
        padding-left: 10px;
        font-family:MicrosoftYaHei;
        font-weight: bold;
        float: left;
      }
      .title-box{
        width: 60px;
        background-color: red;
        font-size: 12px;
        margin-right: 10px;
      }
      .title-icom{
        width: 36px;
        height: 16px;
        .title-setting{
           width: 20px;
           float: left;
            a{
              margin-top: -5px;
              overflow: hidden;
              display: block;
            }
        }
        .title-change{
          width: 16px;
          float: right;
          a{
            margin-top: -5px;
            overflow: hidden;
            display: block;
          }
        }
      }
    }
  }
  .icon-left{
    display: block;
    color: #040404;
    transition: 0.3s;
    transform: rotate(0deg);
  }
  .active>.triangle {
    transform: rotate(0deg);
  }
  .active>.icon-left {
    display: block;
    transform: rotate(-90deg);
    color: #00C6FF;
  }
  .slide-box-enter-active {
    transition: all 0.3s ease-in-out;
    height: auto;
  }
  .slide-box-leave {
    height: auto;
    transition: all 0.3s ease-in-out;
  }
  .slide-box-leave-active {
    transition: all 0.3s ease-in-out;
    height: auto;
    opacity: 0;
  }
  .slide-box-enter, .slide-box-leave-active {
    opacity: 0;
    height: auto;
  }
  .search-excesive-suggestion {
    width: 100%;
    height: auto;
  }
  .box-content{
    border-radius: 4px;
    border-top: 1px solid rgba(0, 0, 0, 0.14);
  }
  .box-conten-default{
    border-radius: 4px;
    border-top: 1px solid rgba(0, 0, 0, 0.14);
    padding: 10px 10px 10px 10px;
  }
}
</style>
