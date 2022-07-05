import { createApp } from 'vue'
import elementsPlugin from './elements/index'
import '../src/assets/css/base.css'
import '../src/assets/css/tailwind.css'

import ElementParser from './elements/ElementParser.vue'

export default function parse(config: any) {
  const app = createApp(ElementParser, config)
  app.use(elementsPlugin)
  app.mount('#app')

  return app
}
