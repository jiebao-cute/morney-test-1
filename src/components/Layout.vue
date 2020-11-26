<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
name: "Layout.vue"
}
</script>

<style lang="scss" scoped>
.nav-wrapper{
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content{
  border: 1px solid royalblue;
  flex-grow: 1;//将内容高度尽量给content
  overflow: auto;//加滚动条
}
</style>