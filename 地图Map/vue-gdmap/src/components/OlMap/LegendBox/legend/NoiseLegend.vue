<template>
  <div class="noise-legend">
    <div class="one">未超标</div>
    <div class="two">超标</div>
    <div class="not">无数据</div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .noise-legend{
    display: flex;
    >div{
      width:60px;
      height: 30px;
      margin-right: 5px;
      font-size:14px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
      align-items: center;
      text-align: center;
      line-height: 30px;
      &.one{
        background:rgba(40,177,40,1);
      }
      &.two{
        background:rgba(255,63,65,1);
      }
      &.not{
        background:rgba(154,154,154,1);
      }
    }
  }
</style>
