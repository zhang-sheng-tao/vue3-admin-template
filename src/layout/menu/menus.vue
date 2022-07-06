<template>
  <el-menu :default-active="router.currentRoute.value.path" class="el-menu-vertical-demo" :collapse="global.isCollapse" :default-openeds="[router.currentRoute.value.path]" :unique-opened="true" background-color="rgb(4, 35, 82)" text-color="#fff" router>
    <div class="name">后台管理系统</div>
    <SidebarItem v-for="router in router.options.routes" :key="router.path" :item="router" />
  </el-menu>
</template>

<script setup>
import SidebarItem from "./SidebarItem.vue";
import { useRouter } from "vue-router";
import globals from "@/pinia/global.js";
const global = globals();
const router = useRouter();
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.el-menu-vertical-demo:not(.el-menu--collapse)::-webkit-scrollbar {
  width: 0 !important;
}
.name {
  width: 100%;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  color: #fff;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 20px;
  background: var(--el-color-black);
}
</style>
