<template>
  <router-view></router-view>
</template>

<script setup></script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
.el-menu--collapse {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.el-menu--collapse::-webkit-scrollbar {
  width: 0 !important;
}
</style>
