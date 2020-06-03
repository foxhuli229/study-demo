<template>
  <toolcom :item="item" />
</template>

<script>
import ToolBox from '@/components/OlMap/util/tool/tool-box.js'
import Emitter from '@/components/OlMap/util/minxins/emitter'
export default {
  name: 'Toolcl',
  components: {
    Toolcom: () => import('./ToolCom')
  },
  mixins: [Emitter],
  data() {
    return {
      item: {
        className: 'toolcl',
        name: '测量',
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
          this.tool = new ToolBox(this.olmap.map, 'LineString', this.olmap.projection)
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
    /**
     *  经过函数回调
     * **/
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

<style scoped>

</style>
