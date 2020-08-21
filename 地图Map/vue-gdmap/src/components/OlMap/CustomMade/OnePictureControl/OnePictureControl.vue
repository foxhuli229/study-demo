<template>
  <ol-map ref="onePictureControlChild" @registerSingleClickEvent="mapSingleClickEvent">
    <template #layersBox>
      <layers-box :current-index="0" :expand="true" :show-box="true" :right="170" :max-layer-num="2" :bottom="10" />
    </template>
    <template #box>
      <zoom-in-out :location="locationInOut" />
    </template>
    <template #legend>
      <legend-box :view-legend="viewLegend" :left-x="38" :left-b="2" />
    </template>
    <template v-if="olmap" #toolContainer>
      <tool-container :tool-obj="toolPropsObj" :adminis-options="adminisOptions" :key-area-options="keyAreaOptions">
        <template #appendBox>
          <WidgetControl :statistic-obj="statisticObj">
            <template #all>
              <div class="head-echart">
                <div class="title">
                  <div class="name">视频在线率统计</div>
                  <div class="status">
                    <span class="color-one" />在线
                    <span class="color-two" />离线
                  </div>
                </div>
                <div class="echarts-wrap">
                  <echarts :id="cameraChart.id" class="camera-chart" :option="cameraChart.options" :height="cameraChart.height" :width="cameraChart.width" />
                </div>
              </div>
              <div class="bottom-table">
                <div class="title">
                  <div class="name">污染源企业运行状态统计</div>
                  <div class="status">
                    总共 {{ statisticObj.epCount }} 家
                  </div>
                </div>
                <div class="table-wrap">
                  <div class="enterprise-table">
                    <el-table :data="epStatusTable" size="mini" stripe>
                      <el-table-column prop="name" label="运行状态" width="80" />
                      <el-table-column prop="count" label="数量(家)" width="80" />
                      <el-table-column prop="monitorPerc" label="占比">
                        <transition slot-scope="scope">
                          <span>{{ scope.row.per }}</span>
                        </transition>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </template>
          </WidgetControl>
          <FullScreen />
        </template>
      </tool-container>
    </template>
    <template #leftBox>
      <move-popup :popup-property="popupProperty">
        <left-box :bottom-y="2" :updown-expand="true" :support-images="false" :tree-height="100" :panel-expand="false" :tree-data="treeData" :left-box-expand="true" />
      </move-popup>
    </template>
    <template #search>
      <search-tool :panel-expand="false" :mouseout-flag="false" @searchClick="handlerSearchMethod" @clear="handlerClearMethod">
        <template #listBox>
          <div v-if="$slots.EQMSearchBox" slot="EQMSearchBox">
            <slot name="EQMSearchBox" />
          </div>
        </template>
      </search-tool>
    </template>
    <template #popup3>
      <div v-if="$slots.popupName" slot="popupName">
        <slot name="popupName" />
      </div>
    </template>
  </ol-map>
</template>

<script>
import Images from '@/components/OlMap/util/minxins/images'
export default {
  name: 'OnePictureControl',
  components: {
    OlMap: () => import('@/components/OlMap'),
    ToolContainer: () => import('@/components/OlMap/ToolContainer'),
    FullScreen: () => import('@/components/OlMap/ToolContainer/Dispatch/FullScreen'),
    WidgetControl: () => import('./../WidgetControl'),
    ZoomInOut: () => import('@/components/OlMap/ZoomInOut'),
    LayersBox: () => import('@/components/OlMap/LayersBox'),
    LegendBox: () => import('@/components/OlMap/LegendBox'),
    MovePopup: () => import('@/components/OlMap/Popup/MovePopup'),
    LeftBox: () => import('@/components/OlMap/LeftBox'),
    Echarts: () => import('@/components/OlMap/Echarts'),
    SearchTool: () => import('@/components/OlMap/SearchTool')
  },
  mixins: [Images],
  props: {
    treeData: {
      type: Array,
      default: () => {
        return []
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
    statisticObj: {
      type: Object,
      default: () => {
        return {
          onlineRate: 0, // 视频在线率
          epCount: 0 // 污染源企业 多少家
        }
      }
    },
    statisticOline: { // 视频在线率 - 统计图
      type: Object,
      default: () => {
        return {
          deviceCount: 0,
          deviceOline: 0,
          netWorkCount: 0,
          netWorkOline: 0,
          videoCount: 0,
          videoOline: 0
        }
      }
    },
    epStatusTable: { // 污染源企业运行状态统计
      type: Array,
      default: () => {
        return []
      }
    },
    defaultData: {
      type: Array,
      default: () => {
        return []
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
        selectBox: true
      },
      viewLegend: 'picture-control-legend',
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
      cameraChart: {
        id: 'cameraChartId',
        height: '100%',
        width: '100%',
        options: this.mapOnlineRateOptions()
      },
      markerArray: []
    }
  },
  computed: {
    olmap() {
      return this.$store.state.olmap.olmap
    }
  },
  watch: {
    defaultData: {
      handler(newVal, oldVal) {
        this.clear()
        if (newVal) {
          if (newVal.length > 0) {
            this.addIconMarkers(newVal)
          }
        }
      },
      deep: true
    }
  },
  mounted() {
    this.handlerClearMethod()
    this.$store.dispatch('olmap/changeExcursion', false)
    this.addIconMarkers(this.defaultData)
  },
  methods: {
    clear() {
      if (this.markerArray.length > 0) {
        this.olmap._clearMarker(this.markerArray)
      }
    },
    addIconMarkers(val) {
      val.forEach((item, index) => {
        const marker = this.olmap._addIconMarkersScale(item, this.getImgaeUrl(item).image, 1, this)
        this.markerArray.push(marker)
      })
    },
    mapSingleClickEvent(data) {
      this.$emit('singleClick', data)
      // 开启Popup
      this.$store.dispatch('olmap/changePopup', { popupShow: true, popupId: data.id, popupName: data.name, datas: data })
    },
    handlerSearchMethod(queryData) {
      // 拿到查询参数对象
      this.$emit('searchMethod', queryData)
    },
    handlerClearMethod() {
      this.$store.dispatch('olmap/changeSideBarViewData', { data: { 'list-box': [] }, total: 0 })
      this.$store.dispatch('olmap/changeSideBarViewData', { data: { 'list-box-image': [] }, total: 0 })
    },
    mapOnlineRateOptions() {
      const data = this.statisticOline
      if (data.videoCount === 0) {
        data.videoCount = 1
      }
      const bili = (data.videoOline * 100) / data.videoCount
      this.statisticObj.onlineRate = bili
      let title = bili.toFixed(1) + '%'
      let color = '#000'
      let opacity = 1
      let seriesData = []
      let isEmpty = 0
      if (data != null) {
        isEmpty = 1
        seriesData = [
          {
            value: data.videoOline,
            name: '在线'
          },
          {
            value: data.videoCount - data.videoOline,
            name: '离线'
          }
        ]
      }
      if (isEmpty === 0 || !data.videoCount) {
        title = '暂无数据'
        color = '#ccc'
        opacity = 0
        seriesData = []
      }
      const option = {
        title: {
          // 标题
          text: title,
          textStyle: {
            color: color
          },
          x: 'center',
          top: '42%'
        },
        graphic: [{
          type: 'group',
          left: 'center',
          top: '65%',
          children: [{
            type: 'text',
            z: 100,
            left: '10',
            top: 'middle',
            style: {
              fill: '#aab2fa',
              text: '在线',
              font: '12px Microsoft YaHei'
            }
          }]
        }],
        color: ['#2DA9FF', '#FFC000'],
        tooltip: {
          // trigger: "item",
          formatter: function(params) {
            return (
              params.name +
              ' ' +
              params.value +
              '个<br/>占比 ' +
              params.percent.toFixed(1) +
              '%'
            )
          }
        },
        legend: {
          selectedMode: false,
          data: seriesData,
          show: false
        },
        series: [
          {
            name: '摄像机统计',
            type: 'pie',
            radius: ['65%', '85%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                formatter: '{b|{b}:}{d}% ',
                position: 'outside',
                rich: {
                  b: {
                    fontSize: 14
                  }
                }
              }
            },
            itemStyle: {
              opacity: opacity
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: seriesData
          }
        ],
        animation: false
      }
      return option
    }
  }
}
</script>

<style lang="scss" scoped>
  .head-echart{
    padding: 20px 20px;
    height: 206px;
    width: 100%;
    position: relative;
    overflow-x: unset;
    overflow-y: auto;
    .title{
      width: calc(100%);
      height: 30px;
      font-size: 12px;
      font-weight: bold;
      margin: 10px 0px 0px 0px;
      .name{
        float: left;
        font-size:13px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        line-height:17px;
        color:rgba(75,83,102,1);
        opacity:1;
      }
      .status{
        float: right;
        font-size:12px;
        font-family:MicrosoftYaHei;
        line-height: 14px;
        color:rgba(183,186,194,1);
        opacity:1;
        display: flex;
        .color-one{
          margin: 4px 4px 0px 4px;
          display: flex;
          width:8px;
          height:8px;
          background:rgba(19,153,248,1);
          opacity:1;
          border-radius:2px;
        }
        .color-two{
          display: flex;
          width:8px;
          height:8px;
          background:rgba(250,204,20,1);
          opacity:1;
          border-radius:2px;
          margin: 4px 4px 0px 14px;
        }
      }
    }
    .echarts-wrap{
      position: relative;
      width: calc(100%);
      height: calc(100% - 40px);
      border: 1px solid #dae5ef;
      border-radius: 4px;
      max-height: 430px;
      .camera-chart {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        right: 0;
        bottom: 0;
      }
    }
  }
  .bottom-table{
    padding: 0px 20px 20px 20px;
    height: auto;
    width: 100%;
    position: relative;
    overflow: hidden;
    .title {
      width: calc(100%);
      height: 30px;
      font-size: 12px;
      font-weight: bold;
      margin: 0px 0px 0px 0px;
      .name {
        float: left;
        font-size: 13px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 17px;
        color: rgba(75, 83, 102, 1);
        opacity: 1;
      }
      .status {
        float: right;
        font-size: 12px;
        font-family: MicrosoftYaHei;
        line-height: 14px;
        color: rgba(183, 186, 194, 1);
        opacity: 1;
        display: flex;
      }
    }
    .table-wrap{
      position: relative;
      width: calc(100%);
      height: auto;
      border: 1px solid #dae5ef;
      border-radius: 4px;
      margin-bottom: 10px;
      display: flex;
      overflow: hidden;
      .enterprise-table .el-table .cell {
        text-align: center;
        font-size: 12px;
        line-height: 21px;
      }
    }
  }
</style>
