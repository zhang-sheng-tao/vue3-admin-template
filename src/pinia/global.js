import { defineStore } from 'pinia'
import axios from 'axios'
const cancelToken = axios.CancelToken

export default defineStore('globals', {
  state () {
    return {
      isCollapse: false,
      pending: []
    }
  },
  actions: {
    // 添加请求标识
    addRequestToken (config) {
      let params = ''
      if (config.method === 'post') {
        params = JSON.stringify(config.data)
      } else {
        params = config.params
      }
      let url = `${config.url}&${config.method}&${params}`
      new cancelToken(c => {
        this.pending.push({ c, url })
      })
    },
    // 清除请求
    removeRequestToken (config) {
      let params = ''
      if (config.method === 'post') {
        params = config.data
      } else {
        params = config.params
      }
      let url = `${config.url}&${config.method}&${params}`
      for (let i = 0; i < this.pending.length; i++) {
        if (this.pending[i].url === url) {
          this.pending[i].c()
          this.pending.splice(i, 1)
          break
        }
      }
    },
    // 清空请求
    cleatRequestToken () {
      for (let i = 0; i < this.pending.length; i++) {
        this.pending[i].c()
        this.pending.splice(i, 1)
      }
    }
  }
})
