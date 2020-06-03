<template>
  <ol-map ref="olMapChildPicture" @registerSingleClickEvent="mapSingleClickEvent">
    <template #popupAll>
      <a href="javascript:;" class="a-popup-name" @click="clickPopupName">{{ popup.popupName }}</a>
    </template>
    <template #layersBox>
      <layers-box :current-index="0" :expand="true" :show-box="true" :right="170" :max-layer-num="2" :bottom="10" />
    </template>
    <template #box>
      <zoom-in-out :location="locationInOut" />
    </template>
    <template v-if="olmap" #toolContainer>
      <tool-container :tool-obj="toolPropsObj" :radio-array="radioArray" @radio-selected="handleRadioSelected" />
    </template>
    <template #legend>
      <legend-box :view-legend="viewLegend" :left-x="38" :left-b="2" />
    </template>
    <template #leftBox>
      <move-popup :popup-property="popupProperty">
        <left-box :updown-expand="true" :panel-expand="false" :bottom-y="2" :width="250" :left-box-expand="leftBoxExpand">
          <template #title>
            筛选
          </template>
          <!--<template #dragBox>-->
          <!--拖拽-->
          <!--</template>-->
          <template #slideBoxAll>
            <div class="slide-box-all">
              <div class="title">
                <div class="title-text">
                  <span class="span-title">
                    <slot name="title">图层选择</slot>
                  </span>
                </div>
                <div class="title-icom" />
              </div>
              <div class="tree-box-one">
                <TreeBox :tree-height="150" :tree-data="imageTreeData" :left-default-keys="imageTreeKeys" @change="handlerChangeTreeImages" />
              </div>
              <div class="title top-box">
                <div class="title-text">
                  <span class="span-title">
                    <slot name="title">网格选择</slot>
                  </span>
                </div>
                <div class="title-icom">
                  <template>
                    <!-- `checked` 为 true 或 false -->
                    <el-checkbox v-model="showGridChecked" size="mini" @change="changeGridChecked">显示网格</el-checkbox>
                  </template>
                </div>
              </div>
              <div class="tree-box-one">
                <a href="javascript:;" class="select-a">
                  <span>
                    <el-select v-model="gridSelectValue" class="select" size="mini" placeholder="请选择" @change="handlerSelectValue">
                      <el-option
                        v-for="item in gridSelectData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </span>
                </a>
                <a href="javascript:;">
                  <span>
                    <TreeBox :tree-height="120" :support-images="false" :tree-data="gridTreeData" :left-default-keys="gridTreeKeys" @change="handlerChangeTreeGrid" />
                  </span>
                </a>
              </div>
            </div>
          </template>
        </left-box>
      </move-popup>
      <!--移动的弹窗-->
      <move-popup v-if="$slots.movePopup" :popup-property="popupPropertyDialog">
        <template #popupAll2>
          <div>
            <div class="title2-dragx drag-box">
              <a class="popup-name-dragx">{{ popup.popupName }}</a>
            </div>
            <div slot="movePopup">
              <slot name="movePopup" />
            </div>
          </div>
        </template>
      </move-popup>
    </template>
    <template #search>
      <search-tool :panel-expand="false" :mouseout-flag="false" @searchClick="handlerSearchMethod" @clear="handlerClearMethod" @list-box-closer="listBoxCloser">
        <template #listBox>
          <div v-if="$slots.EQMSearchBox" slot="EQMSearchBox">
            <slot name="EQMSearchBox" />
          </div>
        </template>
      </search-tool>
    </template>
    <template #exportBox>
      <export-box :export-png="true" :export-pdf="false" :location="{ right: '160px', bottom: '8px'}"></export-box>
    </template>
  </ol-map>
</template>

