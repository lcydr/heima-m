class Storage {
  set(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  get(key) {
    // 如果parse的是一个JSON格式字符串，return JSON.parse()
    // 不是呢？ return
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}
const stoRage = new Storage()

export default stoRage
