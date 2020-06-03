
说明：左下角底图类型切换
layers = [
        { name: '平面地图', id: 'vec_type', url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png', isShow: 1 },
        { name: '遥感影像', id: 'img_type', url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png', isShow: 1 },
        { name: '地形地图', id: 'ter_type', url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png', isShow: 0}
         .....
     ];
      
name: 名称
id: '唯一' 备注 不可变
url: 地址
isShow： 1/显示 0/不显示


<layers-box :expand="true"  :bottom="10" :left="10" ></layers-box>

expand: 默认是不展开的 true / false

 <layers-box :current-index="1"  :bottom="10" :left="10" />
 
 current-index: 默认选中第几个视图，第一个视图 0 ，第二个视图 1
 
<layers-box :show-box="true"  :bottom="10" :left="10" />
show-box: 该属性是否显示

------名称----- | ------ 类型----- | -----默认值----- | ------ 说明------
showBox         | Boolean          | true             | 该属性可以隐藏，但是可以使用里面的图层功能
currentIndex    | Number           | 0                | 默认选中第一个
expand          | Boolean          | false            | 是否展开
maxLayerNum     | Number           | 3                | 显示几个图 1 到 3
left            | Number           | 0                | 位置 0代表不生效
top             | Number           | 0                | 位置 0代表不生效
right           | Number           | 0                | 位置 0代表不生效
bottom          | Number           | 0                | 位置 0代表不生效