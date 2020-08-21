<template>
  <div class="biao-zhu">
    <div class="biao-zhu-source" v-show="biaoZhuData.value === 1">
      <el-row class="row">
        <el-col :span="12">
          类型：重大风险源
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12">
          企业名称： {{ biaoZhuData.enterpriseName }}
        </el-col>
        <el-col :span="12">
          行政区域： {{ biaoZhuData.administrativeDivisionName }}
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12">
          经度：{{ biaoZhuData.longitude }}
        </el-col>
        <el-col :span="12">
          纬度：{{ biaoZhuData.latitude }}
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="24">
          地址：{{ biaoZhuData.location }}
        </el-col>
      </el-row>
    </div>
    <div class="biao-zhu-source" v-if="biaoZhuData.value === 2">
      <el-row class="row">
        <el-col :span="12">
          类型：较大风险源
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="24">
          企业名称： {{ biaoZhuData.enterpriseName }}
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12">
          <!--危险： {{ biaoZhuData.dangerGoods }}-->
        </el-col>
        <el-col :span="12">
          行政区域： {{ biaoZhuData.administrativeDivisionName }}
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12">
          经度：{{ biaoZhuData.longitude }}
        </el-col>
        <el-col :span="12">
          纬度：{{ biaoZhuData.latitude }}
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="24">
          地址：{{ biaoZhuData.location }}
        </el-col>
      </el-row>
    </div>
    <div class="biao-zhu-source" v-if="biaoZhuData.value === 3">
      <el-row class="row">
        <el-col :span="12">
          类型：一般风险源
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="24">
          企业名称： {{ biaoZhuData.enterpriseName }}
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12">
          危险： {{ biaoZhuData.dangerGoods }}
        </el-col>
        <el-col :span="12">
          行政区域： {{ biaoZhuData.administrativeDivisionName }}
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12">
          经度：{{ biaoZhuData.longitude }}
        </el-col>
        <el-col :span="12">
          纬度：{{ biaoZhuData.latitude }}
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="24">
          地址：{{ biaoZhuData.location }}
        </el-col>
      </el-row>
    </div>
    <div class="biao-zhu-source" v-if="biaoZhuData.value === 4">
      <el-row class="row">
        <el-col :span="12">
          类型：重大危险源
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="24">
          企业名称： {{ biaoZhuData.enterpriseName }}
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12">
          <!--危险： {{ biaoZhuData.dangerGoods }}-->
        </el-col>
        <el-col :span="12">
          行政区域： {{ biaoZhuData.administrativeDivisionName }}
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12">
          经度：{{ biaoZhuData.longitude }}
        </el-col>
        <el-col :span="12">
          纬度：{{ biaoZhuData.latitude }}
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="24">
          地址：{{ biaoZhuData.location }}
        </el-col>
      </el-row>
    </div>
    <div class="paikou" v-if="biaoZhuData.value === 5">
      <el-row class="row">
        <el-col :span="12">
          编号： {{ biaoZhuData.code }}
        </el-col>
        <el-col :span="12">
          类型：废气排口
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12">
          经度：{{ biaoZhuData.longitude }}
        </el-col>
        <el-col :span="12">
          纬度：{{ biaoZhuData.latitude }}
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="24">
          地址：{{ biaoZhuData.location }}
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="24">
          污染物种类：{{biaoZhuData.pollutantNames}}
        </el-col>
      </el-row>
    </div>
    <div  class="paikou" v-if="biaoZhuData.value === 6">
      <el-row class="row">
        <el-col :span="12">
          编号： {{ biaoZhuData.code }}
        </el-col>
        <el-col :span="12">
          类型：废水排口
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12">
          经度：{{ biaoZhuData.longitude }}
        </el-col>
        <el-col :span="12">
          纬度：{{ biaoZhuData.latitude }}
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="24">
          地址：{{ biaoZhuData.location }}
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="24">
          污染物种类：{{biaoZhuData.pollutantNames}}
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BiaoZhu',
  props: {
    biaoZhuData: {
      type: Object,
      default: () => {
        return {
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.biao-zhu{
  padding: 0px;
  .biao-zhu-source{
    width: 300px;
    height: 150px;
  }
  .paikou{
    width: 300px;
    height: 120px;
  }
  .row{
    line-height: 30px;
    font-size: 12px;
  }
}
</style>
