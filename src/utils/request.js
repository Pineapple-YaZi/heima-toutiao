import axios from 'axios'
import { Toast } from 'vant'
import store from '../store/index'

// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net'
})

// 添加请求拦截器 axios官网有
request.interceptors.request.use(config => {
  // console.log(config)
  if (config.url.indexOf('/user') !== -1) {
    // config: 请求配置信息
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  if (config.url !== '/v1_1/articles') {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0 // 持续展示
    })
  }
  return config
})

// 添加响应拦截器
request.interceptors.response.use(res => {
  Toast.clear()
  return res.data.data
})

// 使用实例发送请求和axios发送请求一样
export default request
