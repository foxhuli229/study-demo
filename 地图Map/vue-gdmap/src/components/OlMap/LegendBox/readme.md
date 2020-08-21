
说明： 地图中间底部图例盒子

引用：  LegendBox: () => import('@/components/OlMap/LegendBox')


HTML:      <legend-box :viewLegend="viewLegend" />
           // 使用现有的图例
            viewLegend: 'noise-legend', // 图例

备注：

    <legend-box>
      <template #legend>
        自定义图例
      </template>
    </legend-box>
    
    高阶：
     this.$store.dispatch('olmap/changeLegendView', { view: 'air-legend', show: true })
     
     
                      ------名称-----   |----- 类型-----   | -----默认值-----   | ------ 说明------
                      viewLegend        | String           | 'air-legend'       | 特例字符串
                        ↓↓↓
                        目前拥有的图例
                        'enter-legend'： 企业图例
                        'air-legend': 大气环境图例
                        'water-legend': 水环境图例
                        'noise-legend': 噪声环境图例
                        'soil-legend': 土壤环境图例
                        'biaozhu-legend': 企业标注图裂
                        'industry-legend': 警情分布图例
                        'distribution-legend': 分布图图例
                       leftX             | Number           | 35                 | 左边距离：位置百分比
                       leftB             | Number           | 2                  | 下边距离：位置百分比