import Vue from 'vue'
import * as filters from './filters'
// 定义全局过滤器

Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})
// Vue.filter('formatDate')
