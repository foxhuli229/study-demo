
说明： 地图右侧盒子组件

引用：       RightBox: () => import('@/components/OlMap/RightBox'),


HTML:    
    <!-- 右侧盒子 第一种使用方式-->
    <right-box>
      <template #all>
        全部
      </template>
    </right-box>
    
     <!-- 右侧盒子 第二种使用方式-->
    <right-box>
          <template #head>
            头部
          </template>
          <template #middle>
            中间
          </template>
          <template #bottom>
            底部
          </template>
    </right-box>

备注： 关闭和打开行为
  // 展开
  this.$store.dispatch('olmap/toggleSideBoxRigthShow', true)
  // 收起
   this.$store.dispatch('olmap/toggleSideBoxRigthShow', false)


 <right-box :updown-expand="true" :panel-expand="false" >
          <template #all>
            填充自己的业务组件
          </template>
 </right-box>
 
 
panelExpand: 左侧收缩按钮
topY： 上下位置控制
updownExpand: 上下收起
default-expand: 默认是否展开