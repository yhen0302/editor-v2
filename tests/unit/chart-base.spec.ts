import { assert } from 'chai'
import { BaseChart } from '../../src/components/2d/localData/chart/base'

describe('chart/base', () => {
  it('test base handle value', () => {

    const obj = {color: [
      {
        type: 'linear',
        x: 0,
        y: 1,
        x2: 0,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: '#ff0000' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#0000ff' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      },
      '#91cc75',
      '#fac858',
      '#ee6666',
      '#73c0de',
      '#3ba272'
    ],}
    const obj1 = {color:[{
        "type": "linear",
        "x": 0,
        "y": 1,
        "x2": 0,
        "y2": 0,
        "colorStops": [
          {
            "color": "rgba(255, 255, 255, 0.03)",
            "offset": 0,
          },
          {
            "color": "rgba(0, 255, 255, 1)",
            "offset": 1,
          }
        ]
      }]}

    const chart = new BaseChart()
    assert.deepEqual(chart.merge(obj,obj1),{color: [
        {
          "type": "linear",
          "x": 0,
          "y": 1,
          "x2": 0,
          "y2": 0,
          "colorStops": [
            {
              "color": "rgba(255, 255, 255, 0.03)",
              "offset": 0,
            },
            {
              "color": "rgba(0, 255, 255, 1)",
              "offset": 1,
            }
          ],
          "global": false
        },
        '#91cc75',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#3ba272'
      ],})
  })
})

