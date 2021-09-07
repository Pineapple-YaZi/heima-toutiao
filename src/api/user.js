import request from '../utils/request.js'

/**
 * 发送验证码
 * @param {*} mobile 手机号
 * @returns promise
 */
export const sendCode = (mobile) => {
  return request({
    url: '/app/v1_0/sms/codes/' + mobile
  })
}

/**
 * 登录请求
 * @param {*} data { mobile, code }
 * @returns promise
 */
export const login = data => {
  return request({
    url: '/app/v1_0/authorizations',
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
    url: '/app/v1_0/user ',
    method: 'GET'
  })
}
