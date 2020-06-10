<template>
  <div class="list-box-items">
    <!-- items['list-box'] 包含序号的-->
    <div v-if="items['list-box'] && items['list-box']!== undefined && items['list-box'].length !==0" class="list-box">
      <ul v-for="(item,index) in items['list-box']" :key="index" class="ul">
        <li :title="item.name" @click="clickEvent(item,index+1)" @mouseover="mouseoverEvent(item,index+1)" @mouseout="mouseoutEvent(item,index+1)">
          <div class="div-na">
            <div class="index-num">{{ index+1 }}</div>
            <div class="maker-name">{{ item.name }}</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- items['list-box-image'] 包含图像的-->
    <div v-else-if="items['list-box-image'] && items['list-box-image']!== undefined && items['list-box-image'].length !==0" class="list-box">
      <a  href="javascript:;" class="list-box-closer" @click="listBoxCloser" />
      <ul v-for="(item,index) in items['list-box-image']" :key="index" class="ul">
        <li :title="item.name" @click="clickEvent(item,index+1)">
          <div class="div-na">
            <div class="index-image" :style="{'background-image': getImgaeUrl(item).backUrl}" />
            <div class="maker-name">{{ item.name }}</div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="list-box">
      <a  href="javascript:;" class="list-box-closer" @click="listBoxCloser" />
      <div class="box-tip">暂无数据...</div>
    </div>
    <div class="page-pagination">
      <div class="left">
        共 {{ sideBarView.total }}条
      </div>
      <div class="right">
        <div class="page">
          <el-pagination
            small
            layout="prev, pager, next"
            :current-page="queryData.currentPage"
            :pager-count="5"
            :page-size="queryData.pageSize"
            :total="sideBarView.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Emitter from '@/components/OlMap/util/minxins/emitter'
import Images from '@/components/OlMap/util/minxins/images'
export default {
  name: 'SearchListBox',
  mixins: [Emitter, Images],
  data() {
    return {
      clickFlag: false,
      markerArray: [],
      items: []
    }
  },
  computed: {
    sideBarView() {
      return this.$store.state.olmap.sideBarView
    },
    queryData() {
      return this.$store.state.olmap.queryData
    },
    olmap() {
      return this.$store.state.olmap.olmap
    }
  },
  mounted() {
    this.items = this.sideBarView.data
    const boxDataImage = this.items['list-box-image']
    if (boxDataImage !== undefined) {
      this.addMarker(boxDataImage)
    }
    // 清空
    this.$on('clear', this.clear)
  },
  methods: {
    // 每页显示数据量变更
    handleSizeChange(val) {
      this.queryData.pageSize = val
      this.$store.dispatch('olmap/changeQueryData', this.queryData)
    },
    // 页码变更
    handleCurrentChange(val) {
      this.queryData.currentPage = val
      this.$store.dispatch('olmap/changeQueryData', this.queryData)
    },
    addMarker(data) {
      data.forEach((item, index) => {
        const marker = this.olmap._addIconMarkersScale(item, this.getImgaeUrl(item).image, 1, this)
        this.markerArray.push(marker)
      })
    },
    listBoxCloser() {
      this.queryData.currentPage = 1
      this.$store.dispatch('olmap/changeQueryData', this.queryData)
      this.$parent.expand = false
      this.clear()
      this.$emit('list-box-closer')
    },
    clear() {
      if (this.markerArray.length > 0) {
        this.olmap._clearMarker(this.markerArray) // 清除点位
      }
      // 关闭地图弹窗
      this.broadcast('BaseMap', 'clear')
    },
    mouseoverEvent(item, i) {
    },
    mouseoutEvent(item, i) {
    },
    clickEvent(item, i) {
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-box-items{
    .list-box{
      width:calc(100%);
      min-height: 80px;
      background: white;
      border: 1px solid #ebebeb;
      border-radius:2px;
      /*display: inline-block;*/
      position: relative;
      overflow: hidden;
      text-align: left;
      height: auto;
      max-height: 620px;
      font-size: 13px;
      overflow-y: auto;
      .box-tip{
        float: left;
        height: 40px;
        line-height: 40px;
        text-align: center;/*让文字水平居中*/
        position: absolute;
        top:32%;
        left: 42%;
        font-size: 12px;
        color: #d6d6d6;
      }
      .list-box-closer{
        text-decoration: none;
        position: absolute;
        top: 5px;
        right: 5px;
      }
      .list-box-closer:after {
        content: "✖";
        font-size: 14px;
      }
      >ul{
        width: 100%;
        list-style-type: none;
        padding: 10px 15px 10px 15px;
        li{
          white-space:nowrap;     //强制不换行
          overflow:hidden;           //自动隐藏文字
          text-overflow: ellipsis;    //文字隐藏后添加省略号
          -o-text-overflow:ellipsis; //适用于opera浏览器
          width: 100%;
          line-height: 28px;
          border-bottom: 1px solid #ededff;
          &:hover{
            cursor: pointer;
            color: #409eff;
            font-size: 15px;
            font-weight: bold;
          }
          .div-na{
            .index-num{
              float: left;
              width: calc(22px);
              text-align: left;
              white-space:nowrap;     //强制不换行
              overflow:hidden;           //自动隐藏文字
              text-overflow: ellipsis;    //文字隐藏后添加省略号
              -o-text-overflow:ellipsis; //适用于opera浏览器
            }
            .maker-name{
              float: left;
              width:calc(100% - 30px);
              text-align: left;
              white-space:nowrap;     //强制不换行
              overflow:hidden;           //自动隐藏文字
              text-overflow: ellipsis;    //文字隐藏后添加省略号
              -o-text-overflow:ellipsis; //适用于opera浏览器
            }
            .index-image{
              float: left;
              width: 22px;
              height: 22px;
              display: inline-block;
              background-repeat: no-repeat;
              background-position: 0px 0px;
              background-size: 100% 100%;
              margin: 0px 5px 0px 0px;
            }
          }
        }
      }
    }
    .page-pagination{
      height: 30px;
      display: flex;
      position: relative;
      .left {
        width: 30%;
        height: 100%;
        display: inline;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
        opacity: 0.9;
        border-radius: 2px 0px 0px 2px;
        line-height: 30px;
        text-align: left;
        padding-left: 10px;
        font-size: 12px;
      }
      .right {
        width: 70%;
        height: 100%;
        display: inline;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
        opacity: 0.9;
        border-radius: 2px 0px 0px 2px;
        position: relative;
        .page {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }
  }

</style>
