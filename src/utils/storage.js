// 对localStorage进行二次封装

// 获取本地数据
export const getItem = key => {
  const data = localStorage.getItem(key)
  // 判断是不是普通字符串，不是就用JSON.parse()方法，是就返回普通字符串 因为JSON方法只能对JSON字符串进行处理
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 保存本地数据
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

// 删除本地数据
export const removeItem = key => {
  localStorage.removeItem(key)
}
