<template>
  <div v-show="showBox" id="layers-box" :style="computeStyle">
    <div id="layer_container_wrapper" :class="{expand: expflag}" @mouseover="mouseoverDiv" @mouseleave="mouseleaveDiv">
      <div class="layer_container">
        <template v-for="(layer,index) in layers">
          <!--v-if="!layer.active"  如果加上该判断属性，将判断点击谁谁消失，并且进行轮询-->
          <a v-if="index < maxLayerNum" v-show="layer.isShow == 1" :key="layer.id" class="layer-item layer_bg" :class="[{active: layer.active}, layer.id]" @click="switchMap(layer,index)">
            <img :src="icon[layer.id]">
            <span class="layer-tip">{{ layer.name }}</span>
          </a>
        </template>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    showBox: {
      type: Boolean,
      default: true
    },
    currentIndex: {
      type: Number,
      default: 0
    },
    expand: {
      type: Boolean,
      default: false
    },
    maxLayerNum: {
      type: Number,
      default: 3
    },
    bottom: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    },
    right: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      expflag: false,
      icon: {
        vec_type: require('@/components/OlMap/images/rnk.png'),
        img_type: require('@/components/OlMap/images/cih.png'),
        ter_type: require('@/components/OlMap/images/cth.png')
      }
    }
  },
  computed: {
    computeStyle() {
      const style = {}
      if (this.left !== 0) {
        const left = this.left + 'px'
        this.$set(style, 'left', left)
      }
      if (this.top !== 0) {
        const top = this.top + 'px'
        this.$set(style, 'top', top)
      }
      if (this.right !== 0) {
        const right = this.right + 'px'
        this.$set(style, 'right', right)
      }
      if (this.bottom !== 0) {
        const bottom = this.bottom + 'px'
        this.$set(style, 'bottom', bottom)
      }
      return style
    },
    layers() {
      return this.$store.state.olmap.layers
    },
    olmap() {
      return this.$store.state.olmap.olmap
    }
  },
  watch: {
    layers(val) {
      // 默认选中
      val.forEach((item, index) => {
        if (index === this.currentIndex) {
          this.switchMap(item, index)
        }
      })
    }
  },
  mounted() {
    this.expflag = this.expand
  },
  methods: {
    mouseoverDiv() {
      if (!this.expand) {
        this.expflag = true
      }
    },
    mouseleaveDiv() {
      if (!this.expand) {
        this.expflag = false
      }
    },
    switchMap(layer, index) { // 切换地图
      const mapType = layer.id.split('_')[0]
      if (!layer.active) { // 如果已经选中-不继续往下面执行
        // 切换样式
        this.switchStyle(this.layers, index)
        this.olmap.switchMapLayers(mapType)
      }
    },
    switchStyle: function(items, currentIndex) {
      items.forEach((item, i) => {
        if (i === currentIndex) {
          this.$set(item, 'active', true) // 添加active样式
        } else {
          this.$set(item, 'active', false) // 去除active样式
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #layers-box{
    position:absolute;
    z-index: 1;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.14);
    #layer_container_wrapper{
      .layer_container{
        height:60px;
        cursor:pointer;
        -webkit-transition-property:width,background-color;
        transition-property:width,background-color;
        -webkit-transition-duration:.4s;transition-duration:.4s;
        background-color: rgba(255, 255, 255, 0);
        .layer_bg{
          height:60px;
          width:70px;
          position:absolute;
          border-radius:2px;
          top:0px;
          box-sizing:border-box;
          border:1px solid transparent;
          border:1px solid rgba(153,153,153,153);
          -webkit-transition-property:left,background-image;
          transition-property:left,background-image;
          -webkit-transition-duration:.4s;transition-duration:.4s;
          >span{
            position:absolute;
            bottom:0;
            right:0;
            display:inline-block;
            padding:3px 3px 2px 4px;
            font-size:14px;
            height:16px;
            line-height:16px;
            text-align: center;
            color:#FFF;
            border:2px;
          }
          &.active{
            >span{
              background-color:#409eff;
            }
          }
          &:hover{
            border:1px solid #409eff;
            >span{
              background-color:#409eff;
            }
          }
        }
      }
    }
    /*地图*/
    .vec_type{
      z-index:4;
      left:10px;
      border-left:1px solid #409eff;
    }
    /*影像*/
    .img_type{
      left:35px;
      z-index:3;
      border-left:1px solid #409eff;
    }
    /*地形*/
    .ter_type{
      z-index:2;
      left:60px;
      border-left:1px solid #409eff;
    }
    .expand{
      .layer_container{
        /*地图*/
        .vec_type{
          z-index:4;
          left:15px;
          border-left:1px solid #409eff;
        }
        /*影像*/
        .img_type{
          left:90px;
          z-index:3;
          border-left:1px solid #409eff;
        }
        /*地形*/
        .ter_type{
          z-index:2;
          left:166px;
          border-left:1px solid #dcdfe6;
        }
      }
    }
  }
  .layer-item .layer-tip {
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    color: #fff;
    align-content: center;
    max-font-size: 12px;
    min-font-size: 8px;
  }
  .layer-item.active .layer-tip {
    background: #409eff;
  }
</style>
