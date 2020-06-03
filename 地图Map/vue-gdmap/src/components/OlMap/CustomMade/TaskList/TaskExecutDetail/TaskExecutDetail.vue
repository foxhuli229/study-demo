<template>
  <div class="task-execut-detail">
    <div class="detail-u">
      <div class="executor">
        <div class="name">执行人: 小明</div>
        <div class="time">2020-04-29 03:33:33</div>
      </div>
      <div class="message">
        <div class="text">现场情况，文案可以多行显示文案可以多行显示文 案可以多行显示 </div>
        <div class="image-video">
          <!-- 图片列表 -->
          <el-row v-for="(imgRow,index) in imgArray" :key="index" :gutter="9" class="accessory-row">
            <el-col v-for="item in imgRow" :key="item.id" :span="8">
              <a v-if="checkIsImg(item.name)" :href="item.url" target="_blank" ><img :data-src="item.url" :src="item.url" class="image-item"></a>
              <span v-if="checkIsVideo(item.name)" class="video-item">
                <video :src="item.url" style="width:100%;height:100%;" controls>当前浏览器不支持视频播放
                </video>
                <!-- 视频播放按钮 -->
                <i class="el-icon-caret-right video-play" @click="handlePreviewFile(item)" />
              </span>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="detail-u">
      <div class="executor">
        <div class="name">指示:</div>
        <div class="time">2020-04-29 06:55:55</div>
      </div>
      <div class="message">
        <div class="text">管理者对该事件有明确的指示 </div>
        <div class="image-video" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskExecutDetail',
  props: {
    mission: {
      type: Object,
      default: () => {
        return {
          userName: '管理员'
        }
      }
    }
  },
  data() {
    return {
      imgArray: [
        [
          { id: 1, name: 'xxx.jpg', url: 'https://nim-nosdn.netease.im/MTY3NDY2Mjc=/bmltYV8xNDk5NDQyMDk0OF8xNTg4MTUzMjM2NDI4XzI0NTExYzRhLTgwNGYtNDZiZC1iNGFlLWExNmRlYTExYTIyNA==?createTime=1588153237810' },
          { id: 2, name: '20200429201512.mp4', url: 'https://nim-nosdn.netease.im/MTY3NDY2Mjc=/bmltYV8xNDk5NDQyMDk0OF8xNTg4MTYyNjI2OTY1X2IzMmMxZTMzLTU0YTgtNDY1OC05NDZiLTliOWQzMThkZGU1ZA==?createTime=1588162627801&download=20200429201512.mp4' },
          { id: 3, name: 'xxx.jpg', url: 'https://nim-nosdn.netease.im/MTY3NDY2Mjc=/bmltYV8xNDk5NDQyMDk0OF8xNTg4MTUzMjM2NDI4XzI0NTExYzRhLTgwNGYtNDZiZC1iNGFlLWExNmRlYTExYTIyNA==?createTime=1588153237810' },
          { id: 4, name: 'xxx.jpg', url: 'https://nim-nosdn.netease.im/MTY3NDY2Mjc=/bmltYV8xNDk5NDQyMDk0OF8xNTg4MTUzMjM2NDI4XzI0NTExYzRhLTgwNGYtNDZiZC1iNGFlLWExNmRlYTExYTIyNA==?createTime=1588153237810' }
        ]
      ]
    }
  },
  methods: {
    getFileType(fileName) {
      const fileNameSplited = fileName.split('.')
      // 获取文件拓展名,统一取小写判断
      const fileExtension = fileNameSplited[fileNameSplited.length - 1].toLowerCase()
      // 通过文件拓展名判断文件类型
      switch (fileExtension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'bmp':
          return 'image'
        case 'mp4':
        case 'avi':
          return 'video'
        case 'mp3':
        case 'amr':
        case 'm4a':
          return 'audio'
        case 'doc':
        case 'docx':
        case 'xls':
        case 'xlsx':
        case 'ppt':
        case 'pptx':
        case 'pdf':
          return 'pdf'
        case 'txt':
          return 'txt'
        case 'zip':
        case 'rar':
          return 'zip'
        default:
          return ''
      }
    },
    checkIsImg(fileStyle) {
      return this.getFileType(fileStyle) === 'image'
    },
    checkIsVideo(fileStyle) {
      return this.getFileType(fileStyle) === 'video'
    },
    checkIsAudio(fileStyle) {
      return this.getFileType(fileStyle) === 'audio'
    },
    handlePreviewFile(item) {

    }
  }
}
</script>

<style lang="scss" scoped>
.task-execut-detail{
  width: calc(100%);
  .detail-u{
    box-sizing: border-box;
    width: calc(100%);
    margin-bottom: 15px;
    .executor {
      width: calc(100%);
      height: 30px;
      .name{
        font-weight: bold;
        font-size:12px;
        line-height:14px;
        color:rgba(75,83,102,1);
        opacity:1;
        float: left;
      }
      .time{
        float: right;
      }
    }
    .message{
      width: calc(100%);
      .text{
        font-size:12px;
        line-height:18px;
        color:rgba(75,83,102,1);
        text-indent:25px;
        margin-bottom: 10px;
        word-break: break-all;
      }
      .image-video{
        .accessory-row {
          .image-item {
            width: 100%;
            height: 57px;
            display: inline-block;

            &:hover {
              cursor: pointer;
            }
          }

          .video-item {
            width: 100%;
            height: 57px;
            max-width: 290px;
            _width:290px;
            line-height: 57px;
            text-align: center;
            display: inline-block;
            position: relative;
            background: #f7f8fa;

            .video-play {
              position: absolute;
              box-sizing: border-box;
              width: 30px;
              height: 30px;
              top: calc(50% - 15px);
              left: calc(50% - 15px);
              border-radius: 50%;
              color: #ffffff;
              background-color: rgba(0, 0, 0, 0.8);
              font-size: 20px;
              display: inline-flex;
              align-items: center;
              justify-content: center;

              &:hover {
                cursor: pointer;
              }
            }
          }

          .audio-item {
            width: 100%;
            height: 57px;
            display: inline-flex;
            box-sizing: border-box;
            background: #f7f8fa;
            justify-content: center;
            align-items: center;

            .audio-play-icon {
              width: 30px;

              &:hover {
                cursor: pointer;
              }
            }
          }
        }

        .accessory-row + .accessory-row {
          margin-top: 10px;
        }
      }
    }
  }

}
</style>

