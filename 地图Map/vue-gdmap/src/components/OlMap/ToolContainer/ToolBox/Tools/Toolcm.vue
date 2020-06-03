<template>
  <toolcom :item="item" />
</template>
<script>
import ToolBox from '@/components/OlMap/util/tool/tool-box.js'
export default {
  name: 'Toolcm',
  components: {
    Toolcom: () => import('./ToolCom')
  },
  data() {
    return {
      item: {
        className: 'toolcm',
        name: '测面',
        open: false
      }
    }
  },
  computed: {
    olmap() {
      return this.$store.state.olmap.olmap
    }
  },
  watch: {
    'item': {
      handler: function(newVal, oldVal) {
        if (newVal.open) {
          if (this.tool) {
            this.tool.close()
            delete this.tool
            this.tool = null
          }
          this.tool = new ToolBox(this.olmap.map, 'area', this.olmap.projection)
          this.tool.open()
        } else {
          this.clear()
        }
      },
      deep: true
    }
  },
  mounted() {
    // 清空
    this.$on('clear', this.clear)
  },
  methods: {
    clear() {
      if (this.tool) {
        this.tool.close()
        delete this.tool
        this.tool = null
      }
    }
  }
}
</script>
