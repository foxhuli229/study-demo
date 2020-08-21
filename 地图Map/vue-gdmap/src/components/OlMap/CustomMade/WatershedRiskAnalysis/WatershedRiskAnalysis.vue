<template>
  <ol-map ref="watershedRiskAnalysisChild" @registerSingleClickEvent="mapSingleClickEvent">
    <template #search>
      <search-tool :panel-expand="false" :mouseout-flag="false" @searchClick="handlerSearchMethod" @clear="handlerClearMethod">
        <template #listBox>
          <div v-if="$slots.EQMSearchBox" slot="EQMSearchBox">
            <slot name="EQMSearchBox" />
          </div>
        </template>
      </search-tool>
      <switch-view></switch-view>
    </template>
  </ol-map>
</template>

<script>
export default {
  name: 'WatershedRiskAnalysis',
  components: {
    OlMap: () => import('@/components/OlMap'),
    SearchTool: () => import('@/components/OlMap/SearchTool'),
    SwitchView: () => import('@/components/OlMap/ToolContainer/GoBack/SwitchView')
  },
  methods: {
    mapSingleClickEvent(data) {
      this.$emit('singleClick', data)
      // 开启Popup
      this.$store.dispatch('olmap/changePopup', { popupShow: true, popupId: data.id, popupName: data.name, datas: data })
    },
    handlerSearchMethod(queryData) {
      // 拿到查询参数对象
      this.$emit('searchMethod', queryData)
    },
    handlerClearMethod() {
      this.$store.dispatch('olmap/changeSideBarViewData', { data: { 'list-box': [] }, total: 0 })
      this.$store.dispatch('olmap/changeSideBarViewData', { data: { 'list-box-image': [] }, total: 0 })
    }
  }
}
</script>

<style scoped>

</style>
