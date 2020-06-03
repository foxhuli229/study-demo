创建时间：2020-05-06
说明： 网格化一张图

 属性的解释:
      ↓↓↓
 ------名称-----   |----- 类型-----   | -----默认值-----                               | ------ 说明------
 locationInOut     | Object           | { right: '10px', bottom: '80px' }              | 放大缩小的页面位置
 toolPropsObj      | Object           | { fullScreen: true, ....}                      | 启用工具条功能属性
 radioArray        | Array            | []                                             | 页面单选按钮 分布图、热力图 等....
 viewLegend        | String           | ''                                             | 图例
 
 方法的解释:
       ↓↓↓
  ------名称-----              | ------ 说明------
  handleRadioSelected(val)     | 单选按钮点击回调参数
  closeOrOpenByLegend(val)     | 关闭或者开启图例
