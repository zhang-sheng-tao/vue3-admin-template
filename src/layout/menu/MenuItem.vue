<template>
  <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 0">
    <template #title>
      <el-icon>
        <component v-if="item.meta && item.meta.icon" :is="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </template>
    <menu-item v-for="item in item.children" :key="item.path" :item="item"></menu-item>
  </el-sub-menu>

  <el-menu-item v-else :index="item.path">
    <el-icon>
      <component v-if="item.meta && item.meta.icon" :is="item.meta.icon" />
    </el-icon>
    <template #title>
      <span>{{ item.meta.title }}</span>
    </template>
  </el-menu-item>
</template>

<script setup>
const { ...item } = defineProps(["item"]);
</script>

<style lang="scss" scoped></style>
