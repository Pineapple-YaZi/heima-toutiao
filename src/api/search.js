import request from '@/utils/request.js'

/**
 * 获取搜索推荐列表
 * @param {*} q 搜索关键字
 * @returns promise
 */
export const getSearchSuggestion = q => {
  return request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}

/**
 * 获取搜索结果
 * @param {*} params { page, per_page, q }
 * @returns peomise
 */
export const getSearchResults = params => {
  return request({
    url: '/v1_0/search',
    method: 'GET',
    params
  })
}
