<template>
  <div class="event-task-list">
    <div class="title-box drag-box">
      <span class="back" @click="handleBack">
        <i class="el-icon-arrow-left" />返回
      </span>
      <el-button v-if="administer === 'administer'" size="mini" @click="handleOrgSet">组织体系设置</el-button>
    </div>
    <div v-if="administer === 'administer'" class="mission-add-box">
      <span type="primary" size="mini" class="mission-add-btn" @click="handleTaskListPerson">
        人员调度任务
      </span>

      <span type="primary" size="mini" class="mission-add-btn" @click="handleTaskListMaterial">
        物资调度任务
      </span>

      <span type="primary" size="mini" class="mission-add-btn" @click="handleTaskListMonitor">
        应急监测任务
      </span>
    </div>
    <div class="divider" />
    <el-tabs v-model="tab" :stretch="true" style="padding:0 10px;" @tab-click="handleTab">
      <template v-for="item in tabArray">
        <el-tab-pane v-if="item.show" :key="item.id" :label="item.name" :name="item.id" />
      </template>
    </el-tabs>
    <div class="mission-list-box">
      <div v-if="$slots.taskList" slot="taskList">
        <slot name="taskList" />
      </div>
    </div>
    <el-pagination
      class="pagination-page"
      small
      :current-page.sync="queryParam.current"
      layout="total, prev, pager, next"
      :total="taskTotal"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'EventTaskList',
  props: {
    taskTotal: {
      type: Number,
      default: 0
    },
    administer: { // administer 管理者 execute 执行者
      type: String,
      default: 'administer'
    },
    queryParam: {
      type: Object,
      default: () => {
        return {
          current: 1,
          size: 10,
          state: '1',
          stateName: '未下发'
        }
      }
    },
    tabArray: {
      type: Array,
      default: () => {
        return [
          { id: '1', name: '未下发', show: true },
          { id: '2', name: '未开始', show: true },
          { id: '3', name: '执行中', show: true },
          { id: '4', name: '已执行', show: true }
        ]
      }
    }
  },
  data() {
    return {
      loading: true,
      tab: this.queryParam.state
    }
  },
  mounted() {
    if (this.administer === 'execute') {
      this.tabArray[0].show = false
      this.tab = this.tabArray[1].id
      this.queryParam.state = this.tabArray[1].id
      this.queryParam.stateName = this.tabArray[1].name
      this.$emit('tabClick', this.queryParam)
    } else {
      this.$emit('tabClick', this.queryParam)
    }
  },
  methods: {
    handleBack() {
      this.$emit('back')
    },
    handleOrgSet() {
      this.$emit('orgSet')
    },
    handleTaskListPerson() {
      this.$emit('person')
    },
    handleTaskListMaterial() {
      this.$emit('material')
    },
    handleTaskListMonitor() {
      this.$emit('monitor')
    },
    handleCurrentChange() {
      this.$emit('tabClick', this.queryParam)
    },
    handleTab(tab) {
      this.queryParam.state = tab.name
      this.queryParam.stateName = tab.label
      this.$emit('tabClick', this.queryParam)
    }
  }
}
</script>

<style lang="scss" scoped>
.event-task-list{
  width: calc(100%);
  height: calc(100%);
  background-color: white;
  position: relative;
  .title-box {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;
    font-size: 14px;
    color: #3393ff;

    .back {
      &:hover {
        cursor: pointer;
      }
    }
  }
  .mission-add-box {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 10px;
    font-size: 12px;
    color: #ffffff;

    .mission-add-btn {
      width: calc(30%);
      display: inline-block;
      text-align: center;
      box-sizing: border-box;
      padding: 8px 0;
      background-color: #1399f8;
      border-radius: 4px;

      &:hover {
        cursor: pointer;
      }
    }
  }
  .divider {
    width: calc(100%);
    height: 1px;
    background-color: #dcdfe6;
    margin: 5px 0;
  }
  .mission-list-box {
    background-color: white;
    width: calc(100%);
    padding: 0 20px;
    overflow-x: hidden;
    overflow-y: auto;
    height: 450px;
    border-bottom: 1px solid #e9e9e9;
  }
  .pagination-page{
    background-color: white;
    position: relative;
    display: flex;
    left: 0;
    bottom: 0;
    width: calc(100%);
    margin-bottom: 0px;
  }
}
</style>
