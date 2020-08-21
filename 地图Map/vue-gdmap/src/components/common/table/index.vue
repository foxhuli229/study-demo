<template>
  <div ref="tableBox" class="tool-table-box">
    <el-table
      v-loading.lock="loading"
      :data="tableData"
      :row-key="rowKey"
      :default-expand-all="defaultExpandAll"
      size="mini"
      txt-align="center"
      element-loading-text="拼命加载中"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="isShowSelection"
        type="selection"
        width="50"
      />
      <el-table-column
        v-if="isShowIndex"
        fixed
        type="index"
        width="60"
        label="序号"
        align="center"
      />
      <!-- <el-table-column
        v-for="item in tableHead.filter(res => !res.hidden)"
        :key="item.label"
        :label="item.label"
        :prop="item.prop"
        :show-overflow-tooltip="item.showTooltip"
        :formatter="item.formatter"
        :width="item.width"
        :align="item.align ? item.align : 'center'"
      /> -->
      <columnItem
        v-for="(item, index) in tableHead.filter(res => !res.hidden)"
        :key="index"
        :item="item"
      >
        <template v-if="item.prop" #[item.prop]="{ scope }">
          <slot :name="item.prop" :scope="scope" />
        </template>
      </columnItem>
      <el-table-column
        v-if="showOperation"
        fixed="right"
        type="text"
        label="操作"
        align="center"
        :width="operationColumnWidth"
      >
        <template slot-scope="scope">
          <slot name="operation" :scope="scope" />
        </template>
      </el-table-column>
      <template slot="append">
        <slot name="append" />
      </template>
    </el-table>
    <div v-if="isShowPage" class="page-box">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 100]"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="total"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  components: {
    columnItem: () => import('./components/columnItem')
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    isShowPage: {
      type: Boolean,
      default: true
    },
    isShowIndex: {
      type: Boolean,
      default: true
    },
    isShowSelection: {
      type: Boolean,
      default: false
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableHead: {
      type: Array,
      default: () => {
        return []
      }
    },
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    operationColumnWidth: {
      type: Number,
      default: 120
    },
    showOperation: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    sizeChange(val) {
      this.$emit('update:current-page', 1)
      this.$emit('update:page-size', val)
      this.$emit('change-page', { current: 1, size: val })
    },
    currentChange(val) {
      this.$emit('update:current-page', val)
      this.$emit('change-page', { current: val, size: this.pageSize })
    },
    handleSelectionChange($event) {
      this.$emit('selection-change', $event)
    }
  }
}
</script>
<style lang="scss" scoped>
  .tool-table-box {
    height: 100%;
    background: #fff;
    flex: 1;
  }
  .page-box {
    padding-top: 10px;
    background-color: #fff;
    .el-pagination {
      overflow: hidden;
      text-align: right;
      /deep/ .el-pagination__total {
          float: left;
      }
    }
  }
</style>
