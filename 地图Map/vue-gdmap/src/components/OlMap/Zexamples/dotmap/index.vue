<template>
  <!-- 地图 打点 画线 画面-->
  <div class="dot-map">
    <el-form ref="form" :model="formDot" label-width="80px">
      <el-row>
        <el-col :span="3">
          <el-form-item label="经度">
            <el-input v-model="formDot.longitude" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="纬度">
            <el-input v-model="formDot.latitude" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地址">
            <el-input v-model="formDot.address" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="dotMapClick">打点</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form ref="form" :model="formLine" label-width="80px">
      <el-row>
        <el-col :span="3">
          <el-form-item label="线的起点">
            <el-input v-model="formLine.longitude" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-input v-model="formLine.latitude" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="起点地址">
            <el-input v-model="formLine.address" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="线:">
            <el-input v-model="formLine.lineString" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="lineStringMapClick">绘线</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form ref="form" :model="formPolygon" label-width="80px">
      <el-row>
        <el-col :span="3">
          <el-form-item label="中心点">
            <el-input v-model="formPolygon.longitude" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-input v-model="formPolygon.latitude" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="中心地址">
            <el-input v-model="formPolygon.address" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="面:">
            <el-input v-model="formPolygon.polygonString" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="polygonMapClick">绘面</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <br>
    <hr>
    <el-form ref="form" :model="formData" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="点">
            <el-input v-model="formData.longitude" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-input v-model="formData.latitude" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="地址">
            <el-input v-model="formData.address" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="线:">
            <el-input v-model="formData.lineString" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="面:">
            <el-input v-model="formData.polygonString" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="mixtureMapClick">点/线/面</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 打点、画线、画面 -->
    <dot-map v-if="dialogObjDotMap.visible" :dialog-object="dialogObjDotMap" :radio-flag="radioMapFlag" @getDataByMap="getDataByDotMap" />
  </div>
</template>

<script>
export default {
  components: {
    DotMap: () => import('@/components/OlMap/DotMap')
  },
  data() {
    return {
      radioMapFlag: false, // 是否使用打点组合 点、线、面
      dialogObjDotMap: {
        title: '地址标记',
        visible: false,
        dialogWidth: '900px',
        dotMapHeight: '450px',
        data: {
          type: 'Point', // Point：打点 --- Line: 画线  --- Area : 画面
          data: {} // 有数据就回显，无数据不回显，根据 type 类型显示
        }
      },
      formDot: {
        longitude: '104.710693',
        latitude: '30.830641',
        address: '德阳市幸福栱西北约159米'
      },
      formLine: {
        longitude: '103.881226',
        latitude: '30.781202',
        address: '德阳市幸福栱西北约159米',
        lineString: '103.881226 30.781202,103.793335 30.528517,104.254761 30.352736,104.485474 30.468092'
      },
      formPolygon: {
        longitude: '105.194710',
        latitude: '30.756483',
        address: '绵阳市法官庙西北约334米',
        polygonString: '105.051270 30.891066,105.012817 30.621901,105.419312 30.643873,105.298462 30.863600,105.051270 30.891066'
      },
      formData: {
        longitude: '',
        latitude: '',
        address: '',
        lineString: '',
        polygonString: ''
      }
    }
  },
  methods: {
    dotMapClick() { // 地图打点
      this.dialogObjDotMap = {
        title: '地图打点',
        visible: true,
        dialogWidth: '900px',
        dotMapHeight: '450px',
        data: {
          type: 'Point',
          data: this.formDot
        }
      }
      this.radioMapFlag = false
    },
    lineStringMapClick() {
      this.dialogObjDotMap = {
        title: '地图绘线',
        visible: true,
        dialogWidth: '900px',
        dotMapHeight: '450px',
        data: {
          type: 'LineString',
          data: this.formLine
        }
      }
      this.radioMapFlag = false
    },
    polygonMapClick() {
      this.dialogObjDotMap = {
        title: '地图绘面',
        visible: true,
        dialogWidth: '900px',
        dotMapHeight: '450px',
        data: {
          type: 'Polygon',
          data: this.formPolygon
        }
      }
      this.radioMapFlag = false
    },
    mixtureMapClick() {
      this.dialogObjDotMap = {
        title: '点/线/面',
        visible: true,
        dialogWidth: '900px',
        dotMapHeight: '450px',
        data: {
          type: 'Point',
          data: this.formData
        }
      }
      this.radioMapFlag = true // 使用组合
    },
    getDataByDotMap(data) {
      this.radioMapFlag = false
      if (data.radioTypeFlag) {
        this.formData = data
      } else {
        if (data.type === 'Point') {
          this.formDot = data
        }
        if (data.type === 'LineString') {
          this.formLine = data
        }
        if (data.type === 'Polygon') {
          this.formPolygon = data
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
