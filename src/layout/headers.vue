<template>
  <div class="headers flex">
    <div class="flex">
      <el-icon @click="Collapse" class="icon">
        <component :is="global.isCollapse ? 'Fold' : 'Expand'" />
      </el-icon>
      <el-breadcrumb separator="/">
        <template v-for="item in breadcrumb" :key="item.path">
          <el-breadcrumb-item v-if="item.meta.title">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <img class="img" src="@/assets/user.gif" alt="" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>注销账号</el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import globals from '@/pinia/global.js'
import { computed } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { getCurrentInstance } from 'vue'
import { removeItem } from '@/utils/auth'
const apiUserInfo = getCurrentInstance().proxy.$api.userInfo
const route = useRoute()
const router = useRouter()
const global = globals()

const breadcrumb = computed(() => {
  return route.matched
})

function Collapse () {
  global.$patch({
    isCollapse: !global.isCollapse
  })
}

function logout () {
  apiUserInfo.logout().then(res => {
    ElMessage({
      message: res.data,
      grouping: true,
      type: 'success'
    })
    removeItem('TOKEN')
    router.replace({
      path: '/login'
    })
  })
}
</script>

<style lang="scss" scoped>
.headers {
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
}
.flex {
  height: 100%;
  display: flex;
  align-items: center;
}
.icon {
  cursor: pointer;
  margin-right: 10px;
}
.icon:hover {
  color: var(--el-color-primary);
}
.img {
  width: 40px;
  height: 40px;
  border-radius: 5px;
}
</style>
