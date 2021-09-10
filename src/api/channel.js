// 封装频道的请求
import request from '@/utils/request.js'

/**
 * 获取所有频道的数据
 * @returns promise
 */
export const getAllChannel = () => {
  return request({
    url: '/v1_0/channels',
    method: 'GET'
  })
}

/**
 * 新增频道
 * @param {*} channel { id, seq }
 * @returns promise
 */
export const addUserChannel = channel => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH', // 与post用法一致 PATCH是用来刷新的
    data: {
      channels: [channel]
    }
  })
}

/**
 * 删除指定的频道id
 * @param {*} id 频道id
 * @returns promise
 */
export const deleteUserChannel = id => {
  return request({
    url: '/v1_0/user/channels/' + id,
    method: 'DELETE'
  })
}
