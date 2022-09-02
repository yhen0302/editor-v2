import { createStore } from 'vuex'
import { default as mutations2d } from '@/store/2d/mutations'
import { default as getters2d } from '@/store/2d/getters'

const _clipboard: any[] = []
export default createStore({
  state: {
    dimensionType: '2d', // 2D/3D
    selectBarToolType: '', // 左边工具栏选择类型
    selectedSceneTreeNode: null, // 右边选中的scene tree node
    selectedPageTreeNode: null, // 右边选中的page tree node
    addDragging: false, // 当前是否是处于添加二维元素状态
    pageTreeNodes: [
      // 页面树
      {
        name: '场景1',
        type: 'scene',
        selected: true,
        spread: true,
        uuid: '0',
        children: [
          {
            name: '页1',
            type: 'page',
            selected: true,
            parent: '0',
            uuid: '0-0',
            trees: {} // 见上方注释
          }
        ]
      }
    ],
    select2dNodes: new Set(),
    drawingBoard: {
      // 中间画布宽高
      width: 1920,
      height: 1080,
      scale: .7
    },
    template: {
      // 模板缓存
      threeDimension: [],
      twoDimension: []
    },
    threeDimensionContainer: null, // 3d container cache
    contextmenu: {
      show: false,
      x: 0,
      y: 0
    }, // 判断菜单的显示隐藏
    // 导入配置监听变量
    exportType: false,
    exportContent: null,

    //  添加元素变量
    addElementType: null,
    elementScaleInterval: {}, // 存储模型包围盒尺寸
    elementFlyLine: [], // 存储飞线数组
    elementClick: null,
    // 剪贴板
    get clipboard() {
      return _clipboard
    },
    set clipboard(val: any) {
      _clipboard.unshift(val)
      if (_clipboard.length > 20) {
        _clipboard.pop()
      }
    }
    // \剪贴板
  } as any,
  mutations: { ...mutations2d },
  actions: {},
  getters: { ...getters2d },
  modules: {}
})
