<template>
  <div class="enter-legend">
    <div class="one">达标</div>
    <div class="two">不达标</div>
    <div class="not">无数据</div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.enter-legend{
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
      background:#d1c5e2;
    }
  }
}
@media screen and (max-width: 1366px) {
  .enter-legend{
    display: flex;
    >div{
      width:50px;
      height: 20px;
      margin-right: 5px;
      font-size:12px;
      color:rgba(255,255,255,1);
      align-items: center;
      text-align: center;
      line-height: 20px;
      &.one{
        background:rgba(40,177,40,1);
      }
      &.two{
        background:rgba(255,63,65,1);
      }
      &.not{
        background:#d1c5e2;
      }
    }
  }
}
</style>
