<template>
  <div class="t-box">
    <div v-if="adminisOptions.length> 0" class="adminis-options">
      <el-select v-model="adminisVal" placeholder="请选择" @change="changeAdminis">
        <el-option
          v-for="item in adminisOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <div v-if="keyAreaOptions.length> 0" class="key-area-options">
      <el-select v-model="keyAreaVal" placeholder="请选择" @change="changeKeyArea">
        <el-option
          v-for="item in keyAreaOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectBox',
  props: {
    adminisOptions: { // 行政区域
      type: Array,
      default: () => {
        // return [{
        //   id: '1',
        //   name: '创业园区1'
        // }, {
        //   id: '2',
        //   name: '创业园区2'
        // }]
        return []
      }
    },
    keyAreaOptions: { // key area  重点区域
      type: Array,
      default: () => {
        // return [{
        //   id: '1',
        //   name: '重点区域01'
        // }, {
        //   id: '2',
        //   name: '重点区域02'
        // }]
        return []
      }
    }
  },
  data() {
    return {
      adminisVal: '',
      keyAreaVal: ''
    }
  },
  computed: {
    queryData() {
      return this.$store.state.olmap.queryData
    }
  },
  mounted() {
    if (this.adminisOptions.length > 0) {
      this.adminisOptions.unshift({ id: '', name: '全部行政区划' })
    }
    if (this.keyAreaOptions.length > 0) {
      this.keyAreaOptions.unshift({ id: '', name: '选择重点区域' })
    }
  },
  methods: {
    changeAdminis(val) {
      this.queryData.administrative = val
      this.$store.dispatch('olmap/changeQueryData', this.queryData)
    },
    changeKeyArea(val) {
      this.queryData.keyArea = val
      this.$store.dispatch('olmap/changeQueryData', this.queryData)
    }
  }
}
</script>

<style lang="scss" scoped>
  .t-box{
    >div{
      float: left;
      margin-right: 5px;
    }
    .adminis-options{
      width: 180px;
    }
    .key-area-options{
      width: 130px;
    }
  }
  /deep/ .el-input__inner, .el-select-dropdown__item{
    font-size:12px;
    font-family:MicrosoftYaHei;
    color:rgba(75,83,102,1);
    opacity:1;
  }
</style>
