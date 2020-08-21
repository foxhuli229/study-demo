<template>
  <div class="tree-box-map">
    <div v-if="filterFalg" class="filter-structure">
      <el-input v-model="filterText" size="mini" placeholder="输入关键字进行过滤" />
    </div>
    <div v-if="isEditObject.addParentNode" class="add-parent-node">
      <el-button type="text" size="mini" class="add-parent-node" @click="addParentNode"><i />添加父节点</el-button>
      <el-row v-show="addParentNodeFlag" class="add-parent-node-flag">
        <el-col :span="12">
          <el-input v-model="newParentNodeName" size="mini" placeholder="请输入父节点名称" />
        </el-col>
        <el-col :span="12">
          <el-button size="mini" class="btn-sure" @click.stop="addParentNodeSure">确定</el-button>
          <el-button size="mini" class="btn-cancel" @click.stop="addParentNodeCancel">取消</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="tree-list" :style="{ height:treeHeight + 'px' }">
      <el-scrollbar style="height: 100%;">
        <el-tree
          ref="tree"
          :key="treeKey"
          :data="treeData"
          :show-checkbox="showCheckbox"
          node-key="id"
          default-expand-all
          :default-checked-keys="leftDefaultKeys.keys"
          :default-expanded-keys="defaultExpand"
          :render-content="renderContent"
          :props="treeDefaultProps"
          :expand-on-click-node="isEditObject.expandOnClickNode"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          @check-change="handleCheckedNodes"
        />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeBox',
  props: {
    treeDefaultProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'name'
        }
      }
    },
    treeHeight: {
      type: Number,
      default: 250
    },
    leftDefaultKeys: {
      type: Object,
      default: () => {
        return {
          keys: [],
          keysData: []
        }
      }
    },
    supportImages: { // 支持带图片
      type: Boolean,
      default: true
    },
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    },
    filterFalg: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: true
    },
    isEditObject: {
      type: Object,
      default: () => {
        return {
          addParentNode: false, // 开启添加父节点按钮
          expandOnClickNode: true, // 点击节点是否收缩
          editFlag: false,
          deleteFlag: false,
          uploadFlag: false,
          downloadFlag: false,
          addNodeFlag: false
        }
      }
    }
  },
  data() {
    return {
      dataTreeId: [],
      filterText: '', // 搜
      addParentNodeFlag: false,
      newParentNodeName: '',
      treeKey: 0,
      defaultExpand: [],
      numIndex: 0
    }
  },
  computed: {
    configObj() {
      return this.$store.state.olmap.configObj
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.checkedNodes()
    })
  },
  methods: {
    /**
     * 数组去重
     * array : 需要去重的数组
     * newArray : 返回一个不重复的数据
     * */
    _uniqArray(array) {
      const newArray = [] // 一个新的临时数组
      // 遍历当前数组
      for (let i = 0; i < array.length; i++) {
        // 如果当前数组的第i已经保存进了临时数组，那么跳过
        // 否则把当前项push到临时数组里面
        if (newArray.indexOf(array[i]) === -1) newArray.push(array[i])
      }
      return newArray
    },
    recursiveQueryData(data) {
      let itemArray = []
      if (data.children.length > 0) {
        const dataArray = data.children
        if (dataArray.length > 0) {
          dataArray.forEach((item, index) => {
            itemArray = itemArray.concat(this.recursiveQueryData(item))
          })
          return itemArray
        }
      } else {
        itemArray.push(data.id)
      }
      return itemArray
    },
    handleCheckedNodes(data, flag) {
      if (data.children.length === 0) {
        this.checkedNodes()
      }
    },
    checkedNodes() {
      const dataTree = this.$refs.tree.getCheckedNodes()
      const arryA = {
        children: dataTree
      }
      const treeArray = []
      dataTree.forEach((item, index) => {
        if (item.children.length === 0) {
          treeArray.push(item)
        }
      })
      if (dataTree.length > 0) {
        const dataTreeId = this._uniqArray(this.recursiveQueryData(arryA))
        if (this.dataTreeId.toString() !== dataTreeId.toString()) {
          this.$emit('change', dataTreeId, treeArray)
          this.dataTreeId = dataTreeId
        }
      } else {
        if (this.dataTreeId.toString() !== '') {
          this.$emit('change', [], [])
          this.dataTreeId = []
        }
      }
    },
    showOrEdit(data) {
      if (data.isEdit) {
        return <input type='text' value={data.name} on-blur={ev => this.editSure(ev, data)}/>
      } else {
        return (<span class='name' slot='title' style='color: #333; font-size:12px;margin-left: 5px;'>{data.name}</span>)
      }
    },
    /* eslint-disable */
    renderContent(h, { node, data, store }) {
      const olmapUrl = this.configObj.olmapUrl
      let icon
      const children = data.children

      // -----------------------------------------------------------------------------
      let button
      let iconEdit
      let iconDelete
      let iconUploadFlag
      let iconDownloadFlag
      let iconAddNodeFlag
      if(!this.isEditObject.expandOnClickNode){
        if(this.isEditObject.editFlag){
          iconEdit = (<i title='修改' class='el-icon-edit' on-click={(ev) => this.nodeEdit(ev, store, data)}></i>)
        }
        if(this.isEditObject.deleteFlag){
          iconDelete = ( <i title='删除' class='el-icon-delete' on-click={() => this.nodeDelete(node, data)}></i>)
        }
        if(this.isEditObject.uploadFlag){
          iconUploadFlag = (
            <i title='上移' class='el-icon-upload2' on-click={() => this.nodeUp(node, data)}></i>
          )
        }
        if(this.isEditObject.downloadFlag){
          iconDownloadFlag = (
            <i title='下移' class='el-icon-download' on-click={() => this.nodeDown(store, node, data)}></i>
           )
        }
        if(this.isEditObject.addNodeFlag){
          iconAddNodeFlag = (
            <i title='添加' class='el-icon-plus' on-click={() => this.append(store, node, data)}></i>
          )
        }
        button = (
              <div class="tree-node-botton" style='float: right'>
                { iconEdit }
                { iconDelete }
                { iconUploadFlag }
                { iconDownloadFlag }
                { iconAddNodeFlag }
             </div>
        )
      }
      // -----------------------------------------------------------------------------
      if(this.supportImages){
        if (children.length > 0) {
          const style = `width: 16px; height:16px;display: inline-block;background-repeat: no-repeat;background-position: 0px 0px;background-size: 100% 100%;background-image: url(${olmapUrl}/static/olmap/images/thematic-layer/${data.iconName}.png)`
          icon = (<span style={style}></span>)
        } else {
          const style = `width: 16px; height:16px;display: inline-block;background-repeat: no-repeat;background-position: 0px 0px;background-size: 100% 100%;background-image: url(${olmapUrl}/static/olmap/images/thematic-layer/${data.iconName}.png)`
          icon = (<span style={style}></span>)
        }
        return (
          <span style='padding-right: 8px'>
                <span>
                    { icon }
                    {this.showOrEdit(data)}
                </span>
                { button }
        </span>
      )
      } else {
        return (
          <span style='padding-right: 5px'>
             <span>
                {this.showOrEdit(data)}
              </span>
              { button }
          </span>
      )
      }
    },
    editSure(ev, data) {
      const $input = ev.target.parentNode.parentNode.querySelector('input') || ev.target.parentElement.parentElement.querySelector('input')

      if (!$input) {
        return false
      } else {
        data.name = $input.value
        if(data.children.length > 0) {
          data.iconName = '文件夹'
        } else{
          data.iconName = $input.value
        }
        data.isEdit = false
      }
    },
    nodeEdit(ev, store, data) {   // 修改
      data.isEdit = true
      this.$nextTick(() => {
        const $input = ev.target.parentNode.parentNode.querySelector('input') || ev.target.parentElement.parentElement.querySelector('input')
        !$input ? '' : $input.focus()
      })
    },
    nodeDelete(node, data) { // 节点删除
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    append(store, node, data) { //      增加
      let maxid = 'addNode'
      this.numIndex = this.numIndex++
      // 新增数据
      const nodeapp = { id: maxid + this.numIndex , name: '增加节点', iconName: '增加节点', isEdit: false, children: [] }
      data.children.push(nodeapp)
      if (!node.expanded) {
        node.expanded = true
      }
      const parent = node.parent
      const children = parent.data
      const cIndex = children.findIndex(d => d.id === data.id)
      const tempChildrenNodex2 = children[cIndex] // 拿到被添加的上一级
    },
    nodeUp(node, data) {    // 节点上移
      const parent = node.parent
      const children = parent.data.children || parent.data
      const cIndex = children.findIndex(d => d.id === data.id)
      if (parent.level === 0 && cIndex === 0) {
        return
      } else if (parent.level !== 0 && cIndex === 0) { // 不同父节点中移动
      } else if ((parent.level === 0 && cIndex !== 0) || (parent.level !== 0 && cIndex !== 0)) {
        const tempChildrenNodex1 = children[cIndex - 1]

        const tempChildrenNodex2 = children[cIndex]

        this.$set(children, cIndex - 1, tempChildrenNodex2)

        this.$set(children, cIndex, tempChildrenNodex1)

        this.defaultExpand[0] = data.id
      }

      this.treeKey++
    },
    nodeDown(store, node, data) { // 节点下移
      const parent = node.parent
      const children = parent.data.children || parent.data
      const cIndex = children.findIndex(d => d.id === data.id)
      const cLength = children.length - 1 // 最边上的节点
      const allLevel = store.data.length - 1 // 树的深度

      if (parent.level === allLevel && cIndex === cLength) { // 最最末的节点
        return
      } else if (parent.level !== allLevel && cIndex === cLength) { // 父节点不同

      } else if ((parent.level === allLevel && cIndex !== cLength) || (parent.level !== allLevel && cIndex !== cLength)) { // 父节点相同
        const tempChildrenNodex1 = children[cIndex + 1]

        const tempChildrenNodex2 = children[cIndex]

        this.$set(children, cIndex + 1, tempChildrenNodex2)

        this.$set(children, cIndex, tempChildrenNodex1)

        this.defaultExpand[0] = data.id
      }

      this.treeKey++
    },
    handleNodeClick(data, node, vuecomponent) {
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    addParentNode(){
      this.addParentNodeFlag = true
    },
    addParentNodeSure(){
      const nodeObj = { id: '', name: this.newParentNodeName, iconName: '文件夹', isEdit: false, children: [] }
      this.treeData.push(nodeObj)
      this.addParentNodeFlag = false
    },
    addParentNodeCancel(){
      this.addParentNodeFlag = false
      this.newParentNodeName = ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    treeData:{
      handler(newVal, oldVal) {
        this.$emit('changTreeData', newVal)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-box-map{
  font-size: 15px;
  position: relative;
  .filter-structure{
    height: 28px;
  }
  .add-parent-node{
    text-align: left;
  }
  .add-parent-node-flag{
    height: 38px;
    .btn-sure{
      margin-left: 10px;
    }
    .btn-cancel{

    }
  }
  .tree-list{
    font-size: 12px;
    bottom: 0;
    top: 242px;
    left: 0;
    right: 0;
    height: calc(100% - 0px);
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
      height: 100%;
      .tree-node-botton{
        position: absolute;
        right: 0;
        margin-top: -15px;
        .el-icon-edit{
          color: #409eff;
          padding: 0px 2px;
        }
        .el-icon-delete{
          color: red;
          padding: 0px 2px;
        }
        .el-icon-upload2{
          color: #060e16;
          padding: 0px 2px;
        }
        .el-icon-download{
          color: #060e16;
          padding: 0px 2px;
        }
        .el-icon-plus{
          color: #060e16;
          padding: 0px 2px;
        }
      }
    }
  }
}
</style>
