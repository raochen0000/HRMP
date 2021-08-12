import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getTokenTime } from '@/utils/auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(config => {
  NProgress.start() // 开启进度条
  const token = store.getters.token
  if (token) {
    // 判断token是否过期
    if (isTokenTimeOut()) {
      store.commit('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期，请重新登录！'))
    }
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, err => {
  return Promise.reject(err)
})

// response interceptor
service.interceptors.response.use(res => {
  NProgress.done() // 关闭进度条
  const { success, data, message } = res.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(message)
  }
}, err => {
  NProgress.done() // 关闭进度条
  let errTxt = null
  if (err.response && err.response.data && err.response.data.code === 10002) {
    store.commit('user/logout')
    router.push('/login')
    errTxt = '登录过期，请重新登录！'
  }
  if (err.response && err.response.status === 404) {
    return Message.error('连接服务器失败！')
  }
  Message.error(errTxt || err.message)
  return Promise.reject(err.response?.data?.message)
})

function isTokenTimeOut() {
  const tokenLife = 50
  const tokenTime = (Date.now() - getTokenTime()) / 1000
  return tokenTime > tokenLife
}

export default service
