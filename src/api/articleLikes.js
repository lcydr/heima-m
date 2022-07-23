import request from '@/utils/request.js'

/**
 *
 * @param {int} target 对文章点赞
 * @returns
 */
export const ArticleLikes = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
/**
 *
 * @param {int} target 取消
 * @returns
 */
export const CancelArticleLikes = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
