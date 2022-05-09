import {eventActionType, eventType} from "../type";

export const eventList: { value: eventType, label: string }[] = [
  {value: 'click', label: '单击'},
  {value: 'click', label: '双击'}]
export const eventAction: { value: eventActionType, label: string }[] = [{value: 'linkToPage', label: '连接到页面'}]
