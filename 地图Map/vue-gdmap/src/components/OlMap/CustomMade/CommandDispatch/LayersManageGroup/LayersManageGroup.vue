<template>
  <Dialog
    title="资源图层管理"
    width="450px"
    :visible="layersGroupVisible"
    submit-btn-name="新增"
    @submit="handleSubmit"
    @cancel="handleClose"
  >
    <template #content>
      <el-table
        :data="totalResource"
        style="width: 100%"
        :show-header="false"
        size="mini"
        class="no-hover-table"
      >
        <el-table-column label="名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="cursor" @click.stop="handleRowClick(scope.row)">
              <el-radio v-model="radio" :label="scope.row.id">
                {{ scope.row.customLayerName }}
              </el-radio>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              icon="el-icon-edit"
              :disabled="scope.row.customLayerUser === '-1'"
              @click.native.prevent="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              size="mini"
              class="status-text-danger"
              :disabled="scope.row.customLayerUser === '-1'"
              @click.native.prevent="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Dialog>
</template>

<script>
export default {
  name: 'LayersManageGroup',
  components: {
    Dialog: () => import('@/components/common/Dialog')
  },
  props: {
    layersGroupVisible: {
      type: Boolean,
      default: false
    },
    totalResource: {
      type: Array,
      default: () => {
        return [
        ]
      }
    }
  },
  data() {
    return {
      radio: ''
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:layersGroupVisible', false)
    },
    handleSubmit() {
      this.$emit('update-resource', 'add', null)
    },
    // 切换资源图层
    handleRowClick(row) {
      this.radio = row.id
      this.$emit('update-resource', 'update', row)
    },
    handleEdit(row) {
      this.$emit('update-resource', 'edit', row)
    },
    handleDelete(row) {
      this.$emit('update-resource', 'delete', row)
    }
  }
}
</script>

<style scoped>

</style>