<script>
import HeatmapOverlay from '@/components/OlMap/util/heatmap/HeatmapOverlay.js'
export default {
  name: 'GridOnePicture',
  components: {
    OlMap: () => import('@/components/OlMap'),
    ZoomInOut: () => import('@/components/OlMap/ZoomInOut'),
    LayersBox: () => import('@/components/OlMap/LayersBox'),
    ToolContainer: () => import('@/components/OlMap/ToolContainer'),
    LegendBox: () => import('@/components/OlMap/LegendBox'),
    LeftBox: () => import('@/components/OlMap/LeftBox'),
    TreeBox: () => import('@/components/OlMap/TreeBox'),
    MovePopup: () => import('@/components/OlMap/Popup/MovePopup'),
    SearchTool: () => import('@/components/OlMap/SearchTool'),
    ExportBox: () => import('@/components/OlMap/ExportBox')
  },
  props: {
    gridSelectData: {
      type: Array,
      default: () => {
        return []
      }
    },
    imageTreeData: {
      type: Array,
      default: () => {
        return []
      }
    },
    imageTreeKeys: {
      type: Object,
      default: () => {
        return {
          keys: [],
          keysData: []
        }
      }
    },
    gridTreeData: {
      type: Array,
      default: () => {
        return []
      }
    },
    gridTreeKeys: { // 默认需要选中的值
      type: Object,
      default: () => {
        return {
          keys: [],
          keysData: []
        }
      }
    },
    distributionData: { // 分布图点位数据
      type: Array,
      default: () => {
        return []
      }
    },
    heatmapObject: { // 热力图
      type: Object,
      default: () => {
        return {
          max: 300,
          min: 0,
          data: [
          ]
        }
      },
      validator: (value) => {
        return value.max !== undefined & value.min !== undefined & value.data !== undefined
      }
    }
  },
  data() {
    return {
      locationInOut: {
        right: '10px',
        bottom: '80px'
      },
      toolPropsObj: {
        fullScreen: true,
        clear: true,
        toolCl: true,
        toolCm: true,
        radioBox: true
      },
      radioArray: [
        { id: 'distribution', name: '分布图', radio: true },
        { id: 'heating', name: '热力图', radio: false }
      ],
      viewLegend: '', // 图例
      popupProperty: {
        show: true,
        title: '',
        dragBarClass: 'drag-box',
        left: 10,
        top: 0,
        right: 0,
        bottom: 10,
        width: 350,
        height: 0
      },
      popupPropertyDialog: {
        show: false,
        title: '',
        dragBarClass: 'drag-box',
        left: 480,
        top: 200,
        right: 0,
        bottom: 0,
        width: 500,
        height: 0
      },
      showGridChecked: true, // 是否显示网格
      gridSelectValue: '',
      markerArray: [],
      singleClickData: null,
      leftBoxExpand: true,
      heatmapOverlay: null,
      heatmapConfig: {
        radius: 0.1,
        maxOpacity: 0.8,
        scaleRadius: true,
        useLocalExtrema: true,
        visible: true,
        latField: 'latitude',
        lngField: 'longitude',
        valueField: 'value'
      }
    }
  },
  computed: {
    map() {
      return this.$store.state.olmap.map
    },
    olmap() {
      return this.$store.state.olmap.olmap
    },
    imagesObj() {
      return this.$store.state.olmap.imagesObj
    },
    popup() {
      return this.$store.state.olmap.popup
    }
  },
  watch: {
    distributionData: {
      handler(newVal, oldVal) {
        // console.log(newVal, oldVal)
        this.clear()
        if (newVal) {
          if (newVal.length > 0) {
            newVal.forEach((item, index) => {
              let marker
              if (item.value === '1') { // 待执行
                marker = this.olmap._addIconMarkersScale(item, this.imagesObj.DaiZhiXing_Png_, 0.7, this)
              } else if (item.value === '2') { // 执行中
                marker = this.olmap._addIconMarkersScale(item, this.imagesObj.ZhiXingZhong_Png_, 0.7, this)
              } else if (item.value === '3') { // 已执行
                marker = this.olmap._addIconMarkersScale(item, this.imagesObj.YiZhiXing_Png_, 0.7, this)
              }
              this.markerArray.push(marker)
            })
          }
        }
      },
      deep: true
    },
    heatmapObject: {
      handler(newVal, oldVal) {
        if (this.heatmapOverlay) {
          this.heatmapOverlay.setDataSet(newVal)
          this.heatmapOverlay.toggle(false)
        }
      },
      deep: true
    }
  },
  mounted() {
    this.handlerClearMethod()
    const obj = this.gridSelectData.find(t => t.selected === true)
    this.gridSelectValue = obj.id
    // 选择下拉
    this.$emit('grid-select-value', obj.id, obj)
    // 勾选
    this.$emit('change-checkbox', this.showGridChecked)
    this.$store.dispatch('olmap/changeExcursion', false)
  },
  beforeDestroy() {
    if (this.heatmapOverlay) {
      this.heatmapOverlay.toggleRemove()
      this.heatmapOverlay = null
    }
  },
  methods: {
    clear() {
      if (this.markerArray.length > 0) {
        this.olmap._clearMarker(this.markerArray)
      }
    },
    mapSingleClickEvent(data) {
      this.$emit('single-click', data)
      // 开启Popup
      this.$store.dispatch('olmap/changePopup', { popupShow: true, popupId: data.id, popupName: data.name, datas: data })
      this.singleClickData = data
    },
    handlerSearchMethod(queryData) {
      this.leftBoxExpand = false
      // 拿到查询参数对象
      this.$emit('search-method', queryData)
    },
    handlerClearMethod() {
      this.$store.dispatch('olmap/changeSideBarViewData', { data: { 'list-box': [] }, total: 0 })
      this.$store.dispatch('olmap/changeSideBarViewData', { data: { 'list-box-image': [] }, total: 0 })
    },
    listBoxCloser() {
      this.leftBoxExpand = true
    },
    handleRadioSelected(val) {
      if (val.id === 'distribution') {
        this.closeOrOpenByLegend(true)
        if (this.heatmapOverlay != null) {
          this.heatmapOverlay.toggle(true)
        }
      }
      if (val.id === 'heating') {
        if (this.heatmapOverlay == null) {
          this.heatmapOverlay = new HeatmapOverlay({
            config: this.heatmapConfig,
            map: this.map
          })
        }
        this.closeOrOpenByLegend(false)
      }
      this.$emit('radio-selected', val)
    },
    closeOrOpenByLegend(val) {
      this.$store.dispatch('olmap/changeLegendView', { view: 'distribution-legend', show: val })
    },
    handlerChangeTreeImages(dataTreeId, treeArray) {
      // console.log('图层树的选中')
      this.$emit('image-change-tree', dataTreeId, treeArray)
    },
    handlerSelectValue(val) {
      const obj = this.gridSelectData.find(t => t.id === val)
      this.$emit('grid-select-value', val, obj)
    },
    changeGridChecked(val) {
      this.$emit('change-checkbox', val)
    },
    handlerChangeTreeGrid(dataTreeId, treeArray) {
      // console.log('网格化的选中')
      this.$emit('grid-change-tree', dataTreeId, treeArray)
    },
    clickPopupName() {
      // console.log('打开可拖拽的弹窗')
      this.popupPropertyDialog.show = true
      this.$emit('show-move-popup', this.singleClickData)
    }
  }
}
</script>

