<template>
  <ol-map ref="olMapChildIndustry" @registerSingleClickEvent="mapSingleClickEvent">
    dd1
    <template #popup>
      <div v-if="$slots.DispatchPopup" slot="DispatchPopup">
        <slot name="DispatchPopup" />
      </div>
    </template>
    <template #popup3>
      <div v-if="$slots.popupName" slot="popupName">
        <slot name="popupName" />
      </div>
    </template>
    <template v-if="layersBoxFalg" #layersBox>
      <layers-box :current-index="0" :expand="true" :show-box="true" :right="170" :max-layer-num="2" :bottom="10" />
    </template>
    <template #leftBox>
      <move-popup :popup-property="popupProperty">
        <left-box
          :updown-expand="true"
          :panel-expand="false"
          :bottom-y="2"
          :tree-height="treeHeight"
          :tree-data="treeData"
          :left-box-expand="true"
          :set-flag="leftBoxSetFlag"
          @setting-click="handlerSettingClick"
        >
          <template #title>
            <slot name="leftBoxTitle">应急专题图层</slot>
          </template>
        </left-box>
      </move-popup>
    </template>
    <template #search>
      <search-tool :panel-expand="false" :mouseout-flag="false" @searchClick="searchMethod" @clear="clearMethod">
        <template #listBox>
          <div v-if="$slots.DispatchSearchBox" slot="DispatchSearchBox">
            <slot name="DispatchSearchBox" />
          </div>
        </template>
        <template #sideBoxAll>
          <div v-if="$slots.sideBoxAll" slot="sideBoxAll">
            <slot name="sideBoxAll" />
          </div>
        </template>
      </search-tool>
    </template>
    <template v-if="$slots.rightBoxAll" #rightBox>
      <right-box :updown-expand="false" :panel-expand="false" :default-expand="true">
        <template #all>
          <div v-if="$slots.rightBoxAll" slot="rightBoxAll">
            <slot name="rightBoxAll" />
          </div>
        </template>
      </right-box>
    </template>
    <template v-if="zoomInFalg" #box>
      <zoom-in-out :location="locationInOut" />
    </template>
    <template v-if="exportBoxFalg" #exportBox>
      <export-box :export-png="true" :export-pdf="false"></export-box>
    </template>
    <template #movePopup>
      <div v-if="$slots.movePopup" slot="movePopup">
        <slot name="movePopup" />
      </div>
    </template>
    <template #movePopup2>
      <div v-if="$slots.movePopup2" slot="movePopup2">
        <slot name="movePopup2" />
      </div>
    </template>
    <template v-if="olmap" #toolContainer>
      <tool-container :tool-obj="toolPropsObj" :adminis-options="adminisOptions" :key-area-options="keyAreaOptions">
        <template #appendBox>
          <BottonBox v-if="buttonArray.length > 0" :button-array="buttonArray" @click-button="handleClickButton" />
          <BoxTool />
          <FullScreen />
        </template>
      </tool-container>
    </template>
    <LayersManageGroup
      v-if="layersGroupVisible"
      :total-resource="totalResource"
      :layers-group-visible.sync="layersGroupVisible"
      @update-resource="handleUpdateResource"
    />
    <LayersManage
      v-if="layersManageVisible"
      :tree-data="layersManageTreeData"
      :tree-keys="layersManageTreeKeys"
      :layers-manage-visible.sync="layersManageVisible"
      :state="layersManageState"
      @submit-layers="handleSubmitlayers"
    />
  </ol-map>
</template>

