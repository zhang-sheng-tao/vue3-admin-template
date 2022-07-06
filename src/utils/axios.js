import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
import pinia from '@/pinia/index.js'
import globals from '@/pinia/global.js'
import userinfo from '@/pinia/userInfo.js'
import { removeItem } from '@/utils/auth'

const global = globals(pinia)
const userinfos = userinfo(pinia)

const request = axios.create({
  baseURL: 'http://sentrytest.hengshunits.com',
})

// 添加请求拦截器
request.interceptors.request.use(config => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  //  添加token
  const token = userinfos.token
  token && (config.headers.Authorization = 'Bearer ' + token)
  // 删除已有的请求
  global.removeRequestToken(config)
  // 添加现有的请求
  global.addRequestToken(config)
  return config
})

// 添加响应拦截器
request.interceptors.response.use(
  response => {
    // 删除已有的请求
    global.removeRequestToken(response.config)
    const res = response.data // res.code后端返回的状态码
    if (res.code >= 200 && res.code < 300) {
      return Promise.resolve(res)
    } else {
      return errorHandle(res)
    }
  },
  error => {
    if (error) {
      return errorHandle(error)
    }
  }
)

//  请求失败后的错误统一处理
function errorHandle (res) {
  // 状态码判断
  switch (res.code) {
    case 401: // 401: 未登录状态，跳转登录页
      tip(res.msg)
      removeItem('TOKEN')
      toLogin()
      break
    case 403: // 403 token过期 清除token并跳转登录页
      tip(res.msg)
      removeItem('TOKEN')
      break
    case 404: // 404请求不存在
      tip(res.msg)
      break
    case 500: // 服务器报错
    case 502:
      tip('服务器报错' + res.code)
      break
    default:
      return Promise.reject(res)
  }
}

// 提示错误信息
function tip (message) {
  ElMessage({
    message,
    grouping: true,
    type: 'error'
  })
}

function toLogin () {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.value.fullPath
    }
  })
}

export default request
