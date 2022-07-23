import request from '@/utils/request.js'

/**
 *
 * @param {int} target 关注用户
 * @returns
 */
export const Follow = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: 'target'
    }
  })
}

/**
 *
 * @param {int} target 取消关注
 * @returns
 */
export const CancelFollow = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}
