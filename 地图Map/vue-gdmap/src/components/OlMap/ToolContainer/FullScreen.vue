<template>
  <div class="t-item">
    <a href="javascript:;" @click="toggleFullScreen">
      <span class="com-icon tool-icon svg-container" :class="{active: isFullScreen}">
        <svg-icon :icon-class="classStr" />
      </span>
      <span class="tool-text" :class="{active: isFullScreen }">
        {{ text }}
      </span>
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('app', [
      'isFullScreen'
    ]),
    text() {
      return this.isFullScreen ? '退出全屏' : '全屏'
    },
    classStr() {
      return this.isFullScreen ? 'tuichuquanping' : 'quanping'
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', () => {
        if (!this.getFullScreen()) {
          this.exitFullScreen()
        }
      })
      document.addEventListener('keyup', (e) => {
        // 此处填写你的业务逻辑即可
        if (e.keyCode === 27) {
          this.exitFullScreen()
        }
      })
    })
  },
  methods: {
    getFullScreen() {
      return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
    },
    toggleFullScreen() {
      this.isFullScreen ? this.exitFullScreen() : this.fullScreen()
    },
    exitFullScreen() {
      if (window.ActiveObject || 'ActiveXObject' in window) {
        const element = document.documentElement
        // IE ActiveXObject
        if (window.ActiveXObject) {
          const WsShell = new window.ActiveXObject('WScript.Shell')
          WsShell.SendKeys('{F11}')// 写退出全屏后的执行函数
        } else if (element.requestFullScreen) { // HTML5 W3C 提议
          document.exitFullscreen()
          // 写退出全屏后的执行函数
        } else if (element.msRequestFullscreen) { // IE 11
          document.msExitFullscreen()
          // 写退出全屏后的执行函数
        } else if (element.webkitRequestFullScreen) { // Webkit (works in Safari5.1 and Chrome 15)
          document.webkitCancelFullScreen()
          // 写退出全屏后的执行函数
        } else if (element.mozRequestFullScreen) { // Firefox (works in nightly)
          document.mozCancelFullScreen()
          // 写退出全屏后的执行函数
        }
      } else {
        if (this.getFullScreen()) {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
        }
      }
      this.$store.dispatch('app/setFullScreen', false)
    },
    fullScreen() {
      if (window.ActiveObject || 'ActiveXObject' in window) {
        const element = document.documentElement
        // IE 10及以下ActiveXObject
        if (window.ActiveXObject) {
          const WsShell = new window.ActiveXObject('WScript.Shell')
          WsShell.SendKeys('{F11}')
          // 写全屏后的执行函数
        } else if (element.requestFullScreen) { // HTML W3C 提议
          element.requestFullScreen()
          // 写全屏后的执行函数
        } else if (element.msRequestFullscreen) { // IE11
          element.msRequestFullscreen()// 写全屏后的执行函数
        } else if (element.webkitRequestFullScreen) { // Webkit (works in Safari5.1 and Chrome 15)
          element.webkitRequestFullScreen() // 写全屏后的执行函数
        } else if (element.mozRequestFullScreen) { // Firefox (works in nightly)
          element.mozRequestFullScreen() // 写全屏后的执行函数
        }
      } else {
        const docElm = document.documentElement
        if (docElm.requestFullscreen) { // W3C
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) { // FireFox
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) { // Chrome等
          docElm.webkitRequestFullScreen()
        } else if (docElm.msRequestFullscreen) { // IE11
          docElm.msRequestFullscreen()
        } else {
          alert('浏览器版本过低，不支持全屏操作！')
          return null
        }
      }
      this.$store.dispatch('app/setFullScreen', true)
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon-tuichuquanping:before{
    padding-right: 5px;
  }
  .icon-quanping1:before {
    padding-right: 5px;
  }
  .t-item{
    &:hover{
      .com-icon, .tool-text{
        color: #409eff;
      }
    }
  }
</style>
