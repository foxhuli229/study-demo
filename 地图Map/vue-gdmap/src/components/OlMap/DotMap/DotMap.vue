<template>
  <el-dialog
    class="dialog"
    :title="dialogObject.title"
    :visible.sync="dialogObject.visible"
    :width="dialogObject.dialogWidth"
    :close-on-click-modal="false"
    :append-to-body="true"
    :before-close="handleClose"
    @close="handleClose"
  >
    <div class="content-container">
      <div v-if="radioTypeFlag" class="head-map-group">
        <el-radio-group v-model="radioType" @change="changeRadio">
          <el-radio label="Point">点</el-radio>
          <el-radio label="LineString">线</el-radio>
          <el-radio label="Polygon">面</el-radio>
        </el-radio-group>
      </div>
      <div class="head-map">
        <el-form ref="form" :model="formData" label-width="80px">
          <el-row>
            <el-col v-if="radioType === 'Point'" :span="6">
              <div class="title">经度：</div>
              <div class="cont"><el-input v-model="formData.longitude" size="mini" /></div>
            </el-col>
            <el-col v-if="radioType === 'Point'" :span="6">
              <div class="title">纬度：</div>
              <div class="cont"><el-input v-model="formData.latitude" size="mini" /></div>
            </el-col>
            <el-col v-if="radioType === 'LineString'" :span="6">
              <div class="title">起点：</div>
              <div class="cont">
                <el-input v-model="formData.longitude" size="mini" />
              </div>
            </el-col>
            <el-col v-if="radioType === 'LineString'" :span="6">
              <div class="cont"><el-input v-model="formData.latitude" size="mini" /></div>
            </el-col>
            <el-col v-if="radioType === 'Polygon'" :span="6">
              <div class="title">中心点：</div>
              <div class="cont">
                <el-input v-model="formData.longitude" size="mini" />
              </div>
            </el-col>
            <el-col v-if="radioType === 'Polygon'" :span="6">
              <div class="cont"><el-input v-model="formData.latitude" size="mini" /></div>
            </el-col>
            <el-col v-if="radioType === 'Point'" :span="12">
              <el-input v-model="formData.address" size="mini" placeholder="请输入地址" class="input-with-select" @keyup.enter.native="searchAddressClick">
                <el-button slot="append" class="el-icon-search-button" size="mini" type="primary" icon="el-icon-search" @click="searchAddressClick" />
              </el-input>
            </el-col>
            <el-col v-if="radioType === 'LineString'" :span="12">
              <el-input v-model="formData.address" size="mini" placeholder="请输入地址" class="input-with-select" @keyup.enter.native="searchAddressClick">
                <el-button slot="append" class="el-icon-search-button" size="mini" type="primary" icon="el-icon-search" @click="searchAddressClick" />
              </el-input>
            </el-col>
            <el-col v-if="radioType === 'Polygon'" :span="12">
              <el-input v-model="formData.address" size="mini" placeholder="请输入地址" class="input-with-select" @keyup.enter.native="searchAddressClick">
                <el-button slot="append" class="el-icon-search-button" size="mini" type="primary" icon="el-icon-search" @click="searchAddressClick" />
              </el-input>
            </el-col>
          </el-row>
          <el-row v-if="radioType === 'LineString'">
            <el-col :span="24">
              <div class="title">线：</div>
              <div class="cont"><el-input v-model="formData.lineString" size="mini" /></div>
            </el-col>
          </el-row>
          <el-row v-if="radioType === 'Polygon'">
            <el-col :span="24">
              <div class="title">面：</div>
              <div class="cont"><el-input v-model="formData.polygonString" size="mini" /></div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="conten-map" :style="{ height: dialogObject.dotMapHeight }">
        <!-- 地图-->
        <ol-map ref="olMapChild" @registerClickEvent="mapClickEvent" @registerDblClickEvent="mapDblClickEvent" />
        <!-- 左下角地图底图切换 -->
        <layers-box :expand="true" :bottom="10" :left="10" />
        <div v-if="radioType === 'Polygon'" class="right-top">
          <el-button size="mini" @click="redRawClick">重绘</el-button>
        </div>
        <div v-if="radioType === 'LineString' " class="right-top">
          <el-button size="mini" @click="redRawClick">重绘</el-button>
        </div>
      </div>
    </div>
    <div slot="footer" footer-align="center" class="dialog-footer">
      <el-button size="mini" @click="handleClose">取消</el-button>
      <el-button size="mini" type="primary" @click="saveClick">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import OlMapLocalConfig from '@/components/OlMap/api/olmap-local-config.js'
