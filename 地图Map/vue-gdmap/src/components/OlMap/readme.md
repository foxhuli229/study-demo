
# 地图

## 引用：    OlMap: () => import('@/components/OlMap'),

## HTML:     <ol-map ref="olMapChild" @registerClickEvent="mapClickEvent" @registerSingleClickEvent="mapSingleClickEvent"></ol-map>

##备注
： @registerClickEvent 返回的时候地图原生的点击事件元素
       @registerSingleClickEvent 返回的是点击图标元素返回的数据json
       @registerMoveendEvent 地图移入事件返回

## 属性：
   registerClickEvent: 地图点击元素事件的回调 ：地图点击元素的事件 这里涉及到业务逻辑，组件不处理业务相关的内容，需要自己去实现
 
 
 ##高级篇：
   <ol-map ref="olMapChild" @registerClickEvent="mapClickEvent">
       <div slot>1</div>
       <div slot="popup">2</div>
            !-- 自定义弹窗内容  最新写法-->
             <template #popup>
               <enterprise-popup :single-data="singleData" />
             </template>
     </ol-map>
     
            // 图例插槽
           <slot name="legend" />
            // 工具条插槽
            <slot name="toolContainer" />
            // 地图上的任意位置的盒子
            <slot name="box" />
//------------------------------------------------------------
  ###插槽 存在的意义        
  ------插槽名称-----  | ------ 描述----- 
  popup                | 气泡插槽弹窗   头部是蓝色的     
  popup2               | 气泡插槽弹窗   头部是白色的      
  popup3               | 气泡插槽弹窗   只有名称
  search               | 搜索的插槽
  legend               | 图例的插槽
  toolContainer        | 工具的插槽
  box                  | 任意位置的插槽
  rightBox             | 右边的插槽
  leftBox              | 左边的插槽
  movePopup            | 移动的插槽
          