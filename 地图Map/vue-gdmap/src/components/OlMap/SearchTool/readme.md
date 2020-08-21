
说明： 地图左上角搜索组件
引用：SearchTool: () => import('@/components/OlMap/SearchTool'),
<!-- 左上搜索 searchMethod: 查询回调 ,clear:清空搜索结果的回调-->
HTML:   <search-tool :panel-expand="false" :mouseout-flag="false" @searchClick="handlerSearchMethod" @clear="handlerClearMethod"/>

 
 
  <!-- 左上搜索 searchMethod: 查询回调 ,clear:清空搜索结果的回调-->
     <search-tool :panel-expand="false" :mouseout-flag="false" @searchClick="handlerSearchMethod" @clear="handlerClearMethod">
       <!-- 自定义搜索展示-->
       <template #listBox>
           111111
       </template>
     </search-tool>
     
     mouseoutFlag： true :启用移出消失搜索结果
     
     插槽解释：
     
     sideBoxAll: 全部站位
     
     
属性解释：
        ↓↓↓
------名称-----       | ------ 类型----- | -----默认值-----                                  | ------ 说明------
panelExpand           | Boolean          | false                                             | 具备/不具备 向左侧缩进的功能  true/ false
mouseoutFlag          | Boolean          | true                                              | ListBox 搜索结果是否支持鼠标移除关闭 标记变量

回调方法
   @searchMethod="handlerSearchMethod"  搜索回调的方法 返回搜索参数对象
   
   @clear=""  清空方法 资源释放，点位释放
   @list-box-closer="" 关闭搜索结果的回调