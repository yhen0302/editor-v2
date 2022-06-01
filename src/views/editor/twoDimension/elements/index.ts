import RectShape from './shape/RectShape.vue'
import RoundedRectShape from './shape/RoundedRectShape.vue'
import CircleShape from './shape/CircleShape.vue'
import TriangleShape from './shape/TriangleShape.vue'
import ImageMedia from './media/ImageMedia.vue'
import VideoMedia from './media/VideoMedia.vue'
import BigTitle from './text/BigTitle.vue'
import SmallTitle from './text/SmallTitle.vue'
import BaseTitle from './text/BaseTitle.vue'
import TextContent from './text/TextContent.vue'
import ChartBar from './chart/ChartBar.vue'
import ChartLine from './chart/CharLine.vue'

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
    app.component('SmallTitle', SmallTitle)
    app.component('BaseTitle', BaseTitle)
    app.component('TextContent', TextContent)
    app.component('ChartBar', ChartBar)
    app.component('ChartLine', ChartLine)
  }
}

export { RectShape }
