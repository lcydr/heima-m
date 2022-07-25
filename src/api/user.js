import request from '@/utils/request'
import dayjs from '@/utils/dayjs'
/**
 *
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
  })
}

// 获取用户信息
export const profile = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
// 编辑用户信息
export const editProfile = (dataobj) => {
  const obj = {
    name: '',
    gender: 0,
    birthday: '',
    realname: '',
    intro: ''
  }
  for (const prop in dataobj) {
    if (dataobj[prop] === undefined) {
      delete dataobj[prop]
    } else {
      obj[prop] = dataobj[prop]
    }
  }

  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: obj
  })
}
// 编辑用户照片资料
export const editPhoto = (data) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}

export const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}
