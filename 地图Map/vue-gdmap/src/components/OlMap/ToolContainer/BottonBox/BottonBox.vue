<template>
  <div class="t-box">
    <template v-for="(item, index) in buttonArray">
      <div :key="index">
        <el-button size="small" type="primary" @click="clickButton(item)">{{ item.buttonName }}</el-button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BottonBox',
  props: {
    buttonArray: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    clickButton(data) {
      this.$emit('click-button', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.t-box{
  >div{
    float: left;
    margin-top: 2px;
    margin-right: 5px;
  }
}
</style>
