import { clone, valueHandle } from '../util/base'

export default {
  methods: {
    updateEchartsSize() {
      this.myChart.resize()
    },
    updateEchartsOption(notMerge) {
      if (this.node.option.dataType === 'api' && this.node.option.apiUrl) {
        const echartsOpt = clone(this.node.option.echartsOption)
        const tempSeries = echartsOpt.series[0]
        echartsOpt.series = []
        fetch(this.node.option.apiUrl)
          .then((res) => res.json())
          .then((data) => {
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

            this.myChart.setOption(echartsOpt, notMerge)

          })

      } else {
        this.myChart.setOption(this.node.option.echartsOption, notMerge)
      }
      this.computedTop(this.node.option.echartsOption)
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
