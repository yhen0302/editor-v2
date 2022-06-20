import { assert } from 'chai'
import { valueHandle } from '../../src/util/base'

describe('util/base', () => {
  it('test base handle value', () => {
    const obj = { aa: { bb: { cc: 'dd' } } }
    assert.deepEqual(valueHandle(obj, 'aa[bb].cc'),'dd')

  })
})
