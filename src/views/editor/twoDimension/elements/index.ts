import RectShape from './shape/RectShape.vue'
import RoundedRectShape from './shape/RoundedRectShape.vue'
import CircleShape from './shape/CircleShape.vue'
import TriangleShape from './shape/TriangleShape.vue'
import ImageMedia from './media/ImageMedia.vue'
import VideoMedia from './media/VideoMedia.vue'
import BigTitle from './text/BigTitle.vue'

import { App } from 'vue'

export default {
  install(app: App) {
    app.component('RectShape', RectShape)
    app.component('RoundedRectShape', RoundedRectShape)
    app.component('CircleShape', CircleShape)
    app.component('TriangleShape', TriangleShape)
    app.component('ImageMedia', ImageMedia)
    app.component('VideoMedia', VideoMedia)
    app.component('BigTitle', BigTitle)

  }
}

export { RectShape }
