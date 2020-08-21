<!-- 拖拽第二种方式，效果还可以，拖拽比较稳定-->
<template>
  <div class="move-popup" ref="movePopupDiv" @mousedown="mouseDownHandleelse($event)" @mouseup="mouseUpHandleelse($event)">
    1111111
  </div>
</template>

<script>
export default {
  name: 'MovePopup',
  data() {
    return {
      moveDataelse: {
        x: null,
        y: null
      }
    }
  },
  methods: {
    mouseDownHandleelse(event) {
      this.moveDataelse.x = event.pageX - this.$refs['movePopupDiv'].offsetLeft
      this.moveDataelse.y = event.pageY - this.$refs['movePopupDiv'].offsetTop
      event.currentTarget.style.cursor = 'move'
      window.onmousemove = this.mouseMoveHandleelse
    },
    mouseMoveHandleelse(event) {
      const moveLeft = event.pageX - this.moveDataelse.x + 'px'
      const moveTop = event.pageY - this.moveDataelse.y + 'px'
      this.$refs['movePopupDiv'].style.left = moveLeft
      this.$refs['movePopupDiv'].style.top = moveTop
    },
    mouseUpHandleelse(event) {
      window.onmousemove = null
      event.currentTarget.style.cursor = 'move'
      console.log('鼠标松开了')
    }
  }
}
</script>

<style lang="scss" scoped>
.move-popup{
  position: absolute;
  width: 337px;
  height: auto;
  top: 100px;
  left: 20px;
  z-index: 1002;
  &:hover{
    cursor: pointer;
  }
}
</style>
