<template>
  <div class="ol-map">
    <!--引入指挥调度地图-->
    <command-dispatch
      ref="dispatchChild"
      :tree-data="treeData"
      :adminis-options="adminisOptions"
      :key-area-options="keyAreaOptions"
      :left-list-data="leftListData"
      @singleClick="handlerSingleClick"
      @searchMethod="handlerSearchMethod"
    >
      <template v-if="!singlePopupFalg" #DispatchPopup>
        <div style="width: 450px;height: 300px;">填充内容 填充自己的业务组件</div>
      </template>
      <template v-else #popupName>
        <div />
      </template>
      <!-- 事件主线-->
      <template v-if="rightBoxShow" #rightBoxAll>
        <EventMainLine
          :main-line-array="mainLineArray"
          @closer="handleEventMainLineCloser"
          @addNode="handleEventMainLineAddNode"
          @export="handleEventMainLineExport"
          @view-dialog="handleEventMainLineViewDialog"
        />
      </template>
      <!--移动的弹窗-->
      <template v-if="searchToolShow" #movePopup>
        <move-popup v-if="eventTaskListShow" :popup-property="popupProperty" @handleBindUpdate="handleBindUpdate">
          <template #popupAll>
            <!--任务列表-->
            <event-task-list
              :administer="administer"
              :tab-array="tabArray"
              :task-total="taskArray.length"
              :query-param="queryParam"
              @back="handleTaskListBack"
              @orgSet="handleTaskListOrgSet"
              @person="handleTaskListPerson"
              @material="handleTaskListMaterial"
              @monitor="handleTaskListMonitor"
              @tabClick="handleTaskListTab"
            >
              <template v-if="queryParam.state === '1' || queryParam.state === '2'" #taskList>
                <TaskUnissueItem
                  v-for="item in taskArray"
                  :key="item.id"
                  :mission="item"
                  @issue="handleTaskIssue"
                  @edit="handleTaskEdit"
                  @delete="handleTaskDelete"
                  @inventory="handleInventory"
                />
              </template>
              <template v-else #taskList>
                <TaskExecutItem
                  v-for="item in taskArray"
                  :key="item.id"
                  :mission="item"
                  @inventory="handleInventory"
                  @detailTask="handleDetailTask"
                >
                  <!-- 详情填充详情组件-->
                  <template v-if="detailTaskShow & expand === item.id" #detailTask>
                    <task-execut-detail></task-execut-detail>
                  </template>
                </TaskExecutItem>
              </template>
            </event-task-list>
          </template>
        </move-popup>
        <move-popup v-else :popup-property="popupProperty" @handleBindUpdate="handleBindUpdate" @closer-popup="handleIncidentToolBoxCloser">
          <template #popupAll>
            <!--事件-->
            <IncidentToolBox
              :status-data="statusData"
              :incident-bottom="incidentBottom"
              @incident-bottom="handleIncidentBottom"
              @task-list="handleTaskList"
              @continue-report="handleContinueReport"
              @event-main-line="handleEventMainLine"
            />
          </template>
        </move-popup>
      </template>
    </command-dispatch>

  </div>
</template>

