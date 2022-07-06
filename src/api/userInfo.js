import request from '@/utils/axios.js'

export default {
  // 登录返回Token
  login (data) {
    return request({
      url: '/admin/v1/login',
      method: 'post',
      data
    })
  },
  // 用户信息
  getInfo () {
    return request({
      url: '/admin/v1/adminUser'
    })
  },
  // 退出登录
  logout () {
    return request({
      url: '/admin/v1/logout',
      method: 'delete'
    })
  }
}
