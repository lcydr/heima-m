import request from '@/utils/request.js'
import storage from '@/utils/storage'

/**
 *
 * @param {*} q 搜索建议
 * @returns
 */
export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}

/**
 *
 * @param {*} q 搜索结果
 * @returns
 */
export const getSearchResult = (q) => {
  return request({
    url: '/v1_0/search',
    params: { q }
  })
}

const ARR = 'ARR'
export const getSearch = () => storage.get(ARR)
export const setSearch = (item) => storage.set(ARR, item)
export const removeSearch = () => storage.remove(ARR)
