<template>
  <div class="ol-map">
    <envir-quality-map
      :tree-data="treeData"
      :air-data="airData"
      :water-data="waterData"
      :soil-data="soilData"
      :adminis-options="adminisOptions"
      :key-area-options="keyAreaOptions"
      :aqi-alarm-val="300"
      @handlerSingleClick="handlerSingleClick"
      @handlerSearchMethod="handlerSearchMethod"
    >
      <template #EQMPopup>
        <div style="width: 450px;height: 300px;">填充内容 填充自己的业务组件</div>
      </template>
      <template #rightBoxHead>
        头部 填充自己的业务组件 {{ topTypeClick.name }}
      </template>
      <template #rightBoxMiddle>
        中间 填充自己的业务组件 {{ topTypeClick.name }}
      </template>
      <template #rightBoxBottom>
        底部 填充自己的业务组件 {{ topTypeClick.name }}
      </template>
    </envir-quality-map>
  </div>
</template>

<script>
export default {
  name: 'EnvirQuality',
  components: {
    EnvirQualityMap: () => import('@/components/OlMap/CustomMade/EnvirQualityMap')
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
      }],
      // 专题图层tree
      treeData: [{
        id: '1',
        name: '空气监测站',
        iconName: '空气监测站',
        children: []
      }, {
        id: '2',
        name: '企业污染源',
        iconName: '文件夹',
        children: [{
          id: '21',
          name: '重点污染源',
          iconName: '重点污染源',
          children: []
        },
        {
          id: '22',
          name: '一般污染源',
          iconName: '一般污染源',
          children: []
        }]
      }, {
        id: '3',
        name: '环境敏感点',
        iconName: '文件夹',
        children: [{
          id: '31',
          name: '生态保护区',
          iconName: '生态保护区',
          children: []
        },
        {
          id: '32',
          name: '文化教育',
          iconName: '文化教育',
          children: []
        },
        {
          id: '33',
          name: '居民生活',
          iconName: '居民生活',
          children: []
        },
        {
          id: '34',
          name: '医疗卫生',
          iconName: '医疗卫生',
          children: []
        },
        {
          id: '35',
          name: '机关单位',
          iconName: '机关单位',
          children: []
        }]
      }],
      listBox: [],
      airData: [], // 大气的点位数据
      waterData: [], // 水环境的数据，
      soilData: []// 土壤点位数据
    }
  },
  computed: {
    topTypeClick() {
      return this.$store.state.olmap.topTypeClick
    },
    leftTreeKeys() { // Tree选中的数据id
      return this.$store.state.olmap.leftDefaultKeys
    }
  },
  watch: {
    leftTreeKeys: {
      handler(newVal, oldVal) {
        // 选中改变，拿到查询参数去查询数据结果
        if (newVal.keysData.length > 0) {
          console.log('选中改变，拿到查询参数去查询数据结果')
          console.log(newVal)
        }
      },
      deep: true
    },
    topTypeClick: {
      handler: function(newVal, oldVal) {
        const id = newVal.id
        if (id === undefined) {
          this.airData = []
          this.waterData = []
          this.soilData = []
        } else {
          switch (id) {
            case 1:
              console.log('请求大气环境的数据')
              this.$nextTick(() => {
                this.airData = [
                  { id: Math.random(), name: '格里坪大气监测微站01-优', pointType: '1', longitude: 101.576987, latitude: 26.597119, value: 20 },
                  { id: Math.random(), name: '格里坪大气监测微站02-良', pointType: '1', longitude: 101.465407, latitude: 26.641939, value: 58 },
                  { id: Math.random(), name: '格里坪大气监测微站03-轻度污染', pointType: '1', longitude: 101.483946, latitude: 26.587195, value: 112 },
                  { id: Math.random(), name: '格里坪大气监测微站04-中度污染', pointType: '1', longitude: 101.466093, latitude: 26.543437, value: 185 },
                  { id: Math.random(), name: '格里坪大气监测微站05-重度污染', pointType: '1', longitude: 101.568403, latitude: 26.575586, value: 255 },
                  { id: Math.random(), name: '格里坪大气监测微站06-严重污染', pointType: '1', longitude: 101.610918, latitude: 26.589107, value: 350 }
                ]
              })

              break
            case 2:
              // 请求大气环境的数据
              console.log('请求水质环境的数据')
              this.waterData = [
                { id: Math.random(), name: '水质监测站1', pointType: '2', longitude: 101.480440, latitude: 26.671717, value: 1 },
                { id: Math.random(), name: '水质监测站2', pointType: '2', longitude: 101.469797, latitude: 26.646842, value: 2 },
                { id: Math.random(), name: '水质监测站3', pointType: '2', longitude: 101.489023, latitude: 26.614071, value: 3 },
                { id: Math.random(), name: '水质监测站4', pointType: '2', longitude: 101.483187, latitude: 26.583703, value: 4 },
                { id: Math.random(), name: '水质监测站5', pointType: '2', longitude: 101.530566, latitude: 26.612730, value: 5 },
                { id: Math.random(), name: '水质监测站6', pointType: '2', longitude: 101.504473, latitude: 26.628711, value: 6 }
              ]
              break
            case 3:
              // 请求大气环境的数据
              console.log('请求土壤环境的数据')
              this.soilData = [
                { id: Math.random(), name: '主城区土壤环境检测点1', pointType: '3', longitude: 101.483248, latitude: 26.665437, value: 1 },
                { id: Math.random(), name: '主城区土壤环境检测点2', pointType: '3', longitude: 101.469797, latitude: 26.646842, value: 2 },
                { id: Math.random(), name: '主城区土壤环境检测点3', pointType: '3', longitude: 101.489023, latitude: 26.614071, value: 3 },
                { id: Math.random(), name: '主城区土壤环境检测点4', pointType: '3', longitude: 101.483187, latitude: 26.583703, value: 4 },
                { id: Math.random(), name: '主城区土壤环境检测点5', pointType: '3', longitude: 101.637811, latitude: 26.605392, value: 5 }
              ]
              break
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    // 默认选中左侧tree
    this.$store.dispatch('olmap/changeLeftDefaultKeys', { keys: ['1'], keysData: [] })
    this.$store.dispatch('olmap/changeExcursion', true)
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
        { id: Math.random(), name: '重点污染源企业', pointType: '1', longitude: 101.493529, latitude: 26.666813, value: 1 },
        { id: Math.random(), name: '一般污染源企业', pointType: '2', longitude: 101.520651, latitude: 26.648118, value: 1 },
        { id: Math.random(), name: '空气微站', pointType: '3', longitude: 101.547430, latitude: 26.648118, value: 1 },
        { id: Math.random(), name: '生态保护区', pointType: '4', longitude: 101.547430, latitude: 26.614317, value: 1 },
        { id: Math.random(), name: '文化教育', pointType: '5', longitude: 101.633261, latitude: 26.624804, value: 1 },
        { id: Math.random(), name: '居民生活', pointType: '6', longitude: 101.643904, latitude: 26.601989, value: 1 },
        { id: Math.random(), name: '医疗卫生', pointType: '7', longitude: 101.630858, latitude: 26.577801, value: 1 },
        { id: Math.random(), name: '机关单位', pointType: '8', longitude: 101.532668, latitude: 26.607858, value: 1 }
      ]
      this.$store.dispatch('olmap/changeSideBarViewData', { data: { 'list-box-image': this.listBox }, total: 8 })
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
