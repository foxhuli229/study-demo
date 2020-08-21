<template>
  <div class="event-main-line">
    <div class="title-box">
      <a class="popup-name">事件主线</a>
      <a href="#" class="closer" @click="closer" />
    </div>
    <div class="export-box">
      <el-button type="primary" size="mini" @click="handleAddNode">
        新增主线节点
      </el-button>

      <el-button size="mini" class="export-btn" @click="handleExport">
        导出
      </el-button>
    </div>
    <!-- 事件主线列表 -->
    <el-scrollbar ref="event-line-box" :noresize="true" class="event-main-line-box">
      <div v-for="(item, index) in mainLineArray" :key="item.id" class="event-main-line-item-box">
        <!-- 左侧直线 -->
        <div class="line-box">
          <i v-if="index === 0" class="el-icon-location event-start-icon" />
          <span v-else class="event-node-mark" />
          <div class="line" />
          <span v-if="index === mainLineArray.length - 1" class="event-node-mark" />
        </div>
        <!-- 右侧内容 -->
        <div class="content-box">
          <!-- 日期与标题 -->
          <div class="date-box">
            <span class="date">{{ formatDate(item.occurTime) }}</span>
            <span>{{ item.typeName }}</span>
          </div>
          <!-- 内容 -->
          <div ref="event-content" class="mission-content-box">
            {{ item.contentShow }}
            <!-- 控制内容展开与收起 -->
            <span v-if="item.spreadAble" class="spread" @click="handleSpreadContent(index)">{{ item.isSpread ? '收起全文' : '展开全文' }}
            </span>
          </div>

          <!-- 操作按钮 -->
          <div class="operation-box">
            <span class="missio-type">{{ item.taskType ? item.taskType : '' }}</span>

            <span class="view" @click="handleView(item)">{{ formatOperation(item.type) }}</span>
          </div>

        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'EventMainLine',
  props: {
    mainLineArray: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  created() {
    if (this.mainLineArray.length > 0) {
      this.formatMainLineArray(this.mainLineArray)
    }
  },
  methods: {
    formatDate(date) {
      return moment(Number(date)).format('YYYY-MM-DD HH:mm:ss')
    },
    formatOperation(type) {
      switch (type) {
        case '00':
          return '查看警情'
        case '01':
          return '查看事件'
        case '02':
          return '查看预案'
        case '03':
          return '查看组织体系'
        case '04':
          return ''
        case '05':
          return '查看续报信息'
        case '06':
        case '07':
        case '08':
          return '查看任务详情'
        case '09':
        case '10':
          return '查看消息详情'
        case '11':
          return ''
        case '12':
          return ''
        case '14':
        case '16':
          return '查看事件'
        case '15':
          return '查看预警'
        case '13': // 自定义事件
        default:
          return ''
      }
    },
    formatMainLineArray(data) {
      data.forEach(item => {
        if (!item.roleName) {
          item.roleName = ''
        }
        if (!item.subject) {
          item.subject = ''
        }
        if (!item.nodeDesc) {
          item.nodeDesc = ''
        }
        item.content = `${item.roleName}${item.subject}${item.nodeDesc}`
        // 内容长度超过60，显示“展开全文”按钮
        // 内容长度超过60，显示“展开全文”按钮
        if (item.content.length <= 60) {
          item.spreadAble = false
          item.contentShow = item.content
        } else {
          item.spreadAble = true
          item.isSpread = false
          item.contentShow = item.content.substring(0, 60)
        }
      })
      this.mainLineArray = data
    },
    handleSpreadContent(index) {
      const eventItem = this.mainLineArray[index]
      if (eventItem.isSpread) {
        // 已展开，点击按钮，收起全文
        eventItem.contentShow = eventItem.content.substring(0, 60)
      } else {
        // 收起状态，点击按钮，展开全文
        eventItem.contentShow = eventItem.content
      }
      eventItem.isSpread = !eventItem.isSpread
      this.$set(this.mainLineArray, index, this.mainLineArray[index])
    },
    closer() {
      // 关闭
      this.$emit('closer')
    },
    handleAddNode() {
      this.$emit('addNode')
    },
    handleExport() {
      this.$emit('export')
    },
    handleView(eventNode) {
      this.$emit('view-dialog', eventNode)
    }
  }
}
</script>

<style lang="scss" scoped>
.event-main-line{
  width: 100%;
  background-color: #ffffff;
  .title-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
    box-sizing: border-box;
    padding: 15px 10px 15px 15px;
    background-color: #3393ff;
    .popup-name{
      font-size: 14px;
      text-align: center;
      white-space:nowrap;     //强制不换行
      overflow:hidden;           //自动隐藏文字
      text-overflow: ellipsis;    //文字隐藏后添加省略号
      -o-text-overflow:ellipsis; //适用于opera浏览器
      max-width: 220px;
    }
    .closer {
      text-decoration: none;
      position: absolute;
      top: 15px;
      right: 10px;
    }
    .closer:after {
      content: "✖";
      font-weight: normal;
      font-size: 12px;
    }
  }
  .export-box {
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    .export-btn {
      color: #1399f8;
      width: 90px;
    }
  }
  .event-main-line-box {
    width: 100%;

    .event-main-line-item-box {
      width: 96%;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding-left: 20px;

      .line-box {
        width: 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #3393ff;

        .event-start-icon {
          width: 100%;
          height: 18px;
          text-align: center;
        }

        .event-node-mark {
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: #3393ff;
          border-radius: 50%;
        }

        .line {
          width: 2px;
          height: 100%;
          min-height: 140px;
          background: rgba(234, 234, 234, 1);
        }
      }

      .content-box {
        width: 90%;
        font-size: 12px;

        .date-box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 12px 8px;
          box-sizing: border-box;
          background-color: #e0eaf5;
          color: #505050;

          .date {
            font-weight: bold;
          }
        }

        .mission-content-box {
          width: 100%;
          box-sizing: border-box;
          padding: 16px;
          border: 1px solid #efefef;
          color: #555555;

          .spread {
            color: #1399f8;
            font-size: 12px;

            &:hover {
              cursor: pointer;
            }
          }
        }

        .operation-box {
          width: 100%;
          margin-top: 10px;
          margin-bottom: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .missio-type {
            color: #989da3;
          }

          .view {
            color: #3393ff;
            border-bottom: 1px solid #3393ff;
            padding: 0;

            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
