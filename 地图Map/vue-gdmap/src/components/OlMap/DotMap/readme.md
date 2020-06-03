
说明：地图打点组件 支持：打点，画线，画面 dot line area

引用：   DotMap: () =>import('@/components/OlMap/DotMap')

HTML:    <dot-map v-if="dialogObjDotMap.visible" :dialog-object="dialogObjDotMap" :radio-flag="radioMapFlag" @getDataByMap="getDataByDotMap" />
             
 data() {
    return {
          formData: {
            longitude: '',
            latitude: '',
            address: '',
            lineString: '',
            polygonString: ''
          }
    }
 }
  

配置：
dialogObjDotMap:{
  title: '地址标记',
  visible: true,
  dialogWidth: '800px', // 弹出额宽度
  dotMapHeight: '450px', // 地图的显示高度
  data: {
    type: 'Point', // Point：dot打点 --- Line: 画线  --- Area : 画面
    data: this.formDot
  }
}

dialogObjDotMap = {
        title: '地图绘线',
        visible: true,
        dialogWidth: '900px',
        dotMapHeight: '450px',
        data: {
          type: 'LineString',
          data: this.formLine
        }
}

dialogObjDotMap = {
        title: '地图绘面',
        visible: true,
        dialogWidth: '900px',
        dotMapHeight: '450px',
        data: {
          type: 'Polygon',
          data: this.formPolygon
        }
}

回执结果：
 getDataByDotMap(data) {
      if (data.type === 'Point') {
        this.formDot = data
      }
      if (data.type === 'LineString') {
        this.formLine = data
      }
      if (data.type === 'Polygon') {
        this.formPolygon = data
      }
 }
 
 属性：是否使用打点组合 点、线、面
 :radio-flag="radioMapFlag" 默认为 false ,true:使用组合打点