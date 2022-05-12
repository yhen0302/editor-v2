import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
import './assets/css/tailwind.css'
import './assets/css/base.css'
import layerPlugin from './plugins/layerPlugin'
import dragDropPlugin from './plugins/dragDropPlugin'
import dragPlugin from "@/plugins/dragPlugin";
import elementsInstaller from '@/views/editor/twoDimension/elements'



createApp(App).use(store).use(router).use(dragDropPlugin).use(elementsInstaller).use(dragPlugin).use(layerPlugin).mount('#app')
