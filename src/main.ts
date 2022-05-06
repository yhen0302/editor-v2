import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
import "./assets/css/tailwind.css"
import "./assets/css/base.css"
import layerPlugin from './plugins/layerPlugin'
import dragDropPlugin from './plugins/dragDropPlugin'


createApp(App).use(store).use(layerPlugin).use(router).use(dragDropPlugin).mount('#app')
