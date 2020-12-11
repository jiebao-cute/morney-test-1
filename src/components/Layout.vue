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

  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content{

  flex-grow: 1;//将内容高度尽量给content
  overflow: auto;//加滚动条
}
</style>