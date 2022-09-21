// import { expect } from 'chai'
// import { mapActions, mapState, useGetter, useMutation } from '../../src/store/helper'

// import store from '../../src/store'

// describe('store test', () => {
//   it('store test', () => {
//     const stateTest = store.state['3d'].test

//     expect(stateTest).equals('3d')
//   })
// })

// describe('fun: mapState', () => {
//   it('fun: mapState', () => {
//     const stateTest = mapState(store, '3d', ['test'])

//     expect(stateTest['test'].value).equals('3d')
//   })
// })

// describe('fun: useMutation', () => {
//   it('fun: useMutation', () => {
//     const mutations = useMutation(store, '3d', ['TEST_CHANGE'])

//     mutations.TEST_CHANGE()

//     const stateTest = mapState(store, '3d', ['test'])

//     // console.log('ddd ddd', stateTest['test'])

//     expect(stateTest['test'].value).equals('3d1')
//   })
// })

// describe('fun: mapActions', () => {
//   it('fun: mapActions', () => {
//     const actions = mapActions(store, '3d', ['TEST_ACTIONS'])

//     actions.TEST_ACTIONS()

//     const stateTest = mapState(store, '3d', ['test'])

//     // console.log('ddd ddd ddd', stateTest['test'])

//     expect(stateTest['test'].value).equals('3d11')
//   })
// })

// describe('fun: useGetter', () => {
//   it('fun: useGetter', () => {
//     const getters = useGetter(store, '3d', ['TEST_GETTERS'])

//     const r = getters.TEST_GETTERS

//     // console.log('ddd ddd ddd  ddd', r)

//     expect(r.value).equals('3d11TEST_GETTERS')
//   })
// })
