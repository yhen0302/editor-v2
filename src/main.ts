import { computed, createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dragDropPlugin from './plugins/dragDropPlugin'
import dragPlugin from '@/plugins/dragPlugin'
// @ts-ignore
import elementInstaller from '@editor-v2/elements'
import layerPlugin from '@/plugins/layerPlugin/index'
import ColorPickerGradient from 'vue3-color-picker-gradient'
// 快捷键
import '@/core/2d/features/keyboard'
import '@/core/2d/features/contextmenu'

// 导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/tailwind.css'
import './assets/css/base.css'

const scale = computed(() => store.state.drawingBoard.scale)
createApp(App)
  .use(store)
  .use(ElementPlus)
  .use(router)
  .use(dragDropPlugin)
  .use(dragPlugin, {
    updateRectProcessFn(rect, isMulti) {
      if (isMulti) {
        const board = document.querySelector('.art-board-content')
        const boardRect = board!.getBoundingClientRect()
        rect.width /= scale.value
        rect.height /= scale.value
        rect.top = -(boardRect.top - rect.top) / scale.value
        rect.left = -(boardRect.left - rect.left) / scale.value
      }
      return rect
    }
  })
  .use(elementInstaller)
  .use(layerPlugin)
  .use(ColorPickerGradient)
  .mount('#app')