export default {
  name: 'DotMap',
  components: {
    OlMap: () => import('@/components/OlMap'),
    LayersBox: () => import('@/components/OlMap/LayersBox')
  },
  props: {
    radioFlag: {
      type: Boolean,
      default: false
    },
    dialogObject: {
      type: Object,
      default: function() {
        return {
          title: '地址标记',
          visible: false,
          dialogWidth: '800px',
          dotMapHeight: '10px',
          data: {
            type: 'Point', // Point：打点 --- LineString: 画线  --- Polygon : 画面
            data: {} // 有数据就回显，无数据不回显，根据 type 类型显示
          }
        }
      },
      validator: function(value) {
        if (value.dialogWidth === undefined) {
          alert('对象属性缺少dialogWidth')
          value.visible = false
        } else if (value.dotMapHeight === undefined) {
          alert('对象属性缺少dotMapHeight')
          value.visible = false
        } else if (value.data === undefined) {
          alert('对象属性缺少data')
          value.visible = false
        } else if (value.data.type === undefined) {
          alert('对象属性缺少data.type')
          value.visible = false
        } else if (value.data.type === undefined) {
          alert('对象属性缺少data.data:[]')
          value.visible = false
        }
        return value
      }
    }
  },
  data() {
    return {
      radioTypeFlag: false,
      radioType: '', // 类型
      point: null,
      showPolyline: null,
      showPolygon: null,
      formData: {
        longitude: '',
        latitude: '',
        address: '',
        lineString: '',
        polygonString: ''
      },
      statusLock: false // 状态锁
    }
  },
  computed: {
    configObj() {
      return this.$store.state.olmap.configObj
    },
    drawLayer() {
      return this.$store.state.olmap.drawVectorLayer
    },
    map() {
      return this.$store.state.olmap.map
    },
    olmap() {
      return this.$store.state.olmap.olmap
    },
    imagesObj() {
      return this.$store.state.olmap.imagesObj
    },
    polygon() {
      return this.$store.state.olmap.polygon
    },
    dotMapStatus() {
      return this.$store.state.olmap.dotMapStatus
    }
  },
  mounted() {
    this.radioTypeFlag = false
    this.$nextTick(() => {
      setTimeout(() => {
        this.initDotMap()
        this.radioTypeFlag = this.radioFlag
        this.radioType = this.dialogObject.data.type
      }, 1000)
    })
  },
  beforeDestroy() {
    this.$store.dispatch('olmap/changeDotMapStatus', false)
  },
  methods: {
    changeRadio(val) {
      if (this.drawLayer) {
        this.map.removeLayer(this.drawLayer)
        this.$store.dispatch('olmap/changeDrawVectorLayer', null)
      }
      this.redRawClick()
      if (this.olmap.draw) {
        this.olmap.draw.setActive(false)
      }
      this.dialogObject.data.type = val
      this.initDotMap()
    },
    initDotMap() {
      if (this.dialogObject.visible) {
        const data = this.dialogObject.data.data
        const formData = {
          longitude: data.longitude,
          latitude: data.latitude,
          address: data.address
        }
        Object.assign(this.formData, formData)
        if (this.dialogObject.data.type === 'Polygon') {
          this.formData.polygonString = data.polygonString
          this.showPolygon = this.olmap._showSinglePolygon(data.polygonString, this.olmap)
          this.searchAddressByPoint()
          this.addPoint()
          this.olmap._drawByFeatures('Polygon', false)
        } else if (this.dialogObject.data.type === 'LineString') {
          this.formData.lineString = data.lineString
          this.showPolyline = this.olmap._showPolyline(data.lineString, this.olmap)
          this.searchAddressByPoint()
          this.addPoint()
          this.olmap._drawByFeatures('LineString', false)
        } else { // 显示点位
          this.searchAddressByPoint()
          this.addPoint()
        }
      }
    },
    handleClose() { // 取消
      this.dialogObject.visible = false
    },
    saveClick() { // 确定
      if (this.radioTypeFlag) {
        this.formData.type = this.dialogObject.data.type
        this.formData.radioTypeFlag = this.radioTypeFlag
        this.$emit('getDataByMap', this.formData)
      } else {
        if (this.dialogObject.data.type === 'Point') {
          this.formData.type = 'Point'
          this.$emit('getDataByMap', this.formData)
        }
        if (this.dialogObject.data.type === 'LineString') {
          this.formData.type = 'LineString'
          this.$emit('getDataByMap', this.formData)
        }
        if (this.dialogObject.data.type === 'Polygon') {
          this.formData.type = 'Polygon'
          this.$emit('getDataByMap', this.formData)
        }
      }
      this.dialogObject.visible = false
    },
    redRawClick() {
      this.clearLayer()
      if (this.drawLayer) {
        this.map.removeLayer(this.drawLayer)
        this.$store.dispatch('olmap/changeDrawVectorLayer', null)
        if (this.dialogObject.data.type === 'Polygon') {
          this.olmap._drawByFeatures('Polygon', false)
        } else if (this.dialogObject.data.type === 'LineString') {
          this.olmap._drawByFeatures('LineString', false)
        }
      }
    },
    clearLayer() {
      if (!this.statusLock) {
        if (this.dialogObject.data.type === 'Point') {
          if (this.point) {
            this.olmap.MarkerVectorLayer.getSource().removeFeature(this.point)
            this.point = null
          }
        }
        if (this.dialogObject.data.type === 'LineString') {
          if (this.point) {
            this.olmap.MarkerVectorLayer.getSource().removeFeature(this.point)
            this.point = null
          }
          if (this.showPolyline) {
            this.olmap.map.removeLayer(this.showPolyline)
            this.showPolyline = null
          }
        }
        if (this.dialogObject.data.type === 'Polygon') {
          if (this.point) {
            this.olmap.MarkerVectorLayer.getSource().removeFeature(this.point)
            this.point = null
          }
          if (this.showPolygon) {
            this.olmap.map.removeLayer(this.showPolygon)
            this.showPolygon = null
          }
        }
      }
    },
    mapClickEvent(data) {
      if (!this.dotMapStatus) {
        this.$store.dispatch('olmap/changeDotMapStatus', true)
      }
      this.clearLayer()
      if (this.dialogObject.data.type === 'Point') {
        const coordinate = data.coordinate
        const longitude = coordinate[0].toFixed(6)
        const latitude = coordinate[1].toFixed(6)
        this.formData = {
          longitude: longitude,
          latitude: latitude,
          address: ''
        }
        this.searchAddressByPoint()
        this.addPoint()
        this.olmap._setDefaultZoom([longitude, latitude])
      }
      if (this.dialogObject.data.type === 'LineString') {
        if (this.olmap.draw.sketchCoords_) {
          if (!this.statusLock) {
            const sketchCoords = this.olmap.draw.sketchCoords_
            this.formData.longitude = sketchCoords[0][0].toFixed(6)
            this.formData.latitude = sketchCoords[0][1].toFixed(6)
            this.searchAddressByPoint()
            this.addPoint()
            this.statusLock = true
          }
        }
      }
    },
    mapDblClickEvent(data) {
      if (this.dialogObject.data.type === 'LineString') {
        if (this.olmap.draw.sketchCoords_) {
          const sketchCoords = this.olmap.draw.sketchCoords_
          this.formData.longitude = sketchCoords[0][0].toFixed(6)
          this.formData.latitude = sketchCoords[0][1].toFixed(6)
          const dataLine = {}
          const coverArray = []
          if (sketchCoords.length > 0) {
            sketchCoords.forEach((item, index) => {
              const longitude = Number(item[0]).toFixed(6)
              const latitude = Number(item[1]).toFixed(6)
              const pointStr = `${longitude} ${latitude}`
              coverArray.push(pointStr)
            })
            dataLine.lineString = coverArray.toString()
            Object.assign(this.formData, dataLine)
            this.statusLock = true
          }
        }
      } else if (this.dialogObject.data.type === 'Polygon') {
        const centre = this.polygon.centre
        this.formData.longitude = centre[0].toFixed(6)
        this.formData.latitude = centre[1].toFixed(6)
        const coverArray = []
        this.polygon.data.forEach((item, index) => {
          const longitude = Number(item[0]).toFixed(6)
          const latitude = Number(item[1]).toFixed(6)
          const pointStr = `${longitude} ${latitude}`
          coverArray.push(pointStr)
        })
        this.formData.polygonString = coverArray.toString()
        this.searchAddressByPoint()
        this.addPoint()
      }
      if (this.olmap.draw) {
        this.olmap.draw.setActive(false)
      }
    },
    addPoint() {
      if (this.point) {
        this.olmap.MarkerVectorLayer.getSource().removeFeature(this.point)
        this.point = null
      }
      this.point = this.olmap._addIconMarkers(this.formData, this.imagesObj.Red_Png_, this)
    },
    searchAddressClick() {
      if (this.formData.address !== '') {
        OlMapLocalConfig.searchPointByKeyWord({
          key: this.configObj.T_MAP_KEY,
          keyWord: this.formData.address
        }).then(res => {
          const location = res.location
          this.formData.longitude = location.lon
          this.formData.latitude = location.lat
          this.addPoint()
          this.olmap._setCenter({
            longitude: location.lon,
            latitude: location.lat
          })
        })
      }
    },
    searchAddressByPoint() {
      if (this.formData.longitude !== '') {
        OlMapLocalConfig.searchAddressByPoint({
          key: this.configObj.T_MAP_KEY,
          longitude: this.formData.longitude,
          latitude: this.formData.latitude
        }).then(res => {
          const result = res.result
          this.formData.address = result.formatted_address
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog {
    /deep/ .el-dialog__body {
      padding: 0;
    }
    .content-container {
      padding: 10px 10px 10px 10px;
      .head-map-group{
        padding: 10px;
      }
      .head-map{
        height: auto;
        min-height: 30px;
        margin: 0px 0px 10px 0px;
        .title{
          float: left;
          width: 70px;
          line-height: 30px;
          padding: 0px 0px 0px 10px;
        }
        .cont{
          float: left;
          width: calc(100% - 70px);
        }
        .el-icon-search-button{
          background-color: #409eff;
          &:hover{
            background-color: #409eff;
            font-weight: bold;
          }
        }
        /deep/ .el-icon-search{
          color: white !important;
        }
      }
      .conten-map{
        position: relative;
        padding: 0;
        overflow: hidden;
        width: 100%;
        height: 300px;
        .right-top{
          z-index: 1001;
          position: absolute;
          top: 20px;
          right: 20px;
          background: #ffffff;
          box-shadow: 1px 2px 1px rgba(0, 0, 0, .15);
        }
      }
    }
  }
  .el-scroll{
    /deep/ .el-scrollbar__wrap {
      max-height: 50vh;
      overflow: auto;
      overflow-x: hidden !important;
      padding-right: 17px;
    }
  }
</style>
