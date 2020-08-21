<template>
  <div class="t-box box-tool-a">
    <el-radio-group v-if="radioArray.length !== 0" v-model="radioType" size="mini" @change="changeRadio">
      <template v-for="(item, index) in radioArray">
        <div :key="index" class="box-item">
          <a href="javascript:;">
            <span class="tool-text-two">
              <el-radio size="mini" :label="item.id">{{ item.name }}</el-radio>
            </span>
          </a>
        </div>
      </template>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: 'RadioBox',
  props: {
    radioArray: {
      type: Array,
      default: () => {
        return [
          // { id: 'distribution', name: '分布图', radio: true },
          // { id: 'heating', name: '热力图', radio: false }
        ]
      }
    }
  },
  data() {
    return {
      radioType: '', // 类型
      radioObj: null
    }
  },
  watch: {
    radioArray: {
      handler(newVal, olVal) {
        if (newVal.length !== 0) {
          this.executeTheSelected(newVal)
        }
      },
      deep: true
    }
  },
  mounted() {
    if (this.radioArray.length !== 0) {
      this.executeTheSelected(this.radioArray)
      this.changeRadio()
    }
  },
  methods: {
    executeTheSelected(val) {
      const obj = val.find(item => item.radio === true)
      this.radioType = obj.id
    },
    changeRadio() {
      let obj = {}
      this.radioArray.forEach((item) => {
        item.radio = false
        if (item.id === this.radioType) {
          item.radio = true
          obj = item
        }
      })
      this.radioObj = obj
      this.$emit('radio-selected', this.radioObj)
    }
  }
}
</script>

<style lang="scss" scoped>
  .box-tool-a{
    position: relative;
    float: left;
    display: inline-block;
    padding: 0px 0px;
    background-repeat: no-repeat;
    background-color: white;
    margin-right: 10px;
    height: 38px;
    .box-item{
      float: left;
      padding: 0px 10px 0px 10px;
      &:hover{
        .toolcl, .tool-text-two{
          color: #409eff;
        }
      }
      .toolcl{
        display: inline-block;
        background-repeat: no-repeat;
        color: #4B5366;
      }
      .tool-text-two{
        text-align: center;
        margin-right: 15px;
        font-size: 14px;
        font-style: normal;
        height: 31px;
        line-height: 38px;
        color: #4B5366;
      }
      position: relative;
      &:not(:last-child):after {
        content: '';
        display: block;
        visibility: visible;
        width: 1px;
        height: 21px;
        background: #f4f4f4;
        position: absolute;
        top: 7px;
        right: -1px;
      }
    }
  }
</style>
