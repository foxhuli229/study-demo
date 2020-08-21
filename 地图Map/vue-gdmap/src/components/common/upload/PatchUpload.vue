<template>
  <div class="upload">
    <div class="box">
      <div v-if="fileStatus && isShowProgress" class="progress">
        <div class="left-container">
          <div class="hd">
            <p v-if="fileStatus !== 'error'">已完成{{ progress }}% 上传速度：{{ speed }}KB/s</p>
            <p v-else>上传出错，请重试!</p>
            <div>
              <i v-if="fileStatus !== 'uploading'" class="icon-continue" @click="handleContinueUpload" />
              <i v-if="fileStatus === 'uploading'" class="icon-pause" @click="handlePauseUpload" />
            </div>
          </div>
          <div class="progress-box">
            <div :style="{'width': `${progress}%`}" class="body" />
          </div>
        </div>
        <el-button
          size="mini"
          @click="handleCancelUpload"
        >
          {{ fileStatus !== 'uploading' ? '已暂停' : '上传中' }}<i class="cancel-upload el-icon--right" />
        </el-button>
      </div>
      <slot name="upload-btn" :loading="!!fileStatus">
        <el-button
          v-if="!fileStatus || !isShowProgress"
          :type="uploadBtnType"
          size="mini"
          :loading="!!fileStatus"
          @click="handleClickFileButton"
        >
          {{ uploadBtnName }}
        </el-button>
      </slot>
      <input
        ref="select-file-input"
        type="file"
        style="display: none;"
        :accept="accept"
        @change="handleFileSelected"
      >
    </div>
    <uploader
      ref="uploader"
      class="uploader-app"
      :options="options"
      @file-success="onFileSuccess"
      @file-progress="onFileProgress"
      @file-error="onFileError"
    >
      <uploader-unsupport />
    </uploader>
  </div>
</template>
<script>
import fileApi from '@/api/common/file'
import { generateUUID, getFileExtension, getFileType } from '@/utils/file-util'
import { secondFormatHMS } from '@/utils/date-util'
import { mapGetters } from 'vuex'
/*
  当组件在dialog中使用时，当dialog切换隐藏显示时，请调用一次initializeUploader方法重置组件！！
 */
/*
  基本用法
  <patchUpload
    fileType="asdasd"
    fileTypeLimit="mp4.avi"
    @upload-success="updateList">
    <template #upload-btn="scope">  //自定义上传按钮，请用refs调用handleClickFileButton方法
      <button>上传</button>
    </template>
  </patchUpload>
 */
export default {
  props: {
    // 默认按钮文字
    uploadBtnName: {
      type: String,
      default: '上传'
    },
    // 默认按钮类型
    uploadBtnType: {
      type: String,
      default: 'primary'
    },
    // 是否显示进度条
    isShowProgress: {
      type: Boolean,
      default: false
    },
    // 请求接口时传给后台的type字段,必传
    fileType: {
      type: String,
      required: true
    },
    // 判断只能上传一个文件的场景,选传
    hasFileName: {
      type: Boolean,
      default: false
    },
    // 允许的上传文件类型，必传
    fileTypeLimit: {
      type: String,
      required: true
    },
    // 允许的上传文件类型的大小
    fileSizeLimit: {
      type: Number,
      default: 50
    },
    // 是否需要获取视频时长
    isFetchVideoDuration: {
      type: Boolean,
      default: false
    },
    // 上传类型，选传
    subType: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      accept: null,
      fileKey: null,
      uploadedChunk: [],
      uploaderInstance: null,
      fileStatus: null,
      options: {
        target: fileApi.patchUpload, // 目标上传 URL
        singleFile: true,
        withCredentials: true,
        testChunks: false,
        checkChunkUploadedByResponse: (chunk) => {
          if (this.uploadedChunk.length > 0 && this.uploadedChunk.indexOf(chunk.offset + 1) >= 0) {
            return true
          } else {
            return false
          }
        },
        // simultaneousUploads: 4,
        chunkSize: '1194304', // 分块大小
        fileParameterName: 'file', // 上传文件时文件的参数名，默认file
        maxChunkRetries: 5, // 最大自动失败重试上传次数
        // generateUniqueIdentifier: (file) => {
        //   return md5(file.name)
        // },
        headers: {
          Authorization: null
        },
        query: (upload, chunk, isTest) => {
          return {
            key: this.fileKey,
            type: this.fileType
          }
        },
        processResponse: (response, cb, file, chunk) => {
          try {
            if (JSON.parse(response)['code'] === 200) {
              this.uploadedChunk.push(chunk.offset + 1)
              cb()
            } else {
              if (this.isShowProgress) {
                this.uploaderInstance.pause()
                this.fileStatus = this.uploaderInstance.fileStatusText['error']
              } else {
                this.initializeUploader(file)
                this.$message.error('上传失败')
              }
            }
          } catch (e) {
            this.initializeUploader(file)
            this.$message.error('上传失败')
          }
        }
      },
      progress: 0,
      speed: 0
    }
  },
  computed: {
    ...mapGetters('user', [
      'token'
    ])
  },
  created() {
    this.options.headers.Authorization = this.token
    this.accept = this.fileTypeLimit.replace(/\./g, ',.').replace(/,/, '')
    this.initializeUploader()
  },
  methods: {
    handleClickFileButton() {
      if (this.hasFileName) {
        this.$message.warning('请先删除已上传文件')
        return false
      }
      this.$refs['select-file-input'].click()
    },
    handleFileSelected() {
      const fileSelected = this.$refs['select-file-input'].files[0]
      if (!fileSelected) {
        // 未选择文件
        return
      }
      // 通过文件拓展名判断文件类型
      if (this.fileTypeLimit.indexOf(getFileExtension(fileSelected.name)) !== -1) {
        if (this.fileSizeLimit * 1024 * 1024 < fileSelected.size) {
          return this.$message({
            type: 'error',
            message: `该文件类型的大小不能超过${this.fileSizeLimit}MB`,
            duration: 5000
          })
        }
        if (fileSelected.name.split('.')[0].length > 128) {
          return this.$message({
            type: 'error',
            message: `文件名长度不能大于128`,
            duration: 5000
          })
        }
        this.uploadFile(fileSelected)
      } else {
        let msg
        if (this.fileTypeLimit[0] !== '.') {
          msg = this.fileTypeLimit.replace(/[.]/g, '、')
        } else {
          msg = this.fileTypeLimit.replace(/[.]/g, '、').replace('、', '')
        }
        this.$message({
          type: 'error',
          message: `仅支持${msg}格式`,
          duration: 5000
        })
      }
    },
    uploadFile(file) {
      this.uploaderInstance.addFile(file)
      this.uploaderInstance.upload()
      this.fileStatus = this.uploaderInstance.fileStatusText['uploading']
    },
    onFileProgress(rootFile, file, chunk) {
      this.fileStatus = this.uploaderInstance.fileStatusText['uploading']
      this.progress = (rootFile.progress() * 100).toFixed(2)
      this.speed = parseInt(rootFile.averageSpeed / 1024)
    },
    async onFileSuccess(rootFile, file, message, chunk) {
      const data = {
        fileName: file.name,
        fileSize: file.size,
        key: this.fileKey,
        type: this.fileType,
        subType: this.subType
      }
      const res = await fileApi.mergeChunk(data).catch(() => {
        this.initializeUploader(file)
        this.$message.success('上传失败')
      })
      if (res.code === 200) {
        const relativePath = res.data.filePath
        if (this.isFetchVideoDuration && getFileType(relativePath) === 'video') {
          const res1 = await fileApi.getVideoDuration({ relativePath })
          if (res1.data.code === 200) {
            const duration = secondFormatHMS(parseInt(res1.data.data / 1000))
            const data = {
              ...res.data,
              duration
            }
            this.$emit('upload-success', data)
            this.$message.success('上传成功')
          } else if (res1.data.code !== 200) {
            this.$message.error(res1.msg || '视频时长获取失败')
          }
        } else {
          this.$emit('upload-success', res.data)
          this.$message.success('上传成功')
        }
      } else {
        this.$message.error(res.msg || '上传失败')
      }
      this.initializeUploader(file)
      this.uploaderInstance.removeFile(file)
    },
    onFileError(rootFile, file, message, chunk) {
      if (this.isShowProgress) {
        this.fileStatus = this.uploaderInstance.fileStatusText['error']
        this.uploaderInstance.pause()
      } else {
        this.initializeUploader(file)
        this.$message.success('上传失败')
      }
    },
    handleContinueUpload() {
      this.uploaderInstance.resume()
      this.fileStatus = this.uploaderInstance.fileStatusText['uploading']
    },
    handlePauseUpload() {
      this.uploaderInstance.pause()
      this.fileStatus = this.uploaderInstance.fileStatusText['paused']
    },
    handleCancelUpload() {
      this.uploaderInstance.cancel()
      this.initializeUploader()
    },
    initializeUploader(file) {
      this.fileKey = generateUUID()
      this.fileStatus = null
      this.uploadedChunk = []
      this.progress = 0
      this.speed = 0
      this.$nextTick(() => {
        this.uploaderInstance = this.$refs.uploader.uploader
        file && this.uploaderInstance.removeFile(file)
        this.$refs['select-file-input'].value = ''
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .upload {
    display: inline-block;
  }
  .box {
    line-height: 28px;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 14px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: #444;
    }
    .progress {
      flex: 1;
      color: #1399F8;
      font-size: 12px;
      padding-left: 40px;
      display: flex;
      .left-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-right: 20px;
        .hd {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        .progress-box {
          width: 100%;
          background: #DCDFE6;
          height: 3px;
          .body {
            height: 100%;
            background: #1399F8;
          }
        }
      }
    }
  }
  .cancel-upload {
      width: 12px;
      height: 12px;
      display: inline-block;
      vertical-align: middle;
      background: url("./images/delete_title_img.png")
        center no-repeat;
  }
  .icon-continue {
    width: 20px;
    height: 20px;
    display: block;
    background: url("./images/upload_continue.png")
      center no-repeat;
  }
  .icon-pause {
    width: 20px;
    height: 20px;
    display: block;
    background: url("./images/upload_pause.png")
      center no-repeat;
  }
</style>
