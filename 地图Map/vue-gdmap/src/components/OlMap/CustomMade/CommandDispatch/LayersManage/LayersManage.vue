<template>
  <Dialog
    title="定制化专题图层"
    width="450px"
    :visible="layersManageVisible"
    @submit="handleSubmit"
    @cancel="handleClose"
  >
    <template #content>
      <div class="guoup-name">
        <el-row>
          <el-col :span="4">
            名称：
          </el-col>
          <el-col :span="18">
            <el-input
              v-model="formData.groupLayerName"
              placeholder="请输入资源图层名称"
              size="mini"
              :maxlength="20"
              @blur="validateName"
            />
          </el-col>
        </el-row>
        <div class="error-msg">{{ errorMsg }}</div>
      </div>
      <div class="tree-box">
        <TreeBox
          v-if="layersManageVisible"
          :tree-data="treeData"
          :left-default-keys="treeKeys"
          :show-checkbox="showCheckbox"
          :filter-falg="filterFalg"
          :is-edit-object="isEditObject"
        />
      </div>
    </template>
  </Dialog>
</template>

<script>
export default {
  name: 'LayersManage',
  components: {
    Dialog: () => import('@/components/common/Dialog'),
    TreeBox: () => import('@/components/OlMap/TreeBox')
  },
  props: {
    state: {
      type: String,
      default: () => {
        return 'add'
      },
      validator(val) {
        return val === 'add' || val === 'edit' || val === 'update'
      }
    },
    formData: {
      type: Object,
      default: () => {
        return {
          groupLayerName: ''
        }
      }
    },
    layersManageVisible: {
      type: Boolean,
      default: false
    },
    filterFalg: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    isEditObject: {
      type: Object,
      default: () => {
        return {
          addParentNode: false,
          expandOnClickNode: false,
          editFlag: false,
          deleteFlag: false,
          uploadFlag: true,
          downloadFlag: true,
          addNodeFlag: false
        }
      }
    },
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    },
    treeKeys: {
      type: Object,
      default: () => {
        return {
          keys: [],
          keysData: []
        }
      }
    }
  },
  data() {
    return {
      errorMsg: ''
    }
  },
  methods: {
    validateName() {
      this.errorMsg = this.formData.groupLayerName === '' ? '请输入资源图层名称' : ''
    },
    handleSubmit() {
      this.$emit('update:layersManageVisible', false)
      this.$emit('submit-layers', this.state, this.treeData)
    },
    handleClose() {
      this.$emit('update:layersManageVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.guoup-name{
  line-height: 36px;
  margin: 0 auto;
  border-bottom: 1px solid #d6d6d6;
  .error-msg{
    color: #f56c6c;
    font-size: 12px;
    height: 16px;
    line-height: 16px;
    padding-top: 4px;
  }
}
</style>
