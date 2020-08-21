<template>
  <div class="ol-map">
    <grid-one-picture
      :image-tree-data="imageTreeData"
      :image-tree-keys="imageTreeKeys"
      :grid-select-data="gridSelectData"
      :grid-tree-data="gridTreeData"
      :grid-tree-keys="gridTreeKeys"
      :distribution-data="pointDistributionData"
      :heatmap-object="heatmapObject"
      @radio-selected="handleRadioSelected"
      @image-change-tree="handlerChangeTreeImages"
      @change-checkbox="handlerChangeCheckbox"
      @grid-select-value="handlerGridSelectValue"
      @grid-change-tree="handlerChangeTreeGrid"
      @show-move-popup="handlerMovePopup"
      @single-click="handlerMapSingleClick"
      @search-method="handlerSearchMethod"
    >
      <template #movePopup>
        <div style="width: 500px;height: 350px;font-size: 12px;">
          填充内容 填充自己的业务组件 点击可拖拽111
        </div>
      </template>
    </grid-one-picture>
  </div>
</template>

<script>
export default {
  components: {
    GridOnePicture: () => import('@/components/OlMap/CustomMade/GridOnePicture')
  },
  data() {
    return {
      // 图层选择的Tree
      imageTreeData: [{
        id: '1',
        name: '任务',
        iconName: '文件夹',
        children: [
          {
            id: '11',
            name: '巡查任务',
            iconName: '文件夹',
            children: []
          },
          {
            id: '12',
            name: '派发任务',
            iconName: '文件夹',
            children: []
          },
          {
            id: '13',
            name: '自建任务',
            iconName: '文件夹',
            children: []
          }
        ]
      }, {
        id: '2',
        name: '企业',
        iconName: '文件夹',
        children: [
          {
            id: '21',
            name: '一般企业',
            iconName: '文件夹',
            children: []
          },
          {
            id: '22',
            name: '重点企业',
            iconName: '文件夹',
            children: []
          },
          {
            id: '23',
            name: '个体工商企业',
            iconName: '文件夹',
            children: []
          }
        ]
      }, {
        id: '3',
        name: '饮用水水源地',
        iconName: '文件夹',
        children: [
          {
            id: '31',
            name: '一级保护区',
            iconName: '文件夹',
            children: []
          },
          {
            id: '32',
            name: '二级保护区',
            iconName: '文件夹',
            children: []
          },
          {
            id: '33',
            name: '准保护区',
            iconName: '文件夹',
            children: []
          }
        ]
      }, {
        id: '4',
        name: '风险源',
        iconName: '文件夹',
        children: [
          {
            id: '41',
            name: '重大风险源',
            iconName: '文件夹',
            children: []
          },
          {
            id: '42',
            name: '较大风险源',
            iconName: '文件夹',
            children: []
          },
          {
            id: '43',
            name: '一般风险源',
            iconName: '文件夹',
            children: []
          }
        ]
      }, {
        id: '5',
        name: '敏感点',
        iconName: '文件夹',
        children: [
          {
            id: '51',
            name: '生态保护区',
            iconName: '生态保护区',
            children: []
          },
          {
            id: '52',
            name: '文化教育',
            iconName: '文化教育',
            children: []
          },
          {
            id: '53',
            name: '居民生活',
            iconName: '居民生活',
            children: []
          },
          {
            id: '54',
            name: '医疗卫生',
            iconName: '医疗卫生',
            children: []
          },
          {
            id: '55',
            name: '机关单位',
            iconName: '机关单位',
            children: []
          }
        ]
      }, {
        id: '6',
        name: '点位',
        iconName: '文件夹',
        children: [{
          id: '61',
          name: '畜禽养殖',
          iconName: '畜禽养殖',
          children: []
        },
        {
          id: '62',
          name: '卫生院（所）',
          iconName: '卫生院（所）',
          children: []
        },
        {
          id: '63',
          name: '垃圾站',
          iconName: '垃圾站',
          children: []
        },
        {
          id: '64',
          name: '秸秆焚烧',
          iconName: '秸秆焚烧',
          children: []
        },
        {
          id: '65',
          name: '建设项目',
          iconName: '建设项目',
          children: []
        },
        {
          id: '66',
          name: '河道',
          iconName: '河道',
          children: []
        },
        {
          id: '67',
          name: '道路',
          iconName: '道路',
          children: []
        },
        {
          id: '68',
          name: '堆场',
          iconName: '堆场',
          children: []
        },
        {
          id: '69',
          name: '污水管网',
          iconName: '污水管网',
          children: []
        },
        {
          id: '70',
          name: '排污口',
          iconName: '排污口',
          children: []
        },
        {
          id: '71',
          name: '信访调处餐饮服务业',
          iconName: '信访调处餐饮服务业',
          children: []
        },
        {
          id: '72',
          name: '其它',
          iconName: '其它',
          children: []
        }]
      }
      ],
      imageTreeKeys: {
        keys: ['11'],
        keysData: []
      },
      gridSelectData: [
        { id: 1, name: '所有一级网格', selected: true },
        { id: 2, name: '所有二级网格', selected: false },
        { id: 3, name: '所有三级网格', selected: false },
        { id: 4, name: '所有四级网格', selected: false }
      ],
      gridTreeData: [
        {
          id: '1',
          name: '乐山市11',
          children: [
            {
              id: '11',
              name: '峨眉山市',
              children: []
            },
            {
              id: '12',
              name: '五通桥区',
              children: []
            },
            {
              id: '13',
              name: '金口河区',
              children: []
            }
          ]
        }
      ],
      gridTreeKeys: {
        keys: ['12'],
        keysData: []
      },
      // 分布图点位数据
      pointDistributionData: [],
      // 热力图
      heatmapObject: {
        max: 300,
        min: 0,
        data: []
      }
    }
  },
  methods: {
    handleRadioSelected(val) { // 分布图 、热力图
      console.log(val)
      if (val.id === 'distribution') {
        this.heatmapObject.data = []
        setTimeout(() => {
          this.pointDistributionData = [
            { id: Math.random(), name: '巡查任务-待执行', pointType: '1', longitude: 101.493529, latitude: 26.666813, value: '1', valueName: '待执行' },
            { id: Math.random(), name: '巡查任务-执行中', pointType: '1', longitude: 101.520651, latitude: 26.648118, value: '2', valueName: '执行中' },
            { id: Math.random(), name: '巡查任务-已执行', pointType: '1', longitude: 101.547430, latitude: 26.648118, value: '3', valueName: '已执行' },
            { id: Math.random(), name: '巡查任务-待执行', pointType: '1', longitude: 103.746691, latitude: 29.556521, value: '1', valueName: '待执行' },
            { id: Math.random(), name: '巡查任务-执行中', pointType: '1', longitude: 103.725405, latitude: 29.539387, value: '2', valueName: '执行中' },
            { id: Math.random(), name: '巡查任务-已执行', pointType: '1', longitude: 103.755961, latitude: 29.522784, value: '3', valueName: '已执行' },
          ]
        }, 500)
      } else {
        this.pointDistributionData = []
        this.heatmapObject.data = [
          { id: Math.random(), name: 'name-1', pointType: '1', longitude: 101.493529, latitude: 26.636813, value: 10 },
          { id: Math.random(), name: 'name-1', pointType: '1', longitude: 101.520651, latitude: 26.648118, value: 110 },
          { id: Math.random(), name: 'name-1', pointType: '1', longitude: 101.567430, latitude: 26.658118, value: 150 },
          { id: Math.random(), name: 'name-1', pointType: '1', longitude: 103.746691, latitude: 29.556521, value: 10 },
          { id: Math.random(), name: 'name-1', pointType: '1', longitude: 103.725405, latitude: 29.539387, value: 200 },
          { id: Math.random(), name: 'name-1', pointType: '1', longitude: 103.755961, latitude: 29.522784, value: 150 }
        ]
      }
    },
    handlerMapSingleClick(data) {
    },
    handlerChangeTreeImages(dataTreeId, treeArray) {
      console.log('图层树的选中')
      console.log(dataTreeId, treeArray)
    },
    handlerChangeCheckbox(val) {
      if (val) {
        console.log('显示网格')
      } else {
        console.log('不显示网格')
      }
    },
    handlerGridSelectValue(val, obj) {
      console.log('下拉选择的几级网格', val, obj)
    },
    handlerChangeTreeGrid(dataTreeId, treeArray) {
      console.log('网格树的选中')
      console.log(dataTreeId, treeArray)
    },
    handlerMovePopup(data) {
      console.log('启用了移动弹窗')
    },
    handlerSearchMethod(obj) {
      this.$store.dispatch('olmap/changeSideBarViewData', { data: { 'list-box-image': [] }, total: 0 })
    }
  }
}
</script>

<style lang="scss" scoped>
  .ol-map {
    position: relative;
    padding: 0;
    overflow: hidden;
    width: calc(100%);
    height: calc(100%);
  }
</style>
