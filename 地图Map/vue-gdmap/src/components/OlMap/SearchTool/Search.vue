<template>
  <div>
    <div class="search-pane">
      <div class="search-div">
        <el-input v-model="queryData.searchKey" placeholder="请输入关键字..." @focus="handleFocus" @blur="handleBlur" />
        <el-button type="primary" class="search" icon="el-icon-search" @click="serchClick" />
      </div>
    </div>
    <div class="box-div" @mouseleave="mouseoutBox()">
      <slot v-if="expand" name="listBox">
        <list-box v-if="expand" ref="listBoxChild" @list-box-closer="listBoxCloser" />
      </slot>
    </div>
  </div>
</template>

<script>
import Emitter from '@/components/OlMap/util/minxins/emitter'
/**
 * @param {data} data 搜索到的数据结果
 * @param {Function} callbackEvent 点击时产生的回调函数
 */
export default {
  name: 'Search',
  components: {
    'list-box': () => import('./ListBox')
  },
  mixins: [Emitter],
  props: {
    mouseoutFlag: {
      type: Boolean,
      default: true
    },
    // 点击时的回调函数
    callbackEvent: {
      type: Function,
      default: () => {
        return function() {}
      }
    },
    // 清空回调函数
    callbackClear: {
      type: Function,
      default: () => {
        return function() {}
      }
    }
  },
  data() {
    return {
      expand: false
    }
  },
  computed: {
    queryData() {
      return this.$store.state.olmap.queryData
    }
  },
  mounted() {
    // 清空
    this.$on('clear', this.clear)
  },
  methods: {
    handleFocus(event) {
      // 获取焦点
    },
    handleBlur(event) {
      this.$store.dispatch('olmap/changeQueryData', this.queryData)
    },
    mouseoutBox() {
      if (this.mouseoutFlag) {
        this.expand = false
      }
    },
    serchClick() { // 点击搜索 注意：这里需要注意的是：这里会有请求数据的情况 ，调用上引用这传递进来的
      const queryData = this.queryData
      this.callbackEvent(queryData) // 这里把查询参数对象交给外层
      this.expand = true
    },
    clear() { // 清空搜索结果
      const query = this.queryData
      for (const key in query) {
        query[key] = ''
      }
      // 清空查询条件
      this.$store.dispatch('olmap/changeQueryData', query)
      // 关闭查询结果
      this.expand = false
      // 清空点位信息交给外部
      this.callbackClear()
    },
    listBoxCloser() {
      this.$emit('list-box-closer')
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-pane {
    font-size: 13px;
    height: auto;
    width: calc(100%);
    position: relative;
    .search-div {
      height: 35px;
      width: calc(100%);
      padding: 0px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      float: left;
      border-bottom: 1px solid silver;
      margin-bottom: 2px;
    }
    .box-div {
      height: auto;
      width: calc(100%);
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
</style>
