import { eventActionType, eventType } from '../type'

export const eventTypeList: { value: eventType; label: string }[] = [
  { value: 'click', label: '单击' },
  { value: 'dblclick', label: '双击' }
]
export const eventAction: { value: eventActionType; label: string }[] = [
  { value: 'linkToPage', label: '链接到页面' },
  { value: 'linkToExternal', label: '链接外部地址' },
  { value: 'nodeTransform', label: '组件显示/隐藏' }
]