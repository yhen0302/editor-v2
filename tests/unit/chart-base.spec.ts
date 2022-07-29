import { assert } from 'chai'
import { BaseChart } from '../../src/components/2d/localData/chart/base'

describe('chart/base', () => {
  it('test base handle value', () => {
    const obj = {bb:"cc",aa:{dd:'ccc',kk:'aaa'},number:[1,2,3,4,5]}
    const obj1 = {bb:"c",aa:{dd:'cc2',},number:[2,2,3,4,5]}

    const chart = new BaseChart()
    assert.deepEqual(chart.merge(obj,obj1),{bb:"c",aa:{dd:'cc2',kk:'aaa'},number:[2,2,3,4,5]})
  })
})

