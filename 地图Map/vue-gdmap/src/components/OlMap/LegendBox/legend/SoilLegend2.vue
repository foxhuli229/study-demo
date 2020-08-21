<template>
  <div class="soil-legend">
    <div class="a"> 无污染</div>
    <div class="b"> 轻微污染</div>
    <div class="c"> 轻度污染</div>
    <div class="d"> 中度污染</div>
    <div class="e"> 重度污染</div>
    <div class="f"> 无数据</div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.soil-legend{
  display: flex;
  >div{
    width:60px;
    height: 30px;
    margin-right: 5px;
    font-size:12px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    align-items: center;
    text-align: center;
    line-height: 30px;
    &.a{
      background:#00DC00;
    }
    &.b{
      background: #FFCC00;
      color: #333333;
    }
    &.c{
      background: #FF7E00;
    }
    &.d{
      background:#FF0000;
    }
    &.e{
      background:#99004C;
    }
    &.f{
      background:#d1c5e2;
    }
  }
}
@media screen and (max-width: 1366px) {
  .soil-legend{
    display: flex;
    >div{
      width:50px;
      height: 20px;
      margin-right: 5px;
      font-size: 8px;
      color:rgba(255,255,255,1);
      align-items: center;
      text-align: center;
      line-height: 20px;
      &.a{
        background:#00DC00;
      }
      &.b{
        background: #FFCC00;
        color: #333333;
      }
      &.c{
        background: #FF7E00;
      }
      &.d{
        background:#FF0000;
      }
      &.e{
        background:#99004C;
      }
      &.f{
        background:#d1c5e2;
      }
    }
  }
}
</style>
