<template>
  <div class="export-box" :style="location">
    <el-button v-if="exportPdf" type="primary" size="mini" icon="el-icon-download" @click.stop="downloadMapByPDF">导出PDF</el-button>
    <el-button v-if="exportPng" type="primary" size="mini" icon="" @click.stop="downloadMapByPng">导出为图片</el-button>
  </div>
</template>

<script>
import { toJpeg, toPng } from 'html-to-image'
import jsPDF from 'jspdf'
export default {
  name: 'ExportBox',
  props: {
    exportPdf: {
      type: Boolean,
      default: false
    },
    exportPng: {
      type: Boolean,
      default: false
    },
    location: {
      type: Object,
      default: () => {
        return {
          right: '20px',
          bottom: '10px'
        }
      }
    }
  },
  computed: {
    map() {
      return this.$store.state.olmap.olmap.map
    }
  },
  methods: {
    downloadMapByPDF() {
      document.body.style.cursor = 'progress'
      const dims = {
        a0: [1189, 841],
        a1: [841, 594],
        a2: [594, 420],
        a3: [420, 297],
        a4: [297, 210],
        a5: [210, 148]
      }
      const exportOptions = {
        filter: (element) => {
          return true
        }
      }
      const format = 'a3'
      const dim = dims[format]
      this.map.renderSync()
      this.map.once('rendercomplete', (val) => {
        toJpeg(this.map.getTargetElement(), exportOptions).then((dataUrl) => {
          /*eslint-disable */
          let pdf = jsPDF('landscape', undefined, format);
          pdf.addImage(dataUrl, 'JPEG', 0, 0, dim[0], dim[1]);
          pdf.save('map.pdf');
          document.body.style.cursor = 'auto'
        });
      })
    },
    downloadMapByPng(){
      let exportOptions = {
        filter: function (element) {
          return true;
        }
      };
      let _this = this;
      this.map.once('rendercomplete', () => {
        toPng(this.map.getTargetElement(), exportOptions).then((dataURL) => {
          // console.log(dataURL);
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = dataURL;
          link.setAttribute('download', 'map.png')
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      });
      this.map.renderSync();
    }
  }
}
</script>

<style lang="scss" scoped>
.export-box{
  z-index: 1001;
  position: absolute;
  width: auto;
  height: auto;
}
</style>
