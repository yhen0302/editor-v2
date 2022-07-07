import {createApp} from 'vue'
import './style.css'
import elementInstaller from './index'
import ElementParser from './components/ElementParser.vue'


// const app = createApp(App)

// app.use(elementInstaller)
// app.mount('#app')


export default function parse(config: any) {
    const app = createApp(ElementParser, config)
    app.use(elementInstaller)
    app.directive('drag',{})
    app.mount('#app')
  
    return app
}