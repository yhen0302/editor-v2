import { toColor } from '@/share/util/node'

export const bigTitle = {
  emitters:[],
  matrixOption: {
    left: 0,
    top: 0,
    height: 40,
    width: 300,
    rotate: 0,
    borderTopLeftRadius:0,
    borderTopRightRadius:0,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
  },
  shadowColor:toColor('rgba(0,0,0,0)'),
  shadowX:0,
  shadowY:0,
  shadowBlur:0,
  transparency: 100,
  color:toColor('#6582fe'),
  value: '大标题',
  contentEditable: false,
  textOption: {
    color: '#FFFFFF',
    fontFamily: 'microsoft YaHei',
    fontSize: 30,
    fontStyle: [],
    align: 'left',
    verticalAlign: 'start'
  } 
}

export const smallTitle = {
  emitters:[],
  matrixOption: {
    left: 0,
    top: 0,
    height: 30,
    width: 300,
    rotate: 0,
    borderTopLeftRadius:0,
    borderTopRightRadius:0,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
  },
  shadowColor:toColor('rgba(0,0,0,0)'),
  shadowX:0,
  shadowY:0,
  shadowBlur:0,
  transparency: 100,
  color:toColor('#6582fe'),
  value: '小标题',
  contentEditable: false,
  textOption: {
    color: '#FFFFFF',
    fontFamily: 'microsoft YaHei',
    fontSize: 20,
    fontStyle: [],
    align: 'left',
    verticalAlign: 'start'
  } 
}

export const baseTitle = {
  emitters:[],

  matrixOption: {
    left: 0,
    top: 0,
    height: 30,
    width: 300,
    rotate: 0,
    borderTopLeftRadius:0,
    borderTopRightRadius:0,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
  },
  shadowColor:toColor('rgba(0,0,0,0)'),
  shadowX:0,
  shadowY:0,
  shadowBlur:0,
  transparency: 100,
  color:toColor('#6582fe'),
  value: '标题',
  contentEditable: false,
  textOption: {
    color: '#FFFFFF',
    fontFamily: 'microsoft YaHei',
    fontSize: 24,
    fontStyle: [],
    align: 'left',
    verticalAlign: 'start'
  } 
}

export const textContent = {
  emitters:[],
  matrixOption: {
    left: 0,
    top: 0,
    height: 30,
    width: 300,
    rotate: 0,
    borderTopLeftRadius:0,
    borderTopRightRadius:0,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
  },
  shadowColor:toColor('rgba(0,0,0,0)'),
  shadowX:0,
  shadowY:0,
  shadowBlur:0,
  transparency: 100,
  color:toColor('#6582fe'),
  value: '正文',
  contentEditable: false,
  textOption: {
    color: '#FFFFFF',
    fontFamily: 'microsoft YaHei',
    fontSize: 16,
    fontStyle: [],
    align: 'left',
    verticalAlign: 'start'
  } 
}
