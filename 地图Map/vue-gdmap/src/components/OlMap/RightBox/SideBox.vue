<!-- 右侧面盒子-->
<template>
  <div class="right-side-box" :style="{ top: topLocation }" :class="expand">
    <a v-if="panelExpand" :title="title" href="javascript:;" class="side_bar_stretch" @click="toggleStretch">
      <svg-icon :class="toggleStretchTipClass" :icon-class="toggleStretchTipClass" />
    </a>
    <a v-if="false" href="javascript:;" class="change-inner" :class="{active:boxFlag }" @click="clickPane">
      <span class="icon-left" :style="tabUp" />
    </a>
    <div v-if="updownExpand" class="collect-pane" @click="clickPane">
      <div class="title-map-left">
        <div class="title-text">
          <slot name="title" class="span-title">大气环境统计</slot>
        </div>
        <div class="title-icom">
          <a href="javascript:;" :class="{active:boxFlag }">
            <span class="icon-left" :style="tabUp" />
          </a>
        </div>
      </div>
    </div>
    <div v-if="expand && !updownExpand" class="box">
      <div v-if="$slots.all" slot="all" class="all">
        <slot name="all" />
      </div>
      <div v-else class="layout">
        <div v-if="$slots.head" slot="head" class="head">
          <slot name="head" />
        </div>
        <div v-if="$slots.middle" slot="middle" class="middle">
          <slot name="middle" />
        </div>
        <div v-if="$slots.bottom" slot="bottom" class="bottom">
          <slot name="bottom" />
        </div>
      </div>
    </div>
    <transition v-else name="slide-box">
      <div v-if="boxFlag" class="box">
        <div v-if="$slots.all" slot="all" class="all">
          <slot name="all" />
        </div>
        <div v-else class="layout">
          <div v-if="$slots.head" slot="head" class="head">
            <slot name="head" />
          </div>
          <div v-if="$slots.middle" slot="middle" class="middle">
            <slot name="middle" />
          </div>
          <div v-if="$slots.bottom" slot="bottom" class="bottom">
            <slot name="bottom" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SideBox',
  props: {
    panelExpand: {
      type: Boolean,
      default: false
    },
    topY: {
      type: Number,
      default: 8
    },
    topOpt: {
      type: Boolean,
      default: false
    },
    updownExpand: {
      type: Boolean,
      default: false
    },
    defaultExpand: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      boxFlag: false,
      topLocation: this.topY + '%'
    }
  },
  computed: {
    configObj() {
      return this.$store.state.olmap.configObj
    },
    tabUp() {
      const olmapUrl = this.configObj.olmapUrl
      const icon = `background-image: url('${olmapUrl}/static/olmap/images/tab-up.png')`
      return icon
    },
    expand() {
      return {
        show: this.$store.state.olmap.sideBoxRigthShow
      }
    },
    sideBoxRigthShow() {
      return this.$store.state.olmap.sideBoxRigthShow
    },
    toggleStretchTipClass() {
      return this.sideBoxRigthShow ? 'fewer-left-right' : 'fewer-left-right'
    },
    title() {
      return this.sideBoxRigthShow ? '关闭' : '打开'
    }
  },
  mounted() {
    this.boxFlag = this.defaultExpand
  },
  methods: {
    clickPane() {
      this.boxFlag = !this.boxFlag
    },
    toggleStretch() {
      this.$store.dispatch('olmap/toggleSideBoxRigthShow', !this.sideBoxRigthShow)
    }
  }
}
</script>

<style lang="scss" scoped>
  .right-side-box{
    position: absolute;
    width: 320px;
    right: -320px;
    background:rgba(255,255,255,1);
    box-shadow:0px 10px 20px 0px rgba(0, 0, 0, 0.14);
    border-radius:2px;
    transition: right .8s ease;
    z-index: 999;
    border-collapse: separate;
    .side_bar_stretch {
      position: absolute;
      width: 20px;
      height: 35px;
      background:linear-gradient(90deg,rgba(37,136,234,1),rgba(74,165,255,1));
      right: 320px;
      top: 40%;
      border-left: none;
      cursor: pointer;
      display: block;
      transition: .2s;
      border-radius: 3px;
    }
    .change-inner{
      position: absolute;
      width: 32px;
      height: 32px;
      right: 5px;
      top: 5px;
      border-left: none;
      cursor: pointer;
      display: block;
      transition: .2s;
      border-radius: 3px;
    }
    .collect-pane{
      width: 100%;
      height: 100%;
      position: relative;
      border-bottom: 1px solid silver;
      .title-map-left{
        line-height: 38px;
        div{
          display: inline-block;
        }
        .title-text{
          width: calc(100% - 30px);
          font-size: 14px;
          align-items: center;
          padding-left: 15px;
          font-weight: bold;
          float: left;
        }
      }
    }
    .icon-left{
      width: 16px;
      height: 16px;
      margin-top: 5px;
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
      transform: rotate(-180deg);
    }
    .slide-box-enter-active {
      transition: all 0.3s ease-in-out;
      height: 78vh;
    }
    .slide-box-leave {
      height: 78vh;
      transition: all 0.3s ease-in-out;
    }
    .slide-box-leave-active {
      transition: all 0.3s ease-in-out;
      height: 78vh;
      opacity: 0;
    }
    .slide-box-enter, .slide-box-leave-active {
      opacity: 0;
      height: 78vh;
    }
    .search-excesive-suggestion {
      width: 100%;
      height: 78vh;
    }
    .fewer-left-right{
      width: 18px;
      height: 30px;
      line-height: 30px;
      display: block;
      color: white;
      padding: 10px 2px 5px 2px;
    }
    .box{
      width: calc(100%);
      height: 75vh;
      .all{
        width: calc(100%);
        height: calc(100%);
        overflow-y: auto;
        border: 1px solid #ebebeb;
      }
      .layout{
        width: calc(100%);
        height: calc(100%);
        .head{
          width: calc(100%);
          height: calc(33.3%);
          overflow-y: auto;
          border-bottom: 1px solid #ebebeb;
        }
        .middle{
          width: calc(100%);
          height: calc(33.3%);
          overflow-y: auto;
          border-bottom: 1px solid #ebebeb;
        }
        .bottom{
          width: calc(100%);
          height: calc(33.3%);
          overflow-y: auto;
          border-bottom: 1px solid #ebebeb;
        }
      }
    }
  }
  .right-side-box.show{
    right: 20px;
  }
</style>
