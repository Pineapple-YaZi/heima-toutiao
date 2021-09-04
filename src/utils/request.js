import axios from 'axios'
import { Toast } from 'vant'

// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 添加请求拦截器
// request.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })

request.interceptors.request.use(config => {
  console.log(config)
  // config: 请求配置信息
  Toast.loading({
    message: '发送中...',
    forbidClick: true,
    duration: 0 // 持续展示
  })
  return config
})

// 使用实例发送请求和axios发送请求一样
export default request
