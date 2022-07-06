<template>
  <el-container class="container">
    <el-aside width="auto" class="aside">
      <menus></menus>
    </el-aside>
    <el-container>
      <el-header class="header">
        <el-card class="card">
          <headers></headers>
        </el-card>
      </el-header>
      <AppMain></AppMain>
    </el-container>
  </el-container>
</template>

<script setup>
import menus from "./menu/menus.vue";
import headers from "./headers.vue";
import AppMain from "./AppMain.vue";
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
.header {
  padding: 0;
  .card {
    height: 100%;
  }
  ::v-deep .el-card__body {
    width: 100%;
    height: 100%;
    padding: 0;
  }
}
</style>
