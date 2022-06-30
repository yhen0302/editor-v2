import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dragDropPlugin from './plugins/dragDropPlugin'
import dragPlugin from '@/plugins/dragPlugin'
import elementInstaller from "@/components/2d/elements/index"
import layerPlugin from '@/plugins/layerPlugin/index'

import './assets/css/tailwind.css'
import './assets/css/base.css'

createApp(App).use(store).use(router).use(dragDropPlugin).use(dragPlugin).use(elementInstaller).use(layerPlugin).mount('#app')
