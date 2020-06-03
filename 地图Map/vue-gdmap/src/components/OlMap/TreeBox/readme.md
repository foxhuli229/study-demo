
说明： 树形组件
引用：TreeBox: () => import('@/components/OlMap/TreeBox')


HTML:    <TreeBox :tree-height="220" :support-images="false" :tree-data="treeData" :left-default-keys="treeKeys" @change="handlerChangeTree" />


属性解释：
        ↓↓↓
------名称-----       | ------ 类型----- | -----默认值-----                                  | ------ 说明------
treeDefaultProps      | Boolean          | { children: 'children',label: 'name' }            | tree 解析树的数据格式
treeHeight            | Number           | 250                                               | tree 的高度，超出这个高度将出现纵向滚动条
leftDefaultKeys       | Object           | { keys: [],keysData: [] }                         | keys 树默认选中的id, keysData: 默认选中的对象
supportImages         | Boolean          | true                                              | 是否支持图标 
treeData              | Array            | []                                                | 树形数据
参考：[
      { id: '1', name: '名称1', children: [] },
      { id: '2', name: '名称2', children: [
                                            { id: '21', name: '名称21', children: [] },
                                            { id: '22', name: '名称22', children: [] }
                                            ] }
   ]
   
回调方法
   @change="handlerChangeTree"
   
   handlerChangeTree(dataTreeId, treeArray)
   
   
    [{
           id: '1',
           name: '应急事件',
           iconName: '文件夹',
           isEdit: false,
           children: [
             {
               id: '11',
               name: '待响应',
               iconName: '待响应',
               isEdit: false,
               children: []
             },
             {
               id: '12',
               name: '响应中',
               iconName: '响应中',
               isEdit: false,
               children: []
             },
             {
               id: '13',
               name: '已响应',
               iconName: '已响应',
               isEdit: false,
               children: []
             }
           ]
         }]
         
         
                     <TreeBox
                       :tree-height="300"
                       :tree-data="imageTreeData"
                       :left-default-keys="imageTreeKeys"
                       :filter-falg="true"
                       :is-edit-object="{
                           addParentNode: true,
                           expandOnClickNode: false ,
                           editFlag: true,
                           deleteFlag: true,
                           uploadFlag: true,
                           downloadFlag: true,
                           addNodeFlag: true
                       }"
                       @changTreeData="handlerChangTreeData"/>