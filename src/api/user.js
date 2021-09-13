import request from '../utils/request.js'

/**
 * 发送验证码
 * @param {*} mobile 手机号
 * @returns promise
 */
export const sendCode = (mobile) => {
  return request({
    url: '/v1_0/sms/codes/' + mobile
  })
}

/**
 * 登录请求
 * @param {*} data { mobile, code }
 * @returns promise
 */
export const login = data => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 * @returns promise
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    method: 'GET'
  })
}

/**
 * 获取tabs列表
 * @returns promise
 */
export const getUserChannels = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET'
  })
}

/**
 * 关注用户请求
 * @param {*} target {}
 * @returns promise
 */
export const addFollowUser = target => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

export const removeFollowUser = target => {
  return request({
    url: 'v1_0/user/followings/' + target,
    method: 'DELETE'
  })
}
