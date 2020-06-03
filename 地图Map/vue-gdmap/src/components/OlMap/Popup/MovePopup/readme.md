

说明： 移动的Popup
引用：MovePopup: () => import('@/components/OlMap/Popup/MovePopup')

HTML:  第一种
       <move-popup :popup-property="popupProperty">
         <template #popup>
           <div style="width: 450px;height: 300px;">填充内容 填充自己的业务组件 点击头部可拖拽</div>
         </template>
       </move-popup>
       第二种
       <move-popup :popup-property="popupProperty">
             <template #popup2>
               <div style="width: 450px;height: 300px;">填充内容 填充自己的业务组件 点击头部可拖拽</div>
             </template>
       </move-popup>
       第三种
       <move-popup :popup-property="popupProperty">
             <template #popup3>
               <div></div>
             </template>
       </move-popup>
       第四种
        <move-popup :popup-property="popupProperty">
             <template #popupAll>
                <div class="popup-all-dragx">
                   <div class="title-dragx drag-box">
                     <a class="popup-name-dragx">{{ subData.name }}</a>
                   </div>
                   <div class="div-box-dragx">
                   </div>
                </div>   
             </template>
        </move-popup>

属性：
 width-auto = 'true'  宽度自适应
 height-auto = 'true'  高度自适应
 is-full: 是否开启全屏
 popupProperty: {
        show: true,
        title: 'xxx名称',
        dragBarClass: 'drag-box',
        left: 20,
        top: 80,
        right: 0,
        bottom: 0,
        width: 500,
        height: 0
      }

------名称----- | ------ 类型----- | -----默认值----- | ------ 说明------
show            | Boolean          | false            | 显示、不显示
title           | String           | ''               | 标题
dragBarClass    | String           |  'drag-box'      | 拖拽的元素
left            | Number           | 0                | 左边距离  0 代表是不生效的
top             | Number           | 0                | 顶部距离  0 代表是不生效的
right           | Number           | 0                | 右边距离  0 代表是不生效的
bottom          | Number           | 0                | 下边距离  0 代表是不生效的
width           | Number           | 0                | 组件的宽度 0 代表是不生效的
height          | Number           | 0                | 组件的高度 0 代表是不生效的
resizeEdge      | Number           | 0                |  0 变大变小
canResize       | Boolean           | true            | 改变窗口大小