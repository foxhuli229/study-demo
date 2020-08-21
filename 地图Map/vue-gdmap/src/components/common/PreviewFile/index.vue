<template>
  <div id="preview-file">
    <div class="top-box">
      <span
        v-if="fileType === 'pdf'"
        class="pdf-page-control-box"
      >
        <i
          class="el-icon-arrow-up btn-page"
          @click="handlePdfPrePage"
        />

        &nbsp;&nbsp;

        <span
          class="cur-page"
          size="mini"
        >
          {{pdfCurPage}}
        </span>

        &nbsp;

        <span class="divider"></span>

        &nbsp;

        <span>{{pdfNumPages}}页</span>

        &nbsp;&nbsp;

        <i
          class="el-icon-arrow-down btn-page"
          @click="handlePdfNextPage"
        />
      </span>

      <div class="btn-box">
        <el-button
          ref="close"
          type="primary"
          size="mini"
          @click="handleClose"
          class="btn-close"
        >
          关闭
        </el-button>
      </div>
    </div>
    <div
      class="preview-content"
      v-loading.lock="loading"
      element-loading-text="加载中..."
    >
      <!-- 显示图片 -->
      <img
        v-if="fileType === 'image'"
        :src="fileUrl"
        class="image"
      />

      <!-- 显示PDF -->
      <div
        class="pdf-box"
        v-if="fileType === 'pdf'"
      >
        <pdf
          :src="fileUrl"
          :page="pdfCurPage"
          @page-loaded="pdfCurPage = $event"
          @num-pages="pdfNumPages = $event"
          class="pdf"
        >
        </pdf>
      </div>

      <!-- 显示视频 -->
      <video
        v-if="fileType === 'video'"
        :src="fileUrl"
        width="640"
        height="360"
        controls
        controlslist="nodownload"
      >
        当前浏览器不支持视频播放
      </video>

      <!-- 播放音频 -->
      <audio
        v-if="fileType === 'audio'"
        :src="fileUrl"
        width="160"
        height="50"
        controls
        controlslist="nodownload"
      >
        当前浏览器不支持音频播放
      </audio>

    </div>
  </div>
</template>
<PreviewFileByUrl
  v-if="isPreviewFileVisible"
  :fileKey="previewFileKey"
  :url="previewFileUrl"
  :close.sync="isPreviewFileVisible"
/>
<script>
import fileApi from '@/api/common/file';
import pdf from 'vue-pdf';
import { getFileType } from '@/utils/file-util';
import { mapGetters } from 'vuex'

export default {
  components: {
    pdf
  },
  props: {
    fileKey: { // 文件id
      type: Number,
      default: ''
    },
    url: { // 文件预览地址
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      fileType: '',
      fileUrl: '',
      pdfCurPage: 1,
      pdfNumPages: 0
    }
  },
  computed: {
    ...mapGetters({ appConfig: 'app/appConfig'})
  },
  created() {
    if (this.fileKey) {
      const param = {
          id: this.fileKey
      }
      fileApi.getPreviewFile(param)
        .then(res => {
          this.handleFileByFileKey(res);
        })
    } else {
      // 直接使用文件地址
      this.fileType = getFileType(this.url)
      this.fileUrl = this.url.indexOf('http') !== -1 ? this.url : `${this.appConfig.apiContext}${this.url}`
    }
  },
  mounted() {
    this.$refs.close.$el.disabled = false
    this.$refs.close.$el.classList.remove('is-disabled')
  },
  methods: {
    handleClose() {
      this.$emit('update:close', false)
    },
    handleFileByFileKey(res) {
      if (res.code === 200) {
        this.fileType = getFileType(res.data)
        this.fileUrl = `${this.appConfig.apiContext}${res.data}`
      }
    },
    handlePdfPrePage() {
      if (this.pdfCurPage > 1) {
        this.pdfCurPage -= 1
        let dom = document.querySelector('.pdf-box')
        dom.scrollTop = 0
      }
    },
    handlePdfNextPage() {
      if (this.pdfCurPage < this.pdfNumPages) {
        this.pdfCurPage += 1
        let dom = document.querySelector('.pdf-box')
        dom.scrollTop = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#preview-file {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;
  z-index: 2999;

  .top-box {
    width: 100%;
    height: 50px;
    background-color: #000000;
    padding: 0 1.5%;
    box-sizing: border-box;
    font-size: 12px;
    position: relative;
    color: #d4d4d4;
    user-select: none;

    .pdf-page-control-box {
      width: 170px;
      height: 50px;
      line-height: 50px;
      display: inline-block;
      position: absolute;
      left: 50%;
      margin-left: -85px;
      text-align: center;

      .btn-page {
        border-radius: 50%;
        padding: 3px;
        border: 1px solid #9e9e9e;
        cursor: pointer;
      }

      .cur-page {
        padding: 6px 12px;
        background-color: #262626;
      }

      .divider {
        height: 30px;
        border-left: 1px solid #d4d4d4;
      }
    }

    .btn-box {
      float: right;
      height: 50px;
      line-height: 50px;
      color: #9e9e9e;

      .btn-close {
        width: 90px;
      }
    }
  }

  .preview-content {
    width: 100%;
    height: calc(100% - 50px);
  }
  .image {
    max-width: 100%;
    max-height: calc(100% - 50px);
  }

  .pdf-box {
    width: 65%;
    min-width: 800px;
    height: calc(100vh - 50px);
    margin: 0 auto;
    overflow-y: auto;
    span {
      display: block !important;
    }
  }
}
</style>
