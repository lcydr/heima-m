import request from '@/utils/request.js'

/**
 *
 * @param {int} target 收藏文章
 * @returns
 */
export const Collection = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 *
 * @param {int} target 取消收藏
 * @returns
 */
export const CancelFavorites = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}
