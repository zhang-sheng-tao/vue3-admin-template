import router from '@/router/index'
import pinia from '@/pinia/index.js'
import { getItem } from '@/utils/auth.js'
// 获取用户信息
import userinfo from '@/pinia/userInfo.js'
import globals from '@/pinia/global.js'
const user = userinfo(pinia)
const global = globals(pinia)

// 路由白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  global.cleatRequestToken()
  if (getItem('TOKEN')) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (user.userInfo.name) {
        next()
      } else {
        try {
          // 用户信息
          await user.getInfo()
          next()
        } catch (err) {
          // 退出登录
          await user.logout()
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    // 这里是在没有登录的情况下可以进入的页面
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 强制跳转带本来要去的路径
      next(`/login?redirect=${to.path}`)
    }
  }
})