<style lang="scss" scoped>
  .a-popup-name{
    text-decoration:underline;
    color: #409eff;
    padding: 10px 20px 0px 10px;
    font-size: 14px;
    width: auto;
    white-space:nowrap;     //强制不换行
    overflow:hidden;           //自动隐藏文字
    text-overflow: ellipsis;    //文字隐藏后添加省略号
    -o-text-overflow:ellipsis; //适用于opera浏览器
  }
.slide-box-all{
  position: relative;
  border-radius: 4px;
  padding: 10px 5px 5px 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.14);
  width: calc(100%);
  .title{
    width: calc(100%);
    line-height: 25px;
    div{
      display: inline-block;
    }
    .title-text{
      width: calc(60%);
      font-size: 12px;
      align-items: center;
      padding-left: 15px;
      font-family:MicrosoftYaHei;
      float: left;
      font-weight: bold;
    }
    .title-icom{
      width: calc(40%);
      font-size: 12px;
      align-items: center;
      padding-left: 10px;
      padding-right: 5px;
      font-family:MicrosoftYaHei;
      float: left;
      /deep/ .el-checkbox__inner {
        width: 12px;
        height: 12px;
      }
      /deep/ .el-checkbox__label {
        font-size: 12px;
        padding-left: 5px;
      }
    }
  }
  .tree-box-one{
    display: inline-block;
    width: calc(100%);
    >a{
      overflow: hidden;
      display: block;
      width: calc(100%);
      padding: 10px 10px 0px 10px;
      .select{
        width: calc(100%);
      }
    }
  }
  .top-box{
    margin-top: 10px;
  }
}
</style>
