import { createApp } from 'vue'
import '@editor-v2/elements/src/style.css'
import elementInstaller from '@editor-v2/elements'
import ElementParser from './components/ElementParser.vue'
import createRouterOfScenesTree from './feature/createRouterOfScenesTree'
import './css/base.css'

// const app = createApp(App)

// app.use(elementInstaller)
// app.mount('#app')

export default function parse(config: any) {
  const router = createRouterOfScenesTree(config.sceneTreeNodes)
  const app = createApp(ElementParser, config)
  app.use(elementInstaller)
  app.directive('drag', {})
  app.mount('#app')
  return app
}
