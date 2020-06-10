<!-- 拖拽第三种方式，效果还可以，拖拽更稳定稳定，能拖能拽-->
<template>
  <div
    v-if="popupProperty.show"
    v-dragx="dragBox"
    class="move-popup-dragx"
    :style="computeStyle"
    @bindUpdate="bindUpdate"
  >
    <div v-if="$slots.popupAll" slot="popupAll" class="ol-popup-dragx">
      <a v-show="isFull" class="icon-container" :title="text" @click="toggleFullScreen">
        <svg-icon :icon-class="classStr" class="color-white-dragx" />
      </a>
      <a href="#" class="ol-popup-closer-dragx color-white-dragx" @click="closerPopup" />
      <slot name="popupAll" />
    </div>
    <div v-else-if="$slots.popupAll2" slot="popupAll2" class="ol-popup-dragx">
      <a v-show="isFull" class="icon-container" :title="text" @click="toggleFullScreen">
        <svg-icon :icon-class="classStr" class="color-black-dragx" />
      </a>
      <a href="#" class="ol-popup-closer-dragx color-black-dragx" @click="closerPopup" />
      <slot name="popupAll2" />
    </div>
    <div v-else class="ol-popup-dragx">
      <div v-if="$slots.popup" class="title-dragx drag-box">
        <a class="popup-name-dragx">{{ popupProperty.title }}</a>
        <a v-show="isFull" class="icon-container" :title="text" @click="toggleFullScreen">
          <svg-icon :icon-class="classStr" class="color-white-dragx" />
        </a>
        <a href="#" class="ol-popup-closer-dragx color-white-dragx" @click="closerPopup" />
      </div>
      <div v-if="$slots.popup" slot="popup" class="content-dragx">
        <slot name="popup" />
      </div>
      <div v-if="$slots.popup2" class="title2-dragx drag-box">
        <a class="popup-name-dragx">{{ popupProperty.title }}</a>
        <a v-show="isFull" class="icon-container" :title="text" @click="toggleFullScreen">
          <svg-icon :icon-class="classStr" />
        </a>
        <a href="#" class="ol-popup-closer-dragx" @click="closerPopup" />
      </div>
      <div v-if="$slots.popup2" slot="popup2" class="content-dragx">
        <slot name="popup2" />
      </div>
      <div v-if="$slots.popup3" class="title2-dragx drag-box">
        <a class="popup-name-dragx">{{ popupProperty.title }}</a>
        <a v-show="isFull" class="icon-container" :title="text" @click="toggleFullScreen">
          <svg-icon :icon-class="classStr" />
        </a>
        <a href="#" class="ol-popup-closer-dragx" @click="closerPopup" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import '@/components/OlMap/util/drag/dragx.js'
import Emitter from '@/components/OlMap/util/minxins/emitter.js'
export default {
  name: 'MovePopupDragx',
  mixins: [Emitter],
  props: {
    popupProperty: {
      type: Object,
      default: () => {
        return {
          show: false,
          dragBarClass: 'drag-box',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          width: 0,
          height: 0
        }
      }
    },
    isFull: {
      type: Boolean,
      default: false
    },
    widthAuto: {
      type: Boolean,
      default: false
    },
    heightAuto: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dragBox: {
        dragBarClass: 'drag-box',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
        dirctDom: true,
        canDrag: true,
        resizeEdge: 10,
        canResize: true
      },
      isFullScreen: false,
      dragBoxFullScreen: {
        dragBarClass: '',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: 100,
        height: 100,
        dirctDom: true,
        canDrag: true,
        resizeEdge: 0,
        canResize: false
      }
    }
  },
  computed: {
    computeStyle() {
      const unit = this.isFullScreen ? '%' : 'px'
      const style = {
        width: this.dragBox.width + unit,
        height: this.dragBox.height + unit
      }
      if (this.dragBox.left !== 0) {
        const left = this.dragBox.left + unit
        this.$set(style, 'left', left)
      }
      if (this.dragBox.top !== 0) {
        const top = this.dragBox.top + unit
        this.$set(style, 'top', top)
      }
      if (this.dragBox.right !== 0) {
        const right = this.dragBox.right + unit
        this.$set(style, 'right', right)
      }
      if (this.dragBox.bottom !== 0) {
        const bottom = this.dragBox.bottom + unit
        this.$set(style, 'bottom', bottom)
      }
      if (this.dragBox.height !== 0) {
        if(this.heightAuto){
          if (this.isFullScreen) {
            const height = this.dragBox.height + unit
            this.$set(style, 'height', height)
          } else {
            this.$set(style, 'height', 'auto')
          }
        }else {
          const height = this.dragBox.height + unit
          this.$set(style, 'height', height)
        }
      } else {
        this.$set(style, 'height', 'auto')
      }
      if (this.dragBox.width !== 0) {
        if (this.widthAuto) {
          if (this.isFullScreen) {
            const width = this.dragBox.width + unit
            this.$set(style, 'width', width)
          } else {
            this.$set(style, 'width', 'auto')
          }
        } else {
          const width = this.dragBox.width + unit
          this.$set(style, 'width', width)
        }
      } else {
        this.$set(style, 'width', 'auto')
      }
      if (this.isFullScreen) {
        this.$set(style, 'z-index', 1010)
      } else {
        this.$set(style, 'z-index', 1002)
      }
      return style
    },
    text() {
      return this.isFullScreen ? '缩小' : '放大'
    },
    classStr() {
      return this.isFullScreen ? 'tuichuquanping' : 'quanping'
    }
  },
  mounted() {
    this.dragBox = Object.assign({}, this.dragBox, this.popupProperty)
  },
  methods: {
    bindUpdate(event) {
      const data = event.detail
      this.dragBox.top = data.top
      this.dragBox.left = data.left
      this.dragBox.width = data.width
      this.dragBox.height = data.height
      this.$emit('handleBindUpdate', data)
    },
    closerPopup() {
      this.$emit('closer-popup', false)
      this.popupProperty.show = false
    },
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen
      if (this.isFullScreen) {
        this.dragBox = Object.assign({}, this.dragBox, this.dragBoxFullScreen)
      } else {
        this.dragBox = Object.assign({}, this.dragBox, this.popupProperty)
      }
      this.$emit('move-screen', this.isFullScreen) // 放大
      this.broadcast('EchartsBox', 'on-echarts-box-drag')// 消息传播
    }
  }
}
</script>

<style lang="scss">
.move-popup-dragx{
  position:absolute;
  z-index: 1002;
  word-wrap:break-word;
  overflow-wrap:break-word;
  &:hover{
    cursor: pointer;
  }
  .ol-popup-dragx{
    width: calc(100%);
    height: calc(100%);
    border-radius:4px;
    background: white;
    z-index: 999;
    .title-dragx{
      width: calc(100%);
      padding: 10px;
      border-bottom: 1px solid #dddddd;
      font-size: 14px;
      color: white;
      display: inline-flex;
      min-width: 220px;
      background-image: linear-gradient(to right, rgba(64, 158, 255, 0.77), #409eff);;
      .popup-name-dragx{
        font-size: 14px;
        width: auto;
        white-space:nowrap;     //强制不换行
        overflow:hidden;           //自动隐藏文字
        text-overflow: ellipsis;    //文字隐藏后添加省略号
        -o-text-overflow:ellipsis; //适用于opera浏览器
        max-width: 220px;
      }
    }
    .title2-dragx{
      width: calc(100%);
      padding: 10px;
      border-bottom: 1px solid #dddddd;
      font-size: 12px;
      color: #000000;
      display: inline-flex;
      min-width: 220px;
      .popup-name-dragx{
        font-size: 14px;
        width: auto;
        white-space:nowrap;     //强制不换行
        overflow:hidden;           //自动隐藏文字
        text-overflow: ellipsis;    //文字隐藏后添加省略号
        -o-text-overflow:ellipsis; //适用于opera浏览器
        max-width: 220px;
      }
    }
    .content-dragx {
      width: calc(100%);
      top: 0px;
      position: relative;
      padding: 10px;
    }
  }
  .icon-container{
    text-decoration: none;
    position: absolute;
    top: 8px;
    right: 25px;
  }
  .ol-popup-closer-dragx {
    text-decoration: none;
    position: absolute;
    top: 8px;
    right: 5px;
  }
  .ol-popup-closer-dragx:after {
    content: "✖";
  }
  .color-white-dragx {
    color: white;
  }
  .color-black-dragx{
    color: black;
  }
}
.bindBox{
  clear: both;
  margin-top:5px;
}
.popup-all-dragx{
  width: 100%;
  height: 100%;
  background-color:white;
  font-size: 12px;
  .div-box-dragx{
    width: 100%;
    height: calc(100% - 38px);
    font-size: 12px;
    padding: 10px;
    position: relative;
  }
}
</style>
