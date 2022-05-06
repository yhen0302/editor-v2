class EventBus {
  cache: { [k: string]: any }

  constructor() {
    // 储存事件的数据结构
    // 为查找迅速， 使用对象（字典）
    this.cache = {}
  }

  // 绑定
  on(type: string, callback: (e: any) => void): this {
    // 为了按类查找方便和节省空间
    // 将同一类型事件放到一个数组中
    // 这里的数组是队列， 遵循先进先出
    // 即新绑定的事件先触发
    const fns = (this.cache[type] = this.cache[type] || [])
    if (fns.indexOf(callback) === -1) {
      fns.push(callback)
    }
    return this
  }

  // 触发
  emit(type: string, data: { [k: string]: any }): this {
    const fns = this.cache[type]
    if (Array.isArray(fns)) {
      fns.forEach((fn) => {
        fn(data)
      })
    }
    return this
  }

  // 解绑
  off(type: string, callback: (e: any) => void): this {
    const fns = this.cache[type]
    if (Array.isArray(fns)) {
      if (callback) {
        const index = fns.indexOf(callback)
        if (index !== -1) {
          fns.splice(index, 1)
        }
      } else {
        // 全部清空
        fns.length = 0
      }
    }
    return this
  }
}

export const EventsBus = new EventBus()
