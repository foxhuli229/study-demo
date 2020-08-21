
说明：这是一个地图右边上角工具集装箱

引用： 

  ToolContainer: () => import('@/components/OlMap/ToolContainer')

 
HTML: 
  <!-- 地图右上角工具集装箱 -->
  <tool-container :toolPropsObj="toolPropsObj"></tool-container>
 
属性：
 toolPropsObj: {
 
     fullScreen: true, // 启用全屏/退出全屏功能                 ------------------   true / false
            
     clear: true, // 启用默认的清楚功能
     
     toolBox: true, // 是否启用工具 测量 侧面 标点
     
     cityChange: true // 天气
            
 }
 
 备注：当工具里面的工具当不满足的时候，可以自己定义HTML片段或者组件
  <tool-container :tool-obj="toolPropsObj">
       <div slot="before">前面</div>
       <div slot="append">后面</div>
   </tool-container>
   
   <tool-container :tool-obj="toolPropsObj">
          <template #before>前面</template>
          <template #append>后面</template>
   </tool-container>
   
   toolPropsObj：属性对象 
                  ↓↓↓
                 ------名称-----   |----- 类型-----   | -----默认值-----   | ------ 说明------
                 fullScreen        | Boolean          | false              | 全屏
                 clear             | Boolean          | false              | 清除
                 toolBox           | Boolean          | false              | 工具箱：测距、侧面、标点
                 toolCl            | Boolean          | false              | 测距
                 toolCm            | Boolean          | false              | 侧面
                 cityChange        | Boolean          | false              | 显示城市
                 airWaterNoiseSoil | Boolean          | false              | 特殊定制的：水土气声按钮切换
                 selectBox         | Boolean          | false              | 行政区划下拉，重点区域下拉
                 radioBox          | Boolean          | false              | 单选切换 ：分布图、热力图 ---- 切换回调
                 
    adminisOptions：行政区域
                       ↓↓↓
                      数据格式：{ id: '1', name: '创业园区1' }, { id: '2', name: '创业园区2' }
                     
    keyAreaOptions: key area  重点区域
                      ↓↓↓
                      数据格式：{ id: '1', name: '重点区域01' }, { id: '2', name: '重点区域02' }
                      
    radioArray： 组合单选 列入 分布图、热力图 radio：true/ false 默认选中
                       ↓↓↓
                       数据格式：{ id: 'distribution', name: '分布图', radio: true },
                                 { id: 'heating', name: '热力图', radio: false }