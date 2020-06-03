<template>
  <div class="t-item-box">
    <template v-for="(item, index) in topToolType">
      <div v-show="item.show" :key="index" class="t-item">
        <a href="javascript:;" :class="{active:[item.id] == topTypeClick.id}" @click="changeTopTypeClick(item)">
          <span class="tool-icon-class" :class="item.icon">
            <svg-icon :icon-class="item.icon" />
          </span>
          <span class="tool-text">{{ item.name }}</span>
          <em class="triangle tool-container-triangle">
            <svg-icon icon-class="downward" />
          </em>
        </a>
      </div>
      <transition :key="index" name="slide-box">
        <div v-if="item.id === topTypeClick.id" class="box">
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
    </template>
  </div>
</template>

<script>
import Emitter from '@/components/OlMap/util/minxins/emitter'
import clickoutside from '@/components/OlMap/util/directives/clickoutside'
export default {
  name: 'WSANChange',
  directives: { clickoutside },
  mixins: [Emitter],
  data() {
    return {
      showFlag: false
    }
  },
  computed: {
    topToolType() {
      return this.$store.state.olmap.topToolType
    },
    topTypeClick() {
      return this.$store.state.olmap.topTypeClick
    }
  },
  methods: {
    // 触发显示隐藏事件
    hideBox() {
      // this.showFlag = false
      this.$store.dispatch('olmap/changeTopTypeClick', {})
    },
    changeTopTypeClick(item) {
      if (this.topTypeClick.id === item.id) {
        this.hideBox()
      } else {
        this.$store.dispatch('olmap/changeTopTypeClick', item)
        // this.showFlag = !this.showFlag
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .t-item-box{
    padding: 0;
    position: relative;
    float: left;
    .t-item{
      padding: 2px 6px;
      &:hover{
        .tool-icon-class> .svg-icon, .tool-text{
          color: #409eff;
        }
      }
    }
    .tool-icon-class {
      float: left;
      margin-right: 2px;
      margin-top: 8px;
    }
    .tool-icon-class> .svg-icon{
      width: 20px;
      height: 20px;
    }
    .icon-soil{
      float: left;
      margin-right: 2px;
      margin-top: 6px;
    }
    .icon-soil> .svg-icon{
      width: 25px;
      height: 25px;
    }
    .tool-container-triangle {
      margin-left: 1px;
      float: left;
      margin-top: 5px;
    }
    .slide-box-enter-active {
      transition: all .3s ease-in-out;
      height: 391px;
    }
    .slide-box-leave {
      height: 391px;
      transition: all .3s ease-in-out;
    }
    .slide-box-leave-active {
      transition: all .3s ease-in-out;
      height: 0;
      opacity: 0;
    }
    .slide-box-enter, .slide-box-leave-active {
      opacity: 0;
      height: 0;
    }
    .box{
      overflow: hidden;
      width: 100%;
      height: 82vh;
      background: #fff;
      position: absolute;
      top: 42px;
      left: 0px;
      z-index: 1001;
      cursor: auto;
      font-size: 12px;
      font-family: "microsoft yahei",arial,tahoma,helvetica,sans-serif;
      box-shadow: 1px 2px 1px rgba(0, 0, 0, .15);
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
  .t-item-box:not(:last-child):after {
    content: '';
    display: block;
    visibility: visible;
    width: 1px;
    height: 21px;
    background: #eee;
    position: absolute;
    top: 7px;
    right: -1px;
  }
</style>
