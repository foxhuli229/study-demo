<template>
  <div class="switch-view">
    切换视图
  </div>
</template>

<script>
export default {
  name: 'SwitchView'
}
</script>

<style lang="scss" scoped>
.switch-view{
  position: absolute;
  width: 100px;
  left: 420px;
  top: 20px;
  background:rgba(255,255,255,1);
  box-shadow:0px 10px 20px 0px rgba(0, 0, 0, 0.14);
  border-radius:2px;
  transition: right .8s ease;
  z-index: 998;
  border-collapse: separate;
}
</style>
