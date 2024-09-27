import { formatTimeToStr } from '@/utils/date'

export const formatBoolean = (bool) => {
  if (bool !== null) {
    return bool ? '是' : '否'
  } else {
    return ''
  }
}

export const formatDate = (time) => {
  if (time !== null && time !== '') {
    const date = new Date()
    return formatTimeToStr(date, 'yyyy-MM-dd hh:mm:ss')
  } else {
    return ''
  }
}
