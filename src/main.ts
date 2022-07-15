import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dragDropPlugin from './plugins/dragDropPlugin'
import dragPlugin from '@/plugins/dragPlugin'
// @ts-ignore
import elementInstaller from "@editor-v2/elements"
import layerPlugin from '@/plugins/layerPlugin/index'

// 快捷键
import '@/core/2d/features/keyboard'
import '@/core/2d/features/contextmenu'


// 导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/tailwind.css'
import './assets/css/base.css'


createApp(App).use(store).use(ElementPlus).use(router).use(dragDropPlugin).use(dragPlugin).use(elementInstaller).use(layerPlugin).mount('#app')
