<template>
  <div id="side_bar" :class="expand">
    <div v-if="$slots.sideBoxAll" slot="sideBoxAll">
      <slot name="sideBoxAll" />
    </div>
    <div v-else>
      <a v-if="panelExpand" :title="title" href="javascript:;" class="side_bar_stretch" @click="toggleStretch">
        <svg-icon :class="toggleStretchTipClass" :icon-class="toggleStretchTipClass" />
      </a>
      <component :is="currentView" v-if="map" :mouseout-flag="mouseoutFlag" :callback-event="getSearchKey" :callback-clear="clear" @list-box-closer="listBoxCloser">
        <div v-if="$slots.listBox" slot="listBox">
          <slot name="listBox" />
        </div>
      </component>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  components: {
    'collect-component': () => import('./Search')
  },
  props: {
    panelExpand: {
      type: Boolean,
      default: false
    },
    mouseoutFlag: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      styleObject: {
        height: document.body.clientHeight - 280 + 'px'
      }
    }
  },
  computed: {
    map() {
      return this.$store.state.olmap.map
    },
    currentView() {
      return this.$store.state.olmap.sideBarView.currentView
    },
    expand() {
      return {
        show: this.$store.state.olmap.sideBarShow
      }
    },
    sideBarShow() {
      return this.$store.state.olmap.sideBarShow
    },
    toggleStretchTipClass() {
      return this.sideBarShow ? 'side-to-left' : 'side-to-right'
    },
    title() {
      return this.sideBarShow ? '关闭' : '打开'
    }
  },
  watch: {
    '$store.state.olmap.sideBarView': {
      handler: function(newVal) {
        this.data = newVal.data
      },
      deep: true
    }
  },
  methods: {
    toggleStretch() {
      this.$store.dispatch('olmap/toggleSideBarShow', !this.sideBarShow)
    },
    /**
     *  经过函数回调拿到查询参数
     * **/
    getSearchKey(queryData) {
      this.$emit('searchClick', queryData)
    },
    /**
     *  经过函数回调
     * **/
    clear() {
      this.$emit('clear')
    },
    listBoxCloser() {
      this.$emit('list-box-closer')
    }
  }
}
</script>

<style lang="scss" scoped>
  #side_bar{
    position: absolute;
    width: 350px;
    height: auto;
    top: 20px;
    left: -350px;
    transition: left .5s ease;
    z-index: 1001;
    box-shadow: 1px 0 5px rgba(0,0,0,.1);
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
      top: 0px;
      right: -22px;
      border: 1px solid #aaa;
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
  }
</style>
