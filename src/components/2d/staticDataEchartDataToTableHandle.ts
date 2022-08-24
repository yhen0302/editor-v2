import { clone } from '../../share/util/base'

const cache = (fn) => {
  const cacheObj = {}
  return function (key) {
    return cacheObj[key] ? cacheObj[key] : (cacheObj[key] = fn(key))
  }
}
export default function getStaticHandle(node) {
  switch (node.type) {
    case 'ChartBar':
    case 'ChartCurve':
    case 'ChartLine':
      return {
        echartsDataToTableHandle: getAxisEchartsDataToTableHandle('xAxis'),
        tableDataAssignEchartsHandle: getAxisTableDataAssignEchartsHandle('xAxis')
      }
    case 'ChartPie':
    case 'ChartGauge':
      return {
        echartsDataToTableHandle: pieEchartsDataToTableHandle,
        tableDataAssignEchartsHandle: pieTableDataAssignEchartsHandle
      }
    case 'ChartRadar':
      return {
        echartsDataToTableHandle: radarEchartsDataToTableHandle,
        tableDataAssignEchartsHandle: radarTableDataAssignEchartsHandle
      }
    case 'ChartScatter':
      return {
        echartsDataToTableHandle: scatterEchartsDataToTableHandle,
        tableDataAssignEchartsHandle: scatterTableDataAssignEchartsHandle
      }
    case 'ChartPolarBar':
      return {
        echartsDataToTableHandle: getAxisEchartsDataToTableHandle('radiusAxis'),
        tableDataAssignEchartsHandle: getAxisTableDataAssignEchartsHandle('radiusAxis')
      }
    case 'ChartYCategoryBar':
      return {
        echartsDataToTableHandle: getAxisEchartsDataToTableHandle('yAxis'),
        tableDataAssignEchartsHandle: getAxisTableDataAssignEchartsHandle('yAxis')
      }
    case 'ChartMultiPolarBar':
      return {
        echartsDataToTableHandle: multiPolarBarEchartsDataToTableHandle,
        tableDataAssignEchartsHandle: multiPolarBarTableDataAssignEchartsHandle
      }
    case 'ChartMultiGauge':
      return {
        echartsDataToTableHandle:multiGaugeEchartsDataToTableHandle,
        tableDataAssignEchartsHandle:multiGaugeTableDataAssignEchartsHandle
      }
  }
}

let getAxisEchartsDataToTableHandle = cache(function (axisField) {
  return function (node) {
    return [
      ['', ...node.option.echartsOption[axisField].data],
      ...node.option.echartsOption.series.map((item) => [item.name, ...item.data])
    ]
  }
})
let getAxisTableDataAssignEchartsHandle = cache(function (axisField) {
  return function (tableData, node) {
    let realIndex = 0
    tableData.forEach((item, index) => {
      if (index === 0) node.option.echartsOption[axisField].data = item.filter((item, i) => i !== 0)
      else {
        if (!node.option.echartsOption.series[realIndex - 1])
          node.option.echartsOption.series[realIndex - 1] = clone(
            node.option.echartsOption.series[0],
            true
          )
        node.option.echartsOption.series[realIndex - 1].name = item[0]
        node.option.echartsOption.series[realIndex - 1].data = []
        for (let i = 1; i < item.length; i++) {
          if (item[i] === undefined) {
            node.option.echartsOption.series[realIndex - 1].data[i - 1] = 0
            continue
          }
          node.option.echartsOption.series[realIndex - 1].data[i - 1] = item[i]
        }
      }
      realIndex++
    })
  }
})

// 饼图
function pieEchartsDataToTableHandle(node:any) {
  const line1 = []
  const line2 = []
  node.option.echartsOption.series[0].data.forEach((data: any) => {
    line1.push(data.name)
    line2.push(data.value)
  })
  return [line1, line2]
}
function pieTableDataAssignEchartsHandle(tableData, node) {
  // node.option.echartsOption.series[0].data
  // const m = tableData[0].length>tableData[1].length?tableData[0]:tableData[1]
  const eO = node.option.echartsOption
  tableData[0].forEach((item, index) => {
    if (!eO.series[0].data[index]) eO.series[0].data[index] = {}
    eO.series[0].data[index].name = item
    eO.series[0].data[index].value = tableData[1][index]
  })
  eO.series[0].data.splice(tableData[0].length)
}

// 雷达图
function radarEchartsDataToTableHandle(node) {
  return [
    ['', ...node.option.echartsOption.radar.indicator.map((item) => item.name)],
    ...node.option.echartsOption.series[0].data.map((item) => [item.name, ...item.value])
  ]
}
function radarTableDataAssignEchartsHandle(tableData, node) {
  tableData.forEach((row, index) => {
    if (index === 0) {
      row
        .slice(1)
        .forEach((item, i) =>
          node.option.echartsOption.radar.indicator[i]
            ? (node.option.echartsOption.radar.indicator[i].name = item)
            : (node.option.echartsOption.radar.indicator[i] = { name: item })
        )
    } else {
      node.option.echartsOption.series[0].data[index - 1] = {
        name: row[0],
        value: row.slice(1)
      }
    }
  })
}

// 散点图
function scatterEchartsDataToTableHandle(node) {
  return [...node.option.echartsOption.series[0].data.map((item) => clone(item))]
}
function scatterTableDataAssignEchartsHandle(tableData, node) {
  tableData.forEach((item, i) => {
    node.option.echartsOption.series[0].data[i] = [...item]
  })
}

// 多个条形极坐标图形
function multiPolarBarEchartsDataToTableHandle(node) {
  const line1 = []
  const line2 = []
  node.option.echartsOption.series.forEach((item: any, index) => {
    line1.push(item.name || `系列${index + 1}`)
    line2.push(...item.data)
  })
  return [line1, line2]
}
function multiPolarBarTableDataAssignEchartsHandle(tableData, node) {
  tableData[0].forEach((item, index) => {
    if (!node.option.echartsOption.series[index]) return
    node.option.echartsOption.series[index].name = item
    node.option.echartsOption.series[index].data = [tableData[1][index]]
  })
}

// 多个仪表盘
function multiGaugeEchartsDataToTableHandle(node){
  const line1 = []
  const line2 = []
  node.option.echartsOption.series.forEach(item=>{
    line1.push(item.name)
    line2.push(...item.data)
  })
  return [line1,line2]
}
function multiGaugeTableDataAssignEchartsHandle(tableData,node){
  tableData[0].forEach((item, index) => {
    if (!node.option.echartsOption.series[index]) return
    node.option.echartsOption.series[index].name = item
    node.option.echartsOption.series[index].data = [tableData[1][index]]
  })
}
