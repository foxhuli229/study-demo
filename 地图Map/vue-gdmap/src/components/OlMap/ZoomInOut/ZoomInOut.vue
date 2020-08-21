<template>
  <div :style="location" class="zoom-in-out">
    <div class="in">
      <a href="javascript:;" @click="toggleIn">
        <span title="放大" class="in-images" :style="inImage" />
      </a>
    </div>
    <div class="out">
      <a href="javascript:;" @click="toggleOut">
        <span title="缩小" class="out-images" :style="outImage" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZoomInOut',
  props: {
    location: {
      type: Object,
      default: () => {
        return {
          right: '20px',
          bottom: '50px'
        }
      }
    }
  },
  computed: {
    map() {
      return this.$store.state.olmap.olmap.map
    },
    configObj() {
      return this.$store.state.olmap.configObj
    },
    inImage() {
      const olmapUrl = this.configObj.olmapUrl
      const inUrl = `background-image: url('${olmapUrl}/static/olmap/images/in-map.png')`
      return inUrl
    },
    outImage() {
      const olmapUrl = this.configObj.olmapUrl
      const inUrl = `background-image: url('${olmapUrl}/static/olmap/images/out-map.png')`
      return inUrl
    }
  },
  mounted() {
    // console.log(this.location)
  },
  methods: {
    toggleIn() {
      this.changeZoom('in')
    },
    toggleOut() {
      this.changeZoom('out')
    },
    changeZoom(val) {
      const view = this.map.getView()
      const zoom = this.map.getView().getZoom()
      val === 'in' ? view.setZoom(zoom + 1) : view.setZoom(zoom - 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.zoom-in-out{
  z-index: 1001;
  position: absolute;
  width: 30px;
  height: 60px;
  background:white;
  border-radius: 10%;
  .in{
    height: calc(100%/2);
    border-bottom: 1px solid #b3d8ff;
    .in-images{
      width: 30px;
      height: 28px;
      display: inline-block;
      background-repeat: no-repeat;
      background-position: 0px 0px;
      background-size: 100% 100%;
    }
    &:hover{
      background-color: #b3d8ff;
    }
  }
  .out{
    height: calc(100%/2);
    .out-images{
      width: 30px;
      height: 28px;
      display: inline-block;
      background-repeat: no-repeat;
      background-position: 0px 0px;
      background-size: 100% 100%;
    }
    &:hover{
      background-color: #b3d8ff;
    }
  }
}
</style>
