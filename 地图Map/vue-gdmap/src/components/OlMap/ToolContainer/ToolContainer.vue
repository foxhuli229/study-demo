<template>
  <!-- 工具集装箱 -->
  <div class="tool-container">
    <!-- toolBox 替换上面整个工具箱-->
    <div v-if="$slots.box" slot="box">
      <slot name="box" />
    </div>
    <div v-else>
      <!--在前面插入自己的组件 无背景色，透明-->
      <div v-if="$slots.beforeBox" slot="beforeBox" class="t-box">
        <slot name="beforeBox" />
      </div>
      <!--分布图、热力图-->
      <RadioBox v-if="toolObj.radioBox & radioArray.length !==0 " :radio-array="radioArray" @radio-selected="handleRadioSelected" />
      <!--行政区划下拉选择、重点区域下拉-->
      <SelectBox v-if="toolObj.selectBox" :adminis-options="adminisOptions" :key-area-options="keyAreaOptions" />
      <!-- 插入自己的组件 无背景色，透明 -->
      <div v-if="$slots.appendBox" slot="appendBox" class="t-box">
        <slot name="appendBox" />
      </div>
      <div class="container-box">
        <!--在前面插入自己的组件-->
        <div v-if="$slots.before" slot="before" class="t-item">
          <slot name="before" />
        </div>
        <!--城市天气-->
        <CityChange v-if="toolObj.cityChange" />
        <!--在Clear前插入自己的组件-->
        <div v-if="$slots.toolBoxBefore" slot="toolBoxBefore" class="t-item">
          <slot name="toolBoxBefore" />
        </div>
        <!--大气环境 ，水环境， 噪声环境， 土壤环境-->
        <AirWaterNoiseSoil v-if="toolObj.airWaterNoiseSoil">
          <template v-if="$slots.WSAN_all" #all>
            <div v-if="$slots.WSAN_all" slot="WSAN_all">
              <slot name="WSAN_all" />
            </div>
          </template>
          <template v-if="$slots.WSAN_head" #head>
            <div v-if="$slots.WSAN_head" slot="WSAN_head">
              <slot name="WSAN_head" />
            </div>
          </template>
          <template v-if="$slots.WSAN_middle" #middle>
            <div v-if="$slots.WSAN_middle" slot="WSAN_middle">
              <slot name="WSAN_middle" />
            </div>
          </template>
          <template v-if="$slots.WSAN_bottom" #bottom>
            <div v-if="$slots.WSAN_bottom" slot="WSAN_bottom">
              <slot name="WSAN_bottom" />
            </div>
          </template>
        </AirWaterNoiseSoil>
        <!-- 工具: 测距、侧面、标点 -->
        <ToolBox v-if="toolObj.toolBox" />
        <Toolcl v-if="toolObj.toolCl" />
        <Toolcm v-if="toolObj.toolCm" />
        <!--在Clear前插入自己的组件-->
        <div v-if="$slots.clearBefore" slot="clearBefore" class="t-item">
          <slot name="clearBefore" />
        </div>
        <!-- Clear -->
        <Clear v-if="toolObj.clear" />
        <!--在全屏前插入自己的组件-->
        <div v-if="$slots.fullScreenBefore" slot="fullScreenBefore" class="t-item">
          <slot name="fullScreenBefore" />
        </div>
        <!-- 全屏 -->
        <FullScreen v-if="toolObj.fullScreen" />
        <!--在后面插入自己的组件-->
        <div v-if="$slots.append" slot="append" class="t-item">
          <slot name="append" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    CityChange: () => import('./CityChange'),
    ToolBox: () => import('./ToolBox'),
    Clear: () => import('./Clear.vue'),
    FullScreen: () => import('./FullScreen.vue'),
    AirWaterNoiseSoil: () => import('./WaterSoilAirNoise'),
    SelectBox: () => import('./SelectBox'),
    RadioBox: () => import('./RadioBox'),
    Toolcl: () => import('./Tool/Toolcl.vue'),
    Toolcm: () => import('./Tool/Toolcm.vue')
  },
  props: {
    toolObj: {
      type: Object,
      default: () => {
        return {
          fullScreen: false,
          clear: false,
          toolBox: false,
          toolCl: false,
          toolCm: false,
          cityChange: false,
          airWaterNoiseSoil: false,
          selectBox: false,
          radioBox: false
        }
      }
    },
    adminisOptions: { // 行政区域
      type: Array,
      default: () => {
        return []
      }
    },
    keyAreaOptions: { // key area  重点区域
      type: Array,
      default: () => {
        return []
      }
    },
    radioArray: { // 组合单选 列入 分布图、热力图
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    handleRadioSelected(val) {
      this.$emit('radio-selected', val)
    }
  }
}
</script>

<style lang="scss">
  .tool-container {
    z-index: 1001;
    position: absolute;
    top: 20px;
    right: 20px;
    box-shadow: 1px 2px 1px rgba(255, 255, 255, 0.15);
    .t-box {
      position: relative;
      float: left;
    }
    .t-box > a {
      overflow: hidden;
      display: block;
    }
    .container-box{
      position: relative;
      float: left;
      background-color: white;
      .t-item {
        padding: 2px 15px;
        position: relative;
        float: left;
      }
      .t-item > a {
        overflow: hidden;
        display: block;
      }
      .t-item:not(:last-child):after {
        content: '';
        display: block;
        visibility: visible;
        width: 1px;
        height: 21px;
        background: #eee;
        position: absolute;
        top: 7px;
        right: -1px;
      }

      .weather-item {
        display: inline-block;
        line-height: 17px;
        height: 34px;
        background-color: #fff;
        text-decoration: none;
        vertical-align: middle;
        float: left;
      }

      .weather-item img {
        width: 16px;
        height: 16px;
        padding-top: 8px;
        margin-right: 6px;
      }
      .t-item > .active, .t-item > .active .tool-text {
        color: #2f87eb;
      }
      .t-item>.active .triangle {
        transform: rotate(180deg);
        margin-top: 12px;
      }
      .triangle {
        width: 30px;
        height: 20px;
        transition: .3s;
      }
      .tool-container-triangle {
        margin-left: 5px;
        float: left;
        margin-top: 5px;
      }
      .triangle> .svg-icon{
        width: 30px;
        height: 30px;
      }
      .tool-box {
        position: relative;
      }
      .com-icon {
        display: inline-block;
        background-repeat: no-repeat;
        width: 16px;
        height: 16px;
      }
      .tool-icon {
        float: left;
        margin-right: 6px;
        margin-top: 10px;
      }
      .tool-text {
        float: left;
        font-size: 12px;
        font-style: normal;
        height: 34px;
        line-height: 38px;
        display: inline-block;
        color: #333;
      }
    }
  }
</style>
