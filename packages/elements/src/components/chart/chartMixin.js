import { clone, valueHandle } from '../../../../../src/share/util/base'

export default {
  methods: {
    updateEchartsSize() {
      this.myChart.resize()
    },
    async setApiData(option) {
      const echartsOpt = clone(option || this.node.option.echartsOption)
      const tempSeries = echartsOpt.series[0]
      echartsOpt.series = []
      const data = await (await fetch(this.node.option.apiUrl)).json()
      this.node.option.apiMapping.forEach((item) => {
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
    },
    updateEchartsOption(option, notMerge = false, resize = false) {
      if (typeof option === 'boolean') {
        option = null
        notMerge = option
      }
      if (resize) this.myChart.resize()
      if (this.node.option.dataType === 'api' && this.node.option.apiUrl) {
        this.setApiData(option).then((echartsOption) => {
          this.myChart.setOption(option || this.node.option.echartsOption, notMerge)
        })
      } else {
        this.myChart.setOption(option || this.node.option.echartsOption, notMerge)
      }
      this.computedTop(option || this.node.option.echartsOption)
    },
    computedTop(option) {
      let top = 50
      if (option.unit.show) {
        top += option.unit.textStyle.fontSize
      }
      if (option.title.show) {
        top += option.title.textStyle.fontSize
      }
      option.grid.top = top
    }
  }
}
