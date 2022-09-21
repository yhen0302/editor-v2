let i = 1

class Table {
  type = 'BaseTable'
  icon = require('../../../assets/images/table-style1.png')
  name: string
  defaultMatrixOpt = {
    left: 0,
    top: 0,
    height: 300,
    width: 250,
    rotate: 0
  }
  option: any

  constructor(option) {
    this.name = '表格样式-' + i++

    this.option = {
      ...option,
      matrixOption: this.merge(this.defaultMatrixOpt, option.matrixOption || {})
    }
  }

  merge(target: { [key: string]: any } = {}, custom: { [key: string]: any } = {}) {
    for (const key of Object.keys(target)) {
      if (!Object.prototype.hasOwnProperty.call(custom, key)) custom[key] = target[key]
      else {
        if (typeof custom[key] === 'object' && typeof target[key] === 'object') custom[key] = this.merge(target[key], custom[key])
      }
    }
    return custom
  }

}

export const tableList = [
  new Table({
    style: 'table-1',
    emitters: {},
    tableData: [
      {
        name: '1',
        age: '王小虎',
        sex: '分拣区',
        hobby: '无不良'
      }, {
        name: '2',
        age: '王小虎',
        sex: '分拣区',
        hobby: '无不良'
      }, {
        name: '3',
        age: '王小虎',
        sex: '分拣区',
        hobby: '无不良'
      }, {
        name: '4',
        age: '王小虎',
        sex: '分拣区',
        hobby: '无不良'
      }, {
        name: '5',
        age: '王小虎',
        sex: '分拣区',
        hobby: '无不良'
      }, {
        name: '6',
        age: '王小虎',
        sex: '分拣区',
        hobby: '不良'
      }],
    tableMap: {
      name: '序号',
      age: '姓名',
      hobby: '位置',
      sex: '不良状态'
    }
  }),
  new Table({
    style: 'table-2',
    emitters: {},
    tableData: [
      {
        name: '1',
        age: '王小虎',
        sex: '分拣区',
        hobby: '无不良'
      }, {
        name: '2',
        age: '王小虎',
        sex: '分拣区',
        hobby: '无不良'
      }, {
        name: '3',
        age: '王小虎',
        sex: '分拣区',
        hobby: '无不良'
      }, {
        name: '4',
        age: '王小虎',
        sex: '分拣区',
        hobby: '无不良'
      }, {
        name: '5',
        age: '王小虎',
        sex: '分拣区',
        hobby: '无不良'
      }, {
        name: '6',
        age: '王小虎',
        sex: '分拣区',
        hobby: '不良'
      }],
    tableMap: {
      name: '序号',
      age: '姓名',
      hobby: '位置',
      sex: '不良状态'
    }
  }),
  new Table({
    style: 'table-3',
    emitters: {},
    tableData: [
      {
        name: '1',
        age: '王小虎',
        sex: '分拣区',
        hobby: '无不良'
      }, {
        name: '2',
        age: '王小虎',
        sex: '分拣区',
        hobby: '无不良'
      }, {
        name: '3',
        age: '王小虎',
        sex: '分拣区',
        hobby: '无不良'
      }, {
        name: '4',
        age: '王小虎',
        sex: '分拣区',
        hobby: '无不良'
      }, {
        name: '5',
        age: '王小虎',
        sex: '分拣区',
        hobby: '无不良'
      }, {
        name: '6',
        age: '王小虎',
        sex: '分拣区',
        hobby: '不良'
      }],
    tableMap: {
      name: '序号',
      age: '姓名',
      hobby: '位置',
      sex: '不良状态'
    }
  })
]
