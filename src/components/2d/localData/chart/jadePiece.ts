import { Bar } from './bar'

class PolarBar extends Bar {
  type = 'ChartPolarBar'
}

export const JadePieceList = [
  new PolarBar({
    echartsOption: {
      xAxis: { axisLine: { show: false } },
      polar: {
        radius: [30, '80%']
      },
      angleAxis: {
        max: 4,
        startAngle: 75
      },
      radiusAxis: {
        type: 'category',
        data: ['a', 'b', 'c', 'd']
      },
      series: [
        {
          type: 'bar',
          name: '图表一',
          data: [2, 1.2, 2.4, 3.6],
          coordinateSystem: 'polar',
          label: {
            show: true,
            position: 'middle',
            formatter: '{b}: {c}'
          }
        }
      ]
    }
  })]