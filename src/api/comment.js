import request from '@/utils/request.js'

/**
 *
 * @param {*} type 文章a
 * @param {*} source 文章id
 * @returns
 */
export const comment = (type, source) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source
    }
  })
}
/**
 *
 * @param {*} target 对文章或评论进行评论
 * @param {*} content
 * @returns
 */
export const getComment = (target, content, artid) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      artid
    }
  })
}

/**
 *
 * @param {*} target 点赞
 * @returns
 */
export const thumbsUp = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 *
 * @param {*} target 取消点赞
 * @returns
 */
export const cancelThumbsUp = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}