<script>
export default {
  components: {
    CommandDispatch: () => import('@/components/OlMap/CustomMade/CommandDispatch'),
    MovePopup: () => import('@/components/OlMap/Popup/MovePopup'),
    IncidentToolBox: () => import('@/components/OlMap/CustomMade/CommandDispatch/IncidentToolBox'),
    EventMainLine: () => import('@/components/OlMap/CustomMade/CommandDispatch/EventMainLine'),
    EventTaskList: () => import('@/components/OlMap/CustomMade/TaskList/EventTaskList'),
    TaskUnissueItem: () => import('@/components/OlMap/CustomMade/TaskList/TaskUnissueItem'),
    TaskExecutItem: () => import('@/components/OlMap/CustomMade/TaskList/TaskExecutItem'),
    TaskExecutDetail: () => import('@/components/OlMap/CustomMade/TaskList/TaskExecutDetail')
  },
  data() {
    return {
      singlePopupFalg: false, // 简单弹窗 还是复杂弹窗
      searchToolShow: false, // 显示待响应，响应中，已响应
      eventTaskListShow: false, // 任务列表
      detailTaskShow: false, // 执行任务展开收起
      expand: '',
      popupProperty: {
        show: true,
        title: '',
        dragBarClass: 'drag-box',
        left: 10,
        top: 60,
        right: 0,
        bottom: 0,
        width: 350,
        height: 0
      },
      statusData: [
        { id: 1, name: '待响应', color: '#FF0000', flag: true, eventId: '1111', eventName: 'xxx事件', address: '11111地址' },
        { id: 2, name: '响应中', color: '#ffb826', flag: false, eventId: '222', eventName: 'xxx事件', address: '11111地址' },
        { id: 3, name: '已响应', color: '#52C41A', flag: false, eventId: '333', eventName: 'xxx事件', address: '11111地址' }
      ],
      incidentBottom: [
        { id: 1, name: '事件详情', show: true },
        { id: 2, name: '风险范围分析', show: true },
        { id: 3, name: '风险分析报告', show: true },
        { id: 4, name: '关联预案', show: true },
        { id: 5, name: '应急监测方案', show: true },
        { id: 6, name: '应急处置方案', show: true }
      ],
      rightBoxShow: false, // 事件主线
      tabArray: [
        { id: '1', name: '未下发', show: true },
        { id: '2', name: '未开始', show: true },
        { id: '3', name: '执行中', show: true },
        { id: '4', name: '已执行', show: true }
      ],
      taskTotal: 100,
      // 查询任务列表的查询条件
      queryParam: {
        current: 1,
        size: 10,
        state: '1',
        stateName: '未下发'
      },
      administer: 'administer', // administer 管理者 execute 执行者
      taskArray: [],

      // 行政区域
      adminisOptions: [{
        id: '1',
        name: '创业园区1'
      }, {
        id: '2',
        name: '创业园区2'
      }],
      // key area  重点区域
      keyAreaOptions: [{
        id: '1',
        name: '重点区域01'
      }, {
        id: '2',
        name: '重点区域02'
      }],
      // 专题图层tree
      treeData: [{
        id: '1',
        name: '应急事件',
        iconName: '文件夹',
        children: [
          {
            id: '11',
            name: '待响应',
            iconName: '待响应',
            children: []
          },
          {
            id: '12',
            name: '响应中',
            iconName: '响应中',
            children: []
          },
          {
            id: '13',
            name: '已响应',
            iconName: '已响应',
            children: []
          }
        ]
      }, {
        id: '2',
        name: '警情记录',
        iconName: '文件夹',
        children: [
          {
            id: '21',
            name: '待处理',
            iconName: '待处理',
            children: []
          },
          {
            id: '22',
            name: '已上报',
            iconName: '已上报',
            children: []
          },
          {
            id: '23',
            name: '已解除警报',
            iconName: '已解除警报',
            children: []
          }
        ]
      }, {
        id: '3',
        name: '风险源企业',
        iconName: '文件夹',
        children: [
          {
            id: '31',
            name: '一般风险源企业',
            iconName: '一般风险源企业',
            children: []
          },
          {
            id: '32',
            name: '较大风险源企业',
            iconName: '较大风险源企业',
            children: []
          },
          {
            id: '33',
            name: '重大风险源企业',
            iconName: '重大风险源企业',
            children: []
          }
        ]
      }, {
        id: '4',
        name: '监测站',
        iconName: '文件夹',
        children: [
          {
            id: '41',
            name: '空气监测站',
            iconName: '水质监测站',
            children: []
          },
          {
            id: '42',
            name: '水质监测站',
            iconName: '较大风险源企业',
            children: []
          }
        ]
      }, {
        id: '5',
        name: '应急物资',
        iconName: '文件夹',
        children: [
          {
            id: '51',
            name: '重点区域应急物资',
            iconName: '重点区域应急物资',
            children: []
          },
          {
            id: '52',
            name: '企业应急物资',
            iconName: '企业应急物资',
            children: []
          }
        ]
      }, {
        id: '6',
        name: '环境敏感点',
        iconName: '文件夹',
        children: [{
          id: '61',
          name: '生态保护区',
          iconName: '生态保护区',
          children: []
        },
        {
          id: '62',
          name: '文化教育',
          iconName: '文化教育',
          children: []
        },
        {
          id: '63',
          name: '居民生活',
          iconName: '居民生活',
          children: []
        },
        {
          id: '64',
          name: '医疗卫生',
          iconName: '医疗卫生',
          children: []
        },
        {
          id: '65',
          name: '机关单位',
          iconName: '机关单位',
          children: []
        }]
      }
      ],
      listBox: [],
      leftListData: [],
      mainLineArray: [
        {
          childType: null,
          createTime: 1584590687195,
          eventId: 'd4258f5a380f49bba16e5ef5dd7fe630',
          foreignId: '2f51ab5322827f9827d2121916500be4',
          id: '98d6044d30b863d75d879a4ef67bd0d5',
          nodeDesc: '核实警情并上报',
          occurTime: 1584590687194,
          roleName: null,
          subject: '管理员',
          taskType: null,
          type: '01',
          typeName: '值守接警'
        },
        {
          childType: null,
          createTime: 1584590687188,
          eventId: 'd4258f5a380f49bba16e5ef5dd7fe630',
          foreignId: '2f51ab5322827f9827d2121916500be4',
          id: '57bfb2d4f5d5f3286ab33676da237b89',
          nodeDesc: '上报警情管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报管理员核实警情并上报',
          occurTime: 1584590540554,
          roleName: null,
          subject: '管理员',
          taskType: null,
          type: '00',
          typeName: '警情上报'
        }
      ]
    }
  },
  computed: {
    olmap() {
      return this.$store.state.olmap.olmap
    },
    leftTreeKeys() { // Tree选中的数据id
      return this.$store.state.olmap.leftDefaultKeys
    }
  },
  watch: {
    leftTreeKeys: {
      handler(newVal, oldVal) {
        // 选中改变，拿到查询参数去查询数据结果
        // 1 代表查询应急事件
        if (newVal.keysData.length > 0) {
          console.log('选中改变，拿到查询参数去查询数据结果')
          console.log(newVal)
          setTimeout(() => {
            this.leftListData = [
              { id: Math.random(), name: '应急事件-待响应', pointType: '1', longitude: 101.493529, latitude: 26.666813, value: '11' },
              { id: Math.random(), name: '应急事件-响应中', pointType: '1', longitude: 101.520651, latitude: 26.648118, value: '12' },
              { id: Math.random(), name: '应急事件-已响应', pointType: '1', longitude: 101.547430, latitude: 26.648118, value: '13' },
              { id: Math.random(), name: '01', pointType: '2', longitude: 101.547630, latitude: 26.668118, value: '21' }
            ]
          }, 300)
        } else {
          this.leftListData = []
        }
      },
      deep: true
    },
    eventTaskListShow(val) {
      if (val) {
        // this.handleTaskListTab(this.queryParam)
      }
    }
  },
  mounted() {
    // 默认选中左侧tree
    const keys = ['11', '12', '13']
    this.$store.dispatch('olmap/changeLeftDefaultKeys', { keys: keys, keysData: [] })
  },
  methods: {
    handleBindUpdate(data) {
      this.popupProperty.height = data.height
    },
    handlerSingleClick(data) {
      this.singlePopupFalg = false
      this.searchToolShow = false
      // 拿到数据，查询并填充自己的组件
      console.log('拿到数据，查询并填充自己的组件')
      console.log(data)
      // 这里需要特殊处理是应急事件（待响应，响应中，已响应）的数据，解决页面变化和改变，调用对应的 组件
      // 事件不弹窗，特殊处理
      if (data.pointType === '1') {
        this.singlePopupFalg = true // 启用简单弹窗
        this.searchToolShow = true
        // console.log(data.state)
        const state = data.state
        this.statusData.forEach(item => {
          item.flag = false
          if (item.name === state.name) {
            item.flag = true
          }
        })
      } else {
        this.singlePopupFalg = true // 启用简单弹窗
      }
    },
    handlerSearchMethod(obj) {
      // 搜索的查询参数
      console.log('搜索的查询参数' + obj)
      this.listBox = [
        { id: Math.random(), name: '重点污染源企业', pointType: '1', longitude: 101.493529, latitude: 26.666813, value: 1 },
        { id: Math.random(), name: '一般污染源企业', pointType: '2', longitude: 101.520651, latitude: 26.648118, value: 1 },
        { id: Math.random(), name: '空气微站', pointType: '3', longitude: 101.547430, latitude: 26.648118, value: 1 },
        { id: Math.random(), name: '生态保护区', pointType: '4', longitude: 101.547430, latitude: 26.614317, value: 1 },
        { id: Math.random(), name: '文化教育', pointType: '5', longitude: 101.633261, latitude: 26.624804, value: 1 },
        { id: Math.random(), name: '居民生活', pointType: '6', longitude: 101.643904, latitude: 26.601989, value: 1 },
        { id: Math.random(), name: '医疗卫生', pointType: '7', longitude: 101.630858, latitude: 26.577801, value: 1 },
        { id: Math.random(), name: '机关单位', pointType: '8', longitude: 101.532668, latitude: 26.607858, value: 1 }
      ]
      this.$store.dispatch('olmap/changeSideBarViewData', { data: { 'list-box-image': this.listBox }, total: 8 })
    },
    handleIncidentBottom(item) {
      // 根据值来判定是点击的那个按钮
      const type = item.id
      switch (type) {
        case 1:
          console.log('事件详情')
          break
        case 2:
          console.log('风险范围分析')
          break
        case 3:
          console.log('风险分析报告')
          break
        case 4:
          console.log('关联预案')
          break
        case 5:
          console.log('应急监测方案')
          break
        case 6:
          console.log('应急处置方案')
          break
      }
    },
    handleTaskList() {
      console.log('任务列表')
      this.eventTaskListShow = !this.eventTaskListShow
    },
    handleContinueReport() {
      console.log('事件续报')
    },
    handleEventMainLine() {
      console.log('事件主线')
      this.rightBoxShow = !this.rightBoxShow
    },
    handleIncidentToolBoxCloser() {
      debugger
      this.searchToolShow = false
    },
    handleEventMainLineAddNode() {
      console.log('添加节点')
    },
    handleEventMainLineExport() {
      console.log('事件导出')
    },
    handleEventMainLineViewDialog(data) {
      console.log('查看详细信息')
    },
    handleEventMainLineCloser() {
      this.rightBoxShow = false
    },
    handleTaskListBack() {
      this.eventTaskListShow = !this.eventTaskListShow
    },
    handleTaskListOrgSet() {
      console.log('组织体系设置')
    },
    handleTaskListPerson() {
      console.log(' 人员调度任务')
    },
    handleTaskListMaterial() {
      console.log(' 物资调度任务')
    },
    handleTaskListMonitor() {
      console.log(' 应急监测任务')
    },
    handleTaskListTab(query) {
      console.log('获取任务列表')
      switch (query.state) {
        case '1':
          this.taskArray = [
            {
              id: 1,
              taskType: '01', // 任务类型
              taskLevel: '01', // 等级
              userName: '张顺吉',
              destination: '环境监测站应急物资库运送物资克士联发',
              taskDesc: '科施蒂利克当技法拉萨点击风机房',
              limitTime: '1587957720000',
              state: '1'
            },
            {
              id: 2,
              taskType: '02', // 任务类型
              taskLevel: '02', // 等级
              userName: '1',
              destination: '222',
              taskDesc: '3333',
              limitTime: '1587957720000',
              state: '1'
            },
            {
              id: 3,
              taskType: '03', // 任务类型
              taskLevel: '04', // 等级
              userName: '1',
              destination: '222',
              taskDesc: '3333',
              limitTime: '1587957720000',
              state: '1'
            },
            {
              id: 4,
              taskType: '03', // 任务类型
              taskLevel: '03', // 等级
              userName: '1',
              destination: '222',
              taskDesc: '3333',
              limitTime: '1587957720000',
              state: '1'
            }
          ]
          break
        case '2':
          this.taskArray = [
            {
              id: 1,
              taskType: '01', // 任务类型
              taskLevel: '01', // 等级
              userName: '张顺吉',
              destination: '环境监测站应急物资库运送物资克士联发',
              taskDesc: '科施蒂利克当技法拉萨点击风机房',
              limitTime: '1587957720000',
              state: '2'
            },
            {
              id: 2,
              taskType: '02', // 任务类型
              taskLevel: '02', // 等级
              userName: '1',
              destination: '222',
              taskDesc: '3333',
              limitTime: '1587957720000',
              state: '2'
            }
          ]
          break
        case '3':
          this.taskArray = [
            {
              id: 1,
              taskType: '01', // 任务类型
              taskLevel: '01', // 等级
              userName: '张顺吉',
              destination: '环境监测站应急物资库运送物资克士联发',
              taskDesc: '科施蒂利克当技法拉萨点击风机房',
              limitTime: '1587957720000',
              state: '3'
            },
            {
              id: 4,
              taskType: '03', // 任务类型
              taskLevel: '03', // 等级
              userName: '1',
              destination: '222',
              taskDesc: '3333',
              limitTime: '1587957720000',
              state: '3'
            }
          ]
          break
        case '4':
          this.taskArray = [
            {
              id: 4,
              taskType: '03', // 任务类型
              taskLevel: '03', // 等级
              userName: '1',
              destination: '222',
              taskDesc: '3333',
              limitTime: '1587957720000',
              state: '4'
            }
          ]
          break
      }
    },
    handleTaskIssue(data) {
      console.log('下发任务')
    },
    handleTaskEdit(data) {
      console.log('编辑任务')
    },
    handleTaskDelete(data) {
      console.log('删除任务')
    },
    handleInventory(data) {
      console.log('物资清单')
    },
    handleDetailTask(data, falg) {
      this.detailTaskShow = falg
      this.expand = data.id
      console.log(data, falg)
      console.log('任务详情')
    }

  }
}
</script>

<style lang="scss" scoped>
  .ol-map {
    position: relative;
    padding: 0;
    overflow: hidden;
    width: calc(100%);
    height: calc(100%);
  }
</style>
