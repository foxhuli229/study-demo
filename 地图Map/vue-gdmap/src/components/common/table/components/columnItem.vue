<template>
  <el-table-column
    :label="item.label"
    :prop="item.prop"
    :show-overflow-tooltip="item.showTooltip"
    :formatter="item.formatter"
    :width="item.width"
    :align="item.align ? item.align : 'center'"
  >
    <template v-if="item.children && item.children.length > 0">
      <columnItem
        v-for="(subItem,index) in item.children"
        :key="index"
        :item="subItem" 
      />
    </template>
    <template v-if="!item.children && $scopedSlots[item.prop]()" #default="scope">
      <slot :name="item.prop" :scope="scope" />
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'columnItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
