import {createApp} from 'vue'
import './style.css'
import elementInstaller from './index'
import {Component} from "@vue/runtime-core";


// const app = createApp(App)

// app.use(elementInstaller)
// app.mount('#app')


export default function parse(root:Component,config: any) {
    const app = createApp(root, config)
    app.use(elementInstaller)
    app.mount('#app')
  
    return app
}