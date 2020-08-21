<template>
  <div class="task-unissue-item">
    <div class="title-box">
      <span class="mission-type">{{ formatMissionType.name }}</span>
      <span v-if="mission.taskType === '03'" class="material-list-btn" @click="handleInventory">物资清单</span>
      <span :style="{color: formatMissionLevel.color}">{{ formatMissionLevel.name }}</span>
    </div>

    <div class="content-box">
      <div class="mission-content">{{ `${mission.userName}到${mission.destination}：${mission.taskDesc}` }}</div>

      <div class="date">{{ formatDeadline }}</div>

      <div class="operation-box">
        <span
          v-if="mission.state === '1'"
          class="issue-mission-btn"
          @click="handleIssue"
        >
          下发任务
        </span>

        <span style="float:right;">
          <!-- 编辑 -->
          <i
            class="el-icon-edit btn-edit"
            @click="handleEdit"
          />

          <!-- 删除 -->
          <i
            class="el-icon-delete-solid btn-delete"
            @click="handleDelete"
          />
        </span>
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
          state: '1'
        }
      }
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
    handleEdit() {
      this.$emit('edit', this.mission)
    },
    handleDelete() {
      this.$emit('delete', this.mission)
    },
    handleIssue() {
      this.$emit('issue', this.mission)
    },
    handleInventory() {
      this.$emit('inventory', this.mission)
    }
  }
}
</script>

<style lang="scss" scoped>
  .task-unissue-item {
    width: 100%;
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

    .content-box {
      padding: 20px 14px;

      .date {
        padding: 10px 0;
      }

      .operation-box {
        overflow: hidden;
        color: #3393ff;

        .issue-mission-btn {
          float: left;
          border-bottom: 1px solid #3393ff;

          &:hover {
            cursor: pointer;
          }
        }

        .btn-edit,
        .btn-delete {
          font-size: 14px;

          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
