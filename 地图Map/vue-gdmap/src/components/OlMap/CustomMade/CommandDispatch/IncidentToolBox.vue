<template>
  <div class="popup-all-dragx">
    <div class="title-dragx drag-box">
      <a class="popup-name-dragx" :style="{color:titleName.color}">{{ titleName.name }}</a>
    </div>
    <div class="event-info-box">
      <div class="event-name-address-box">
        <div class="event-name">
          {{ titleName.eventName }}
        </div>
        <div class="address">地址:{{ titleName.address }}</div>
      </div>
      <span v-show="!(titleName.id === 3)" class="event-status-change" @click="operateStatusClick">
        <img :src="icon">

        <div class="event-status-change-text">
          {{ formatOperateText() }}
        </div>
      </span>
    </div>
    <div class="event-operate-box">
      <div class="event-main-operate">
        <template v-for="(item, index) in incidentBottom">
          <div v-if="item.show" :key="index" class="operate-item-bottom" @click="handleIncidentBottom(item)">
            <div class="item-bottom">{{ item.name }}</div>
          </div>
        </template>
      </div>
    </div>
    <div class="event-operate-box">
      <div class="event-other-operate">
        <div v-if="status == 1 || status == 3" class="item item-white" @click="handleEventMainLine">
          事件主线
        </div>
        <div v-else class="item">
          <div class="operate-white">
            <el-row :gutter="10" class="event-main-operate-item-row">
              <el-col :span="8">
                <div class="event-main-operate-item" @click="handleTaskList">
                  任务列表
                </div>
              </el-col>
              <el-col :span="8">
                <div class="event-main-operate-item" @click="handleContinueReport">
                  事件续报
                </div>
              </el-col>
              <el-col :span="8">
                <div class="event-main-operate-item" @click="handleEventMainLine">
                  事件主线
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IncidentToolBox',
  props: {
    statusData: { // 状态
      type: Array,
      default: () => {
        return [
          { id: 1, name: '待响应', color: '#FF0000', flag: false },
          { id: 2, name: '响应中...', color: '#3ed4ff', flag: false },
          { id: 3, name: '已响应', color: '#52C41A', flag: false }
        ]
      }
    },
    incidentBottom: { // 按钮
      type: Array,
      default: () => {
        return [
          { id: 1, name: '事件详情', show: true },
          { id: 2, name: '风险范围分析', show: true },
          { id: 3, name: '风险分析报告', show: true },
          { id: 4, name: '关联预案', show: true },
          { id: 5, name: '应急监测方案', show: true },
          { id: 6, name: '应急处置方案', show: true }
        ]
      }
    }
  },
  data() {
    return {
      icon: '',
      status: 1, // 图标状态
      start: require('@/components/OlMap/images/command-dispatch/event-start.png'),
      end: require('@/components/OlMap/images/command-dispatch/event-end.png')
    }
  },
  computed: {
    titleName() {
      const findVal = this.statusData.find(item => {
        return item.flag === true
      })
      return findVal
    }
  },
  watch: {
    titleName(val) {
      this.status = val.id
      this.formatOperateText()
    }
  },
  mounted() {
    this.status = this.titleName.id
    this.formatOperateText()
  },
  methods: {
    formatOperateText() {
      const type = this.status
      switch (type) {
        case 1:
          this.icon = this.start
          return '开始响应'
        case 2:
          this.icon = this.end
          return '结束响应'
        default:
          return ''
      }
    },
    changeStatusData(id) {
      this.statusData.forEach((item) => {
        item.flag = false
        if (item.id === id) {
          item.flag = true
        }
      })
    },
    operateStatusClick() {
      if (this.status === 1) { // 开始响应
        this.status = 2
        this.changeStatusData(2)
      } else if (this.status === 2) { // 结束响应
        this.status = 1
        this.changeStatusData(3)
      }
    },
    handleIncidentBottom(item) {
      this.$emit('incident-bottom', item)
    },
    handleTaskList() { // 任务列表
      this.$emit('task-list')
    },
    handleContinueReport() { // 事件续报
      this.$emit('continue-report')
    },
    handleEventMainLine() { // 事件主线
      this.$emit('event-main-line')
    },
    closer() { // 关闭
      this.$emit('closer')
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-all-dragx{
  .title-dragx{
    width: calc(100%);
    line-height: 30px;
    height: 38px;
    padding: 5px;
    border-bottom: 1px solid #dddddd;
    font-size: 14px;
    color: white;
    display: inline-flex;
    background-image: linear-gradient(to right, rgba(64, 158, 255, 0.77), $theme-color);
    .popup-name-dragx{
      font-size: 12px;
      width: 60px;
      background-color: white;
      text-align: center;
      white-space:nowrap;     //强制不换行
      overflow:hidden;           //自动隐藏文字
      text-overflow: ellipsis;    //文字隐藏后添加省略号
      -o-text-overflow:ellipsis; //适用于opera浏览器
      max-width: 220px;
    }
  }
  .event-info-box {
    width: calc(100%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 20px 20px;
    background-color: #3393ff;
    color: #ffffff;
    .event-name-address-box {
      width: calc(70%);
      .event-name {
        font-size: 18px;
        word-break: break-all;
      }

      .address {
        font-size: 12px;
        margin-top: 18px;
      }
    }
    .event-status-change {
      text-align: center;
      &:hover {
        cursor: pointer;
      }
      .event-status-change-text {
        font-size: 12px;
        color: #ffffff;
        margin-top: 4px;
      }
    }
  }
  .event-operate-box {
    width: calc(100%);
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    .event-main-operate{
      width: calc(100%);
      padding: 10px 10px 10px 10px;
      background-color: #ffffff;
      border-bottom: 1px solid #e9ecf2;
      .operate-item-bottom{
        float: left;
        width: calc(100%/3 - 10px);
        margin: 5px;
        .item-bottom{
          color:  #3393ff;
          font-size: 12px;
          text-align: center;
          padding: 8px 5px;
          box-sizing: border-box;
          background-color: #f2f2f2;
        }
      }
    }
    .event-other-operate {
      width: calc(100%);
      padding: 20px;
      background-color: #ffffff;
      .item {
        width: calc(100%);
        text-align: center;
        padding: 10px 0;
        font-size: 14px;
        border-radius: 4px;

        &:hover {
          cursor: pointer;
        }
      }

      .item-blue {
        color: #ffffff;
        background-color: #3393ff;
      }

      .item-white {
        color: #3393ff;
        background-color: #ffffff;
        border: 1px solid #ccdbe9;
      }
      .operate-white{
        width: calc(100%);
        box-sizing: border-box;
        background-color: #ffffff;
        border-bottom: 1px solid #e9ecf2;

        .event-main-operate-item-row {
          .event-main-operate-item {
            width: calc(100%);
            color:  #3393ff;
            font-size: 12px;
            text-align: center;
            padding: 8px 0;
            box-sizing: border-box;
            border: 1px solid #ccdbe9;
            b
            &:hover {
              cursor: pointer;
            }
          }
        }

        .event-main-operate-item-row + .event-main-operate-item-row {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
