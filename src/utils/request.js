import axios from 'axios'
import { Toast } from 'vant'
import store from '../store/index'

// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 添加请求拦截器
request.interceptors.request.use(config => {
  console.log(config)
  if (config.url.indexOf('/user') !== -1) {
    // config: 请求配置信息
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  // config: 请求配置信息
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0 // 持续展示
  })
  return config
})

// 添加相应拦截器
request.interceptors.response.use(res => {
  Toast.clear()
  return res.data.data
})

// 使用实例发送请求和axios发送请求一样
export default request
