<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#tab-bar {
  position: fixed; /* 为什么开启固定定位，因为底部切换栏应固定在页面底部 */
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0px -3px 1px rgba(100, 100, 100, 0.2);
  z-index: 9;
}
</style>
