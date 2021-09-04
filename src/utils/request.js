import axios from 'axios'

// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 使用实例发送请求和axios发送请求一样
export default request
