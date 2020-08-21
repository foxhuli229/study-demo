export const previewFileMixin = {
  data() {
    return {
      isPreviewFileVisible: false,
      previewFileKey: null,
      previewFileUrl: null
    }
  },
  methods: {
    handlePreviewFile(fileInfo) {
      // 预览PPT，需要提示
      if (fileInfo.suffix === 'ppt' || fileInfo.suffix === 'pptx') {
        this.$confirm('该类型文件无法预览特殊字体，如需查看完整内容，请下载后查看',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.previewFile(fileInfo)
          })
          .catch(() => {
          })
      } else {
        this.previewFile(fileInfo)
      }
    },
    previewFile(fileInfo) {
      if (fileInfo.previewPath) {
        // 已有预览地址
        this.previewFileUrl = fileInfo.previewPath
        this.previewFileKey = null
      } else {
        this.previewFileUrl = null
        this.previewFileKey = fileInfo.id
      }
      this.isPreviewFileVisible = true
    }
  }
}
