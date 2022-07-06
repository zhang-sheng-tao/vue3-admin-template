<template>
  <template v-if="!item.hidden">
    <template v-if="item.alwaysShow && item.children && item.children.length > 0">
      <menu-item v-for="items in item.children" :key="items.path" :item="items"></menu-item>
    </template>
    <template v-else>
      <menu-item v-for="items in [item]" :key="items.path" :item="items"></menu-item>
    </template>
  </template>
</template>

<script setup>
import MenuItem from "./MenuItem.vue";
const { ...item } = defineProps(["item"]);
</script>

<style lang="scss" scoped></style>
