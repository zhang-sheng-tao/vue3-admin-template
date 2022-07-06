import { defineStore } from 'pinia'
import { getItem, setItem, removeItem } from '@/utils/auth.js'
import userInfo from '@/api/userInfo'

export default defineStore('userInfo', {
  state () {
    return {
      userInfo: {},
      token: getItem('TOKEN') || ''
    }
  },
  actions: {
    login (data) {
      return new Promise((resovle, reject) => {
        userInfo
          .login(data)
          .then(res => {
            this.token = res.data.access_token
            setItem('TOKEN', res.data.access_token)
            this.getInfo()
            resovle()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getInfo () {
      return new Promise((resovle, reject) => {
        userInfo
          .getInfo()
          .then(res => {
            this.userInfo = res.data
            resovle()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    logout () {
      return new Promise(resovle => {
        userInfo.logout().then(() => {
          removeItem('TOKEN')
          resovle()
        })
      })
    }
  }
})
