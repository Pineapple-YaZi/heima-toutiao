import request from '@/utils/request.js'

/**
 * 获取文章列表
 * @param {*} params {}
 * @returns promise
 */
export const getArticleList = params => {
  return request({
    url: '/v1_1/articles',
    method: 'GET',
    params
  })
}

/**
 * 获取文章详情
 * @param {*} id 文章id
 * @returns promise
 */
export const getArticleDetail = id => {
  return request({
    url: '/v1_0/articles/' + id,
    method: 'GET'
  })
}

/**
 * 收藏文章
 * @param {*} target 收藏的目标文章id
 * @returns promise
 */
export const addCollected = target => {
  return request({
    url: 'v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 * @param {*} target 取消收藏目标文章id
 * @returns promise
 */
export const removeCollected = target => {
  return request({
    url: 'v1_0/article/collections/' + target,
    method: 'DELETE'
  })
}

/**
 * 获取评论列表
 * @param {*} params {type, source, offset, limit}
 * @returns promise
 */
export const getComment = params => {
  return request({
    url: '/v1_0/comments',
    data: 'GET',
    params
  })
}
