<template>
  <el-dialog
    v-loading.lock="loading"
    class="dialog"
    :title="title"
    :visible="visible"
    :width="width"
    :close-on-click-modal="false"
    :append-to-body="true"
    :before-close="handleClose"
    @close="handleClose"
    @open="handleOpen"
  >
  <template v-if="this.$slots.tabs" #title>
    <span class="el-dialog__title">{{ title }}</span>
    <slot name="tabs" />
  </template>
    <el-scrollbar
      class="el-scroll"
    >
      <div class="content-container">
        <slot name="content" />
      </div>
    </el-scrollbar>
    <div
      v-if="isShowBtn"
      slot="footer"
      footer-align="center"
      class="dialog-footer"
    >
      <el-button size="mini" @click="handleClose">取消</el-button>
      <el-button
        type="primary"
        size="mini"
        :disabled="disabled"
        @click="handleSubmit"
      > {{ submitBtnName }}</el-button>
      <slot name="btn" />
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '查看'
    },
    width: {
      type: String,
      default: '30%'
    },
    submitBtnName: {
      type: String,
      default: '确定'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    isShowBtn: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClose() {
      this.$emit('cancel')
    },
    handleSubmit() {
      this.$emit('submit')
    },
    handleOpen() {
      this.$emit('open')
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  /deep/ .el-dialog__body {
    padding: 0;
  }
  .content-container {
     /* padding: $dialog-container-padding; */
  }
}
.el-scroll{
  /deep/ .el-scrollbar__wrap {
    max-height: 50vh;
    overflow: auto;
    overflow-x: hidden !important;
    padding-right: 17px;
  }
}
</style>
