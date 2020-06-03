<template>
  <div v-clickoutside="hideBox" class="t-box box-tool-a">
    <div class="box-item count" @click="toggleBox()">
      <a href="javascript:;">
        <span class="tool-text ep-count">
          污染源数量 {{ statisticObj.epCount }}家
        </span>
      </a>
    </div>
    <div class="box-item rate" @click="toggleBox()">
      <a href="javascript:;" :class="{active: showFlag}">
        <span class="tool-text online-rate">
          视频在线率 {{ statisticObj.onlineRate }}%
        </span>
        <em class="triangle tool-container-triangle icon-online-rate">
          <svg-icon icon-class="downward" />
        </em>
      </a>
    </div>
    <transition name="slide-box">
      <div v-if="showFlag" class="box">
        <div v-if="$slots.all" slot="all" class="all">
          <slot name="all" />
        </div>
        <div v-else class="layout">
          <div v-if="$slots.head" slot="head" class="head">
            <slot name="head" />
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
import Emitter from '@/components/OlMap/util/minxins/emitter'
import clickoutside from '@/components/OlMap/util/directives/clickoutside'
export default {
  name: 'WidgetControl',
  directives: { clickoutside },
  mixins: [Emitter],
  props: {
    statisticObj: {
      type: Object,
      default: () => {
        return {
          onlineRate: 100,
          epCount: 0
        }
      }
    }
  },
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    hideBox() {
      this.showFlag = false
    },
    toggleBox() {
      this.showFlag = !this.showFlag
    }
  }
}
</script>

<style lang="scss" scoped>
  .box-tool-a{
    position: relative;
    float: left;
    display: inline-block;
    padding: 0px 0px;
    background-repeat: no-repeat;
    margin-right: 10px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 4px rgba(75,83,102,0.08);
    opacity:1;
    border-radius:2px;
    .box-item{
      float: left;
      padding: 0px 10px;
      position: relative;
      &:not(:last-child):after {
        content: '';
        display: block;
        visibility: visible;
        width: 1px;
        height: 21px;
        background: rgba(234,238,246,1);
        position: absolute;
        top: 10px;
        right: -1px;
      }
      .tool-text{
        text-align: center;
        font-size: 14px;
        font-style: normal;
        height: 34px;
        line-height: 38px;
        color: #4B5366;
      }
      .ep-count{
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(19,153,248,1);
        opacity:1;
      }
      .online-rate{
        font-size:14px;
        font-family:Arial;
        font-weight:bold;
        color:rgba(82,196,26,1);
        opacity:1;
      }
      .icon-online-rate{
        float: right;
        margin-right: 2px;
        margin-top: 8px;
      }
      .icon-online-rate> .svg-icon{
        width: 25px;
        height: 25px;
      }
    }
    .box-item> .active .triangle {
      transform: rotate(180deg);
      margin-top: 12px;
    }
    .triangle {
      width: 30px;
      height: 20px;
      transition: .3s;
    }
    .tool-container-triangle {
      margin-left: 5px;
      margin-top: 5px;
    }
    .triangle> .svg-icon{
      width: 30px;
      height: 30px;
    }
    .box{
      overflow: hidden;
      width: 100%;
      height:485px;
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
          height: calc(49.9%);
          overflow-y: auto;
          border-bottom: 1px solid #ebebeb;
        }
        .bottom{
          width: calc(100%);
          height: calc(49.9%);
          overflow-y: auto;
          border-bottom: 1px solid #ebebeb;
        }
      }
    }
  }
</style>
