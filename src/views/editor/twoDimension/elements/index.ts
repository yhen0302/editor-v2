import RectShape from './shape/RectShape.vue'
import { App } from 'vue'

export const elementComponentsMap = {
  rect: RectShape
} as { [key: string]: any }

export default {
  install(app: App) {
    app.component('RectShape', RectShape)
  }
}

export { RectShape }
