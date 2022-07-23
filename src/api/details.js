import request from '@/utils/request.js'

/**
 *
 * @returns 用户详情
 */
export const Details = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`
  })
}
