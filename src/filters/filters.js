// 导入dayjs
import dayjs from 'dayjs'
// 导入相对时间
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入中文语言包
import 'dayjs/locale/zh-cn'
// 添加相对时间插件
dayjs.extend(relativeTime)
// 使用中文语言包
dayjs.locale('zh-cn')

export const formatDate = data => {
  return dayjs().to(data)
}

export const strFormat = str => {
  return str + '哈哈'
}
