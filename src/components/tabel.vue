<template>
  <el-table :data="props.tableData" border>
    <el-table-column align="center" v-for="(item, index) in props.tableHeader" :key="index" :label="item.label">
      <template #default="{ row }" v-if="item.label === '操作'">
        <el-tag v-for="(itemtag, tag) in item.btn" :class="{ margin: tag % 2 === 1, eltag: true }" :key="tag" @click="itemtag.callback(row)" :type="itemtag.type">{{ itemtag.label }}</el-tag>
      </template>
      <template #default="{ row }" v-else>
        {{ row[item.prop] }}
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
const props = defineProps({
  tableData: {
    type: Array,
    default: [],
    required: true,
  },
  tableHeader: {
    type: Array,
    default: [],
    required: true,
  },
});

function tags(row) {
  console.log(row);
}
</script>
<style lang="scss" scoped>
.margin {
  margin: 0 10px;
}
.eltag {
  cursor: pointer;
  user-select: none;
}
</style>
