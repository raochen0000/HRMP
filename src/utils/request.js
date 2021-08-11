import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// request interceptor
service.interceptors.request.use()

// response interceptor
service.interceptors.response.use(res => {
  console.log(res)
  const { success, data, message } = res.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(message)
  }
}, err => {
  console.dir(err)
  if (err.response && err.response.status === 404) {
    return Message.error('连接服务器失败！')
  }
  Message.error(err.response.data.message)
  return Promise.reject(err.response.data.message)
})

export default service
