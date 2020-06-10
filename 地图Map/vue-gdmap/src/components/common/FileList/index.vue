<template>
  <div style="margin-top: 10px">
    <el-table
      ref="table"
      v-loading.lock="loading"
      :data="data"
      size="mini"
      txt-align="center"
      element-loading-text="拼命加载中"
    >
      <el-table-column
        v-for="item in tableHead"
        :key="item.label"
        :label="item.label"
        :prop="item.prop"
        :show-overflow-tooltip="item.showTooltip"
        :formatter="item.formatter"
        align="center"
      />

      <el-table-column
        ref="222"
        fixed="right"
        type="text"
        label="操作"
        align="center"
        :width="operationColumnWidth"
      >
        <template slot-scope="scope">
          <template v-if="showBtn">
            <el-button type="text" @click="handlePreviewFile(scope.row)">预览</el-button>
            <el-button type="text" @click="handleDownload(scope.row)">下载</el-button>
          </template>
          <slot name="operation" :scope="scope" />
        </template>
      </el-table-column>
    </el-table>
    <PreviewFileByUrl
      v-if="isPreviewFileVisible"
      :file-key="previewFileKey"
      :url="previewFileUrl"
      :close.sync="isPreviewFileVisible"
    />
  </div>
</template>
<script>
import { downloadFileByUrl } from '@/utils/file-util'
import { previewFileMixin } from '@/components/common/PreviewFile/mixins'
import { mapGetters } from 'vuex'
export default {
  components: {
    PreviewFileByUrl: () => import('@/components/common/PreviewFile')
  },
  mixins: [
    previewFileMixin
  ],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    operationColumnWidth: {
      type: Number,
      default: 130
    },
    showBtn: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableHead: [
        {
          prop: 'name',
          label: '文件名称',
          showTooltip: true
        },
        {
          prop: 'suffix',
          label: '文件类型',
          showTooltip: true
        },
        {
          prop: 'size',
          label: '文件大小',
          showTooltip: true
        }
      ],
      initFlag: false
    }
  },
  computed: {
    ...mapGetters({ appConfig: 'app/appConfig'})
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.table.$children[this.$refs.table.$children.length - 1].$children.forEach(res => {
        if (res.$el.tagName === 'BUTTON') {
          res.$el.disabled = false
          res.$el.classList.remove('is-disabled')
        }
      })
    })
  },
  methods: {
    handleDelete(index) {
      this.data.splice(index, 1)
    },
    handleDownload(row) {
      const filePath = row.path
      const url = `${this.appConfig.apiContext}${filePath}`
      downloadFileByUrl(url, row.name)
    }
  }
}
</script>
