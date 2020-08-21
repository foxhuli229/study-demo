创建时间：2020-05-12

引用： WidgetControl: () => import('@components/OlMap/CustomMade/WidgetControl'),

html:            <WidgetControl :online-rate="90" :ep-count="16">
                            <template #head>
                              111111
                            </template>
                            <template #bottom>
                              11111122222
                            </template>
                 </WidgetControl>
                
                
                  #插槽 存在的意义        
                  ------插槽名称-----  | ------ 描述----- 
                  head                 | 上边   1 半
                  popup2               | 下边   1 半  
                  all                  | 全部   占据全部内容的替换

属性解释：
        ↓↓↓
------名称-----       | ------ 类型----- | -----默认值-----                                  | ------ 说明------
statisticObj:{
  onlineRate            | Number           | 100                                               | 视屏在线率 单位（%）
  epCount               | Number           | 0                                                 | 污染源数量 单位（家）
}