<script>
export default {
  name: 'CommandDispatch',
  components: {
    OlMap: () => import('@/components/OlMap'),
    LeftBox: () => import('@/components/OlMap/LeftBox'),
    RightBox: () => import('@/components/OlMap/RightBox'),
    SearchTool: () => import('@/components/OlMap/SearchTool'),
    ZoomInOut: () => import('@/components/OlMap/ZoomInOut'),
    ToolContainer: () => import('@/components/OlMap/ToolContainer'),
    FullScreen: () => import('@/components/OlMap/ToolContainer/Dispatch/FullScreen'),
    BoxTool: () => import('@/components/OlMap/ToolContainer/Dispatch/BoxTool'),
    LayersBox: () => import('@/components/OlMap/LayersBox'),
    MovePopup: () => import('@/components/OlMap/Popup/MovePopup'),
    BottonBox: () => import('@/components/OlMap/ToolContainer/BottonBox'),
    ExportBox: () => import('@/components/OlMap/ExportBox'),
    LayersManageGroup: () => import('@/components/OlMap/CustomMade/CommandDispatch/LayersManageGroup'),
    LayersManage: () => import('@/components/OlMap/CustomMade/CommandDispatch/LayersManage')
  },
  props: {
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    },
    treeHeight: {
      type: Number,
      default: 350
    },
    zoomInFalg: {
      type: Boolean,
      default: true
    },
    exportBoxFalg: {
      type: Boolean,
      default: false
    },
    layersBoxFalg: {
      type: Boolean,
      default: true
    },
    leftBoxSetFlag: {
      type: Boolean,
      default: false
    },
    buttonArray: {
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
    leftListData: { // 根据查询点击tree 查询回来的数据
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
      markerArray: [],
      layersGroupVisible: false,
      totalResource: [
        {
          'id': '6f172948fb0343a1b635f67f7672877a',
          'customLayerName': '默认专题图',
          'customLayerUser': '-1',
          'createTime': null,
          'isSelected': 0
        },
        {
          'id': 'f8ee28074df6da911dc2e0c8c43d1e26',
          'customLayerName': '新增了一个',
          'customLayerUser': '1',
          'createTime': 1574307707915,
          'isSelected': 0
        }
      ],
      layersManageVisible: false,
      layersManageTreeData: [{
        id: '1',
        name: '任务',
        iconName: '文件夹',
        isEdit: false,
        children: [
          {
            id: '11',
            name: '待响应',
            iconName: '待响应',
            isEdit: false,
            children: []
          },
          {
            id: '12',
            name: '响应中',
            iconName: '响应中',
            isEdit: false,
            children: []
          },
          {
            id: '13',
            name: '已响应',
            iconName: '已响应',
            isEdit: false,
            children: []
          }
        ]
      }, {
        id: '2',
        name: '企业',
        iconName: '文件夹',
        isEdit: false,
        children: [
          {
            id: '21',
            name: '一般风险源企业',
            iconName: '一般风险源企业',
            isEdit: false,
            children: []
          },
          {
            id: '22',
            name: '较大风险源企业',
            iconName: '较大风险源企业',
            isEdit: false,
            children: []
          },
          {
            id: '23',
            name: '重大风险源企业',
            iconName: '重大风险源企业',
            isEdit: false,
            children: []
          }
        ]
      }],
      layersManageTreeKeys: {
        keys: [],
        keysData: []
      },
      layersManageState: 'add'
    }
  },
  computed: {
    olmap() {
      return this.$store.state.olmap.olmap
    },
    imagesObj() {
      return this.$store.state.olmap.imagesObj
    },
    leftTreeKeys() { // Tree选中的数据id
      return this.$store.state.olmap.leftDefaultKeys
    }
  },
  watch: {
    leftListData: {
      handler(newVal, oldVal) {
        console.log('1')
        this.clear()
        if (newVal) {
          if (newVal.length > 0) {
            newVal.forEach((item, index) => {
              const keyObj = this.leftTreeKeys.keysData.find(it => {
                return it.id === item.value
              })
              if (keyObj !== undefined) {
                if (keyObj.iconName !== undefined) {
                  this.$set(item, 'state', keyObj)
                  // const marker = this.olmap._addIconMarkersScale(item, `/static/olmap/images/thematic-layer/${keyObj.iconName}.png`, 1, this)
                  const marker = this.olmap._addIconMarkersScale(item, `@/assets/images/thematic-layer/${keyObj.iconName}.png`, 1, this)
                  this.markerArray.push(marker)
                }
              }
              // let marker
              // if (item.value === '11') { // 待响应
              //   marker = this.olmap._addIconMarkers(item, this.imagesObj.Red_Png_, this)
              // } else if (item.value === '12') { // 响应中
              //   marker = this.olmap._addIconMarkersScale(item, '/static/olmap/images/industry-distribution/二级警情.png', 1, this)
              // } else if (item.value === '13') { // 已响应
              //   marker = this.olmap._addIconMarkersScale(item, '/static/olmap/images/industry-distribution/四级警情.png', 1, this)
              // }
            })
          }
        }
      },
      deep: true
    }
  },
  mounted() {
    this.$store.dispatch('olmap/changeExcursion', false)
  },
  methods: {
    clear() {
      if (this.markerArray.length > 0) {
        this.olmap._clearMarker(this.markerArray)
      }
    },
    mapSingleClickEvent(data) {
      this.$emit('singleClick', data)
      // 开启Popup
      this.$store.dispatch('olmap/changePopup', { popupShow: true, popupId: data.id, popupName: data.name, datas: data })
    },
    searchMethod(queryData) {
      // 拿到查询参数对象
      this.$emit('searchMethod', queryData)
    },
    clearMethod() {
      this.$store.dispatch('olmap/changeSideBarViewData', { data: { 'list-box': [] }, total: 0 })
      this.$store.dispatch('olmap/changeSideBarViewData', { data: { 'list-box-image': [] }, total: 0 })
    },
    handleClickButton(data) {
      this.$emit('click-button', data)
    },
    handlerSettingClick() {
      this.layersGroupVisible = true
      this.$emit('setting-click')
    },
    handleUpdateResource(state, row) {
      if (state === 'update') {
        // 更新选中第几个资源图层组
        this.layersManageState = state
      } else if (state === 'edit') {
        // 编辑资源图层组
        this.layersManageState = state
        this.layersManageVisible = true
      } else if (state === 'delete') {
        // 删除资源图层组
      } else if (state === 'add') {
        // 添加资源图层组
        this.layersManageState = state
        this.layersManageVisible = true
      }
    },
    handleSubmitlayers(state, treedata) {
      console.log(state, treedata)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
