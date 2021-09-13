import axios from 'axios'
import { Toast } from 'vant'
import store from '../store/index'
import JSONBig from 'json-bigint'

// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
const request = axios.create({
  // 后台返回原始数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }],
  baseURL: 'http://toutiao-app.itheima.net'
  // baseURL: 'http://ttapi.research.itcast.cn/app'
})

// 添加请求拦截器 axios官网有
const notLoading = ['/v1_1/articles', '/v1_0/search', '/v1_0/comments']
request.interceptors.request.use(config => {
  // console.log(config)
  if (store.state.user) {
  // if (config.url.indexOf('/user') !== -1) {
    // config: 请求配置信息
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  const isDetail = /\/v1_0\/articles\/\d/.test(config.url)
  // if (notLoading.indexOf(config.url) === -1 && config.url.indexOf('/v1_0/articles/') === -1) {
  if (notLoading.indexOf(config.url) === -1 && !isDetail) {
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
