<template>
  <div class="task-executing-item">

    <!-- 标题 -->
    <div class="title-box">
      <span class="mission-type">{{ formatMissionType.name }}</span>
      <span v-if="mission.taskType === '03'" class="material-list-btn" @click="handleInventory">物资清单</span>
      <span :style="{color: formatMissionLevel.color}">{{ formatMissionLevel.name }}</span>
    </div>

    <div class="mission-content">{{ `${mission.userName}到${mission.destination}：${mission.taskDesc}` }}</div>

    <div class="date">{{ formatDeadline }}</div>

    <!-- 详情按钮 -->
    <div class="operation-box" @click="handleDetailTask">
      <span class="mission-detail-btn">详情</span>
    </div>

    <div class="divider" />

    <div v-if="isFold" class="detail-box">
      <div v-if="$slots.detailTask" slot="detailTask">
        <slot name="detailTask" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    taskArray: { // 任务类型
      type: Array,
      default: () => {
        return [
          { code: '01', name: '应急监测任务' },
          { code: '02', name: '人员调度任务' },
          { code: '03', name: '物资调度任务' }
        ]
      }
    },
    taskLevel: { // 等级
      type: Array,
      default: () => {
        return [
          { code: '01', name: 'Ⅰ级', color: '#E75959' },
          { code: '02', name: 'Ⅱ级', color: '#FF8400' },
          { code: '03', name: 'Ⅲ级', color: '#3393FF' },
          { code: '04', name: 'Ⅳ级', color: '#00BE12' }
        ]
      }
    },
    mission: {
      type: Object,
      // required: true
      default: () => {
        return {
          id: 1,
          taskType: '01', // 任务类型
          taskLevel: '01', // 等级
          userName: '张顺吉',
          destination: '环境监测站应急物资库运送物资克士联发',
          taskDesc: '科施蒂利克当技法拉萨点击风机房',
          limitTime: '1587957720000',
          state: '3' // 3/4
        }
      }
    }
  },
  data() {
    return {
      isFold: false // 是否展开
    }
  },
  computed: {
    formatMissionType() {
      const result = this.taskArray.find(item => {
        return item.code === this.mission.taskType
      })
      return result
    },
    formatMissionLevel() {
      const result = this.taskLevel.find(item => {
        return item.code === this.mission.taskLevel
      })

      return result
    },
    formatDeadline() {
      if (Number(this.mission.limitTime) === 0) {
        return ''
      }
      const time = moment(Number(this.mission.limitTime)).format('YYYY-MM-DD HH:mm')
      return time
    }
  },
  mounted() {
    // console.log(moment('2020-04-27 11:22').valueOf())
  },
  methods: {
    handleInventory() {
      this.$emit('inventory', this.mission)
    },
    handleDetailTask() {
      this.isFold = !this.isFold
      this.$emit('detailTask', this.mission, this.isFold)
    }
  }
}
</script>

<style lang="scss" scoped>
  .task-executing-item{
    width: calc(100%);
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid rgba(240, 240, 240, 1);
    font-size: 12px;
    margin-bottom: 10px;

    .title-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 12px;
      background-color: #f0f0f0;

      .mission-type {
        font-weight: bold;
      }

      .material-list-btn {
        margin-left: 4px;
        color: #3393ff;
        border-bottom: 1px solid #3393ff;

        &:hover {
          cursor: pointer;
        }
      }
    }

    .mission-content {
      padding: 20px 14px 10px 14px;
      box-sizing: border-box;
    }

    .date {
      padding: 0 14px;
    }

    .operation-box {
      display: inline-flex;
      align-items: center;
      padding: 20px 14px;
      box-sizing: border-box;
      color: #3393ff;

      &:hover {
        cursor: pointer;
      }

      .mission-detail-btn {
        border-bottom: 1px solid #3393ff;
      }

      .btn-unfold {
        font-size: 14px;
        transform: rotate(-90deg);
        transition: 0.5s;
      }

      .btn-fold {
        font-size: 14px;
        transform: rotate(90deg);
      }
    }

    .divider {
      width: 100%;
      height: 1px;
      background-color: #f4f0e9;
    }

    .detail-box{
      width: calc(100%);
      box-sizing: border-box;
      padding: 14px;
      overflow-y: auto;
    }
  }
</style>
