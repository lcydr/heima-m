import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})

// 拦截器
// 请求拦截器
// 每一次请求都会执行的函数
// 响应拦截器
// 每一个请求回来时,都会执行的函数

request.interceptors.request.use(
  // 想在发送请求前做什么
  // config 本次请求的配置
  // 必须要返回回去
  (config) => {
    // config添加token
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default request
