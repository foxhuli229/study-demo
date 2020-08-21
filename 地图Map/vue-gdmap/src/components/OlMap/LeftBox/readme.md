
说明： 地图中间底部图例盒子

引用：LeftBox: () => import('./LeftBox')


HTML:   <left-box :updown-expand="true" :panel-expand="false" :tree-data="treeData" :left-box-expand ="true" />

备注：
<left-box :updown-expand="true" :top-y="70" :panel-expand="false"/>


属性解释：
        ↓↓↓
------名称----- | ------ 类型----- | -----默认值----- | ------ 说明------
panelExpand     | Boolean          | false            | 左侧收缩按钮
topY            | Number           | 60               | 与顶部的距离保持60%
bottomY         | Number           | 2                | 与底部的位置距离百分比      -备注topY或者bottomY一起用的情况 bottomY生效
width           | Number           | 0                | 整体宽度 单位（px）
updownExpand    | Boolean          | false            | 是否支持折叠
treeData        | Array            | []               | 内部树的数据
left-box-expand | Boolean          | false            | 默认是否显示数据
treeHeight      | Number           | 250              | 内部树的高度 250px
supportImages   | Boolean          | true             | 是否支持图片