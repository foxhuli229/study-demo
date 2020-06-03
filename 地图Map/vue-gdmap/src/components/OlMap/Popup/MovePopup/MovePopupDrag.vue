<!-- 拖拽第一种方式，效果不是很理想-->
<template>
  <div class="move-popup" v-drag>
    <div v-if="$slots.movePopup" slot="movePopup">
      <slot name="movePopup" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovePopupDrag',
  // 自定义指令
  directives: {
    drag: {
      // 指令的定义
      bind: function(el) {
        const odiv = el // 获取当前元素
        el.onmousedown = (e) => {
          // 算出鼠标相对元素的位置
          const disX = e.clientX - odiv.offsetLeft
          const disY = e.clientY - odiv.offsetTop
          let left = ''
          let top = ''
          document.onmousemove = (e) => {
            // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            left = e.clientX - disX
            top = e.clientY - disY
            // 绑定元素位置到positionX和positionY上面
            // 移动当前元素
            odiv.style.left = left + 'px'
            odiv.style.top = top + 'px'
          }
          document.onmouseup = (e) => {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
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
  transition: left .5s ease;
  z-index: 1001;
  box-shadow: 1px 0 5px rgba(0,0,0,.1);
  border-collapse: separate;
  &:hover{
    cursor: pointer;
  }
}
</style>
