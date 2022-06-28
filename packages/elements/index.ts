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
import ChartLine from './chart/ChartLine.vue'
import ChartPie from './chart/ChartPie.vue'
import ChartGauge from './chart/ChartGauge.vue'
import ChartCurve from './chart/ChartCurve.vue'
import { App } from 'vue'

export default {
  install(app: App) {
    app.component(RectShape.name,RectShape)
    app.component(RoundedRectShape.name,RoundedRectShape)
    app.component(CircleShape.name,CircleShape)
    app.component(TriangleShape.name,TriangleShape)
    app.component(ImageMedia.name,ImageMedia)
    app.component(VideoMedia.name,VideoMedia)
    app.component(BigTitle.name,BigTitle)
    app.component(SmallTitle.name,SmallTitle)
    app.component(BaseTitle.name,BaseTitle)
    app.component(TextContent.name,TextContent)
    app.component(ChartBar.name,ChartBar)
    app.component(ChartLine.name,ChartLine)
    app.component(ChartPie.name,ChartPie)
    app.component(ChartGauge.name,ChartGauge)
    app.component(ChartCurve.name,ChartCurve)
  }
}
