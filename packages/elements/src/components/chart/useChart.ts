import { clone, debounce, valueHandle } from '../../../../../src/share/util/base'
import * as echarts from 'echarts'
import { ref, onMounted, watch } from 'vue'

export default function useChart(props, context, isYAxis = true, updateOptionOnResize = false, preprocessOptionFn?) {
  const chartWrap = ref()
  let myChart // echarts instance
  onMounted(() => {
    myChart = echarts.init(chartWrap.value)
    myChart.setOption(preprocessOptionFn ? preprocessOptionFn(props.node.option.echartsOption) : props.node.option.echartsOption)
  })

  const updateEchartsSize = debounce(function(chart) {
    chart.resize()
  }, 200)
  const debounceSetOption = debounce(function(...args: [option: any, notMerg?: boolean, resize?: boolean]) {
    const option = args[0] || props.node.option.echartsOption
    updateEchartsOption(preprocessOptionFn ? preprocessOptionFn(option) : option, ...args.slice(1))
  }, 300)

  async function setApiData(option) {
    const echartsOpt = clone(option || props.node.option.echartsOption)
    const tempSeries = echartsOpt.series[0]
    echartsOpt.series = []
    const data = await (await fetch(props.node.option.apiUrl)).json()
    props.node.option.apiMapping.forEach((item) => {
      if (item.target === 'x') {
        echartsOpt.xAxis.data = valueHandle(data, item.path)
      } else {
        let series = clone(tempSeries)
        series.data = valueHandle(data, item.path)
        series.name = valueHandle(data, item.name) || item.name
        echartsOpt.series.push(series)
      }
    })

    return echartsOpt
  }

  function updateEchartsOption(option, notMerge = false, resize = false) {
    if (typeof option === 'boolean') {
      option = null
      notMerge = option
    }
    if (resize) myChart.resize()
    if (props.node.option.dataType === 'api' && props.node.option.apiUrl) {
      setApiData(option).then((echartsOption) => {
        myChart.setOption(option || props.node.option.echartsOption, notMerge)
      })
    } else {
      myChart.setOption(option || props.node.option.echartsOption, notMerge)
    }
    computedTop(option || props.node.option.echartsOption)
  }

  function computedTop(option) {
    let top = 50
    if (option.unit.show) {
      top += option.unit.textStyle.fontSize
    }
    if (option.title.show) {
      top += option.title.textStyle.fontSize
    }
    option.grid.top = top
  }

  ['color', 'title', 'series', 'yAxis', 'legend', 'apiMapping'].forEach(key => {
    if (key === 'yAxis' && !isYAxis) return
    watch(() => props.node.option.echartsOption[key], () => {
      debounceSetOption()
    }, { deep: true })
  })

  watch(
    () => props.node.option.echartsOption.unit,
    (newVal, oldVal) => {
      if (newVal.show) {
        const unit = props.node.option.echartsOption.unit
        // eslint-disable-next-line vue/no-mutating-props
        props.node.option.echartsOption.graphic = {
          elements: [
            {
              type: 'text',
              left: unit.left,
              right: unit.right,
              top: unit.top,
              style: {
                text: unit.text,
                fill: unit.textStyle.color,
                font: `${unit.textStyle.fontStyle} ${unit.textStyle.fontWeight} ${unit.textStyle.fontSize}px ${unit.textStyle.fontFamily}`
              }
            }
          ]
        }
      } else {
        // eslint-disable-next-line vue/no-mutating-props
        delete props.node.option.echartsOption.graphic
      }
      debounceSetOption(null, true)
    },
    { deep: true }
  )

  watch(() => props.node.option.matrixOption, () => {
    if (updateOptionOnResize) {
      myChart.resize()
      debounceSetOption()
    } else {
      updateEchartsSize(myChart)
    }
  }, { deep: true })

  return {
    chartWrap
  }
}