
说明： 拼装指挥调度基本界面


 属性的解释:
      ↓↓↓
 ------名称-----   |----- 类型-----   | -----默认值-----                               | ------ 说明------
 treeData          | Array            | []                                             | 左侧树的数据又外部传入
 adminisOptions    | Array            | []                                             | 行政区域下拉数据
 keyAreaOptions    | Array            | []                                             | 重点区域下拉数据
 leftListData      | Array            | []                                             | 根据查询点击tree 查询回来的数据
 -----------------------------------------------------------------------------------------------------------
 toolPropsObj      | Object           | { fullScreen: true, ....}                      | 启用工具条功能属性.
 locationInOut     | Object           | { right: '10px', bottom: '80px' }              | 放大缩小的页面位置
 
  方法的解释:
        ↓↓↓
   ------名称-----               | ------ 说明------
   addAqiMarker                  | 添加大气环境点位
   addWaterMarker                | 添加水环境点位
   addSoliMarker                 | 添加土壤环境点位
   addWaterMarker                | 添加水环境点位
   singleMarker                  | 单个图标点击
   mapSingleClickEvent           | 地图点击事件回调
   searchMethod                  | 搜索参数回调
   clearMethod                   | 清空结果的方法
   clearMarker                   | 清空点位的方法
