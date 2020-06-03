
说明： 环境质量GIS的基本界面

业务定制化，组件内部不做任何请求

逻辑-》接收数据，产出行为，产出数据

 属性的解释:
      ↓↓↓
 ------名称-----   |----- 类型-----   | -----默认值-----                               | ------ 说明------
 treeData          | Array            | []                                             | 左侧树的数据又外部传入
 aqiAlarmVal       | Number           | 500                                            | 大气环境预警值
 airData           | Array            | []                                             | 大气环境数据
 waterData         | Array            | []                                             | 水质环境数据
 soilData          | Array            | []                                             | 土壤环境数据
 adminisOptions    | Array            | []                                             | 行政区域下拉数据
 keyAreaOptions    | Array            | []                                             | 重点区域下拉数据
 
 -----------------------------------------------------------------------------------------------------------
 toolPropsObj      | Object           | { fullScreen: true, ....}                      | 启用工具条功能属性.
 viewLegend        | String           | ''                                             | 图例
 
 方法的解释:
       ↓↓↓
  ------名称-----               | ------ 说明------
  clear                         | 清空点位的方法
  mapSingleClickEvent           | 地图点击事件回调
  searchMethod                  | 搜索参数回调
  clearMethod                   | 清空结果的方法
  clearMarker                   | 清空点位的方法