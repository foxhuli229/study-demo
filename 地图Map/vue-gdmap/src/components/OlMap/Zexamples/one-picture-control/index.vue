<template>
  <div class="ol-map">
    <one-picture-control
      :adminis-options="adminisOptions"
      :key-area-options="keyAreaOptions"
      :tree-data="treeData"
      :statistic-obj="statisticObj"
      :statistic-oline="statisticOline"
      :ep-status-table="epStatusTable"
      :default-data="pointDefaultData"
      @singleClick="handlerSingleClick"
      @searchMethod="handlerSearchMethod"
    >
      <template #popupName>
        <div />
      </template>
    </one-picture-control>
  </div>
</template>

<script>
export default {
  components: {
    OnePictureControl: () => import('@/components/OlMap/CustomMade/OnePictureControl')
  },
  data() {
    return {
      // 行政区域
      adminisOptions: [{
        id: '1',
        name: '创业园区1'
      }, {
        id: '2',
        name: '创业园区2'
      }],
      // key area  重点区域
      keyAreaOptions: [{
        id: '1',
        name: '重点区域01'
      }, {
        id: '2',
        name: '重点区域02'
      }
      ],
      treeData: [{
        id: '1',
        name: '污染源企业',
        children: [
          {
            id: '11',
            name: '重点污染源',
            children: []
          },
          {
            id: '12',
            name: '一般污染源',
            children: []
          }
        ]
      }],
      statisticObj: {
        onlineRate: 100, // 视频在线率
        epCount: 0 // 污染源企业 多少家
      },
      statisticOline: { // 视频在线率 - 统计图
        deviceCount: 7,
        deviceOline: 5,
        netWorkCount: 3,
        netWorkOline: 5,
        videoCount: 10,
        videoOline: 9
      },
      // 污染源企业运行状态统计
      epStatusTable: [
        { 'name': '正常', 'count': 3, 'per': '100%' },
        { 'name': '停产', 'count': 0, 'per': '0.00%' },
        { 'name': '临时停产', 'count': 0, 'per': '0.00%' },
        { 'name': '倒闭', 'count': 0, 'per': '0.00%' },
        { 'name': '搬迁', 'count': 0, 'per': '0.00%' },
        { 'name': '改建', 'count': 0, 'per': '0.00%' },
        { 'name': '其它', 'count': 0, 'per': '0.00%' }
      ],
      pointDefaultData: []
    }
  },
  mounted() {
    // 默认选中左侧tree
    this.$store.dispatch('olmap/changeLeftDefaultKeys', { keys: ['11'], keysData: [] })
    setTimeout(() => {
      this.pointDefaultData = [
        // 攀西点位
        { id: Math.random(), name: '异常污染源', pointType: '10', longitude: 101.493529, latitude: 26.666813, value: 1 },
        { id: Math.random(), name: '正常污染源', pointType: '9', longitude: 101.520651, latitude: 26.648118, value: 1 },
        // 乐山点位
        { id: Math.random(), name: '异常污染源', pointType: '10', longitude: 103.746691, latitude: 29.556521, value: 1 },
        { id: Math.random(), name: '正常污染源', pointType: '9', longitude: 103.725405, latitude: 29.539387, value: 1 }
      ]
    }, 500)
  },
  methods: {
    handlerSingleClick(data) {
      // 拿到数据，查询并填充自己的组件
      console.log('拿到数据，查询并填充自己的组件')
      // 返回的数据里里面包含了颜色值
      console.log(data)
    },
    handlerSearchMethod(obj) {
      // 搜索的查询参数
      console.log('搜索的查询参数' + obj)
      this.listBox = [
        { id: Math.random(), name: '异常污染源', pointType: '10', longitude: 101.493529, latitude: 26.666813, value: 1 },
        { id: Math.random(), name: '正常污染源', pointType: '9', longitude: 101.520651, latitude: 26.648118, value: 1 },
        { id: Math.random(), name: '正常污染源', pointType: '9', longitude: 101.547430, latitude: 26.648118, value: 1 },
        { id: Math.random(), name: '正常污染源', pointType: '9', longitude: 101.547430, latitude: 26.614317, value: 1 },
        { id: Math.random(), name: '异常污染源', pointType: '10', longitude: 103.746681, latitude: 29.556511, value: 1 },
        { id: Math.random(), name: '正常污染源', pointType: '9', longitude: 103.746591, latitude: 29.556521, value: 1 },
        { id: Math.random(), name: '正常污染源', pointType: '9', longitude: 103.746491, latitude: 29.556321, value: 1 },
        { id: Math.random(), name: '正常污染源', pointType: '9', longitude: 103.746391, latitude: 29.556121, value: 1 }
      ]
      this.$store.dispatch('olmap/changeSideBarViewData', { data: { 'list-box-image': this.listBox }, total: 4 })
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
