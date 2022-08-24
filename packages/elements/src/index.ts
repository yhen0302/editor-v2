import RectShape from './components/shape/RectShape.vue'
import RoundedRectShape from './components/shape/RoundedRectShape.vue'
import CircleShape from './components/shape/CircleShape.vue'
import TriangleShape from './components/shape/TriangleShape.vue'
import ImageMedia from './components/media/ImageMedia.vue'
import VideoMedia from './components/media/VideoMedia.vue'
import BigTitle from './components/text/BigTitle.vue'
import SmallTitle from './components/text/SmallTitle.vue'
import BaseTitle from './components/text/BaseTitle.vue'
import TextContent from './components/text/TextContent.vue'
import ChartBar from './components/chart/ChartBar.vue'
import ChartLine from './components/chart/ChartLine.vue'
import ChartPie from './components/chart/ChartPie.vue'
import ChartGauge from './components/chart/ChartGauge.vue'
import ChartCurve from './components/chart/ChartCurve.vue'
import ChartRadar from './components/chart/ChartRadar.vue'
import ChartScatter from './components/chart/ChartScatter.vue'
import BaseTable from './components/table/BaseTable.vue'
import ChartPolarBar from './components/chart/ChartPolarBar.vue'
import ChartMultiPolarBar from './components/chart/ChartMultiPolarBar.vue'
import ChartMultiGauge from './components/chart/ChartMultiGauge.vue'


import { App } from 'vue'

export default {
  install(app: App) {
    app.component(RectShape.name, RectShape)
    app.component(RoundedRectShape.name, RoundedRectShape)
    app.component(CircleShape.name, CircleShape)
    app.component(TriangleShape.name, TriangleShape)
    app.component(ImageMedia.name, ImageMedia)
    app.component(VideoMedia.name, VideoMedia)
    app.component(BigTitle.name, BigTitle)
    app.component(SmallTitle.name, SmallTitle)
    app.component(BaseTitle.name, BaseTitle)
    app.component(TextContent.name, TextContent)
    app.component(ChartBar.name, ChartBar)
    app.component(ChartLine.name, ChartLine)
    app.component(ChartPie.name, ChartPie)
    app.component(ChartGauge.name, ChartGauge)
    app.component(ChartCurve.name, ChartCurve)
    app.component(BaseTable.name, BaseTable)
    app.component(ChartRadar.name, ChartRadar)
    app.component(ChartScatter.name, ChartScatter)
    app.component(ChartPolarBar.name,ChartPolarBar)
    app.component('ChartYCategoryBar',ChartBar)
    app.component(ChartMultiPolarBar.name,ChartMultiPolarBar)
    app.component(ChartMultiGauge.name,ChartMultiGauge)
  }
}

export { RectShape }
export { RoundedRectShape }
export { CircleShape }
export { TriangleShape }
export { ImageMedia }
export { VideoMedia }
export { BigTitle }
export { SmallTitle }
export { BaseTitle }
export { TextContent }
export { ChartBar }
export { ChartLine }
export { ChartPie }
export { ChartGauge }
export { ChartCurve }
export { BaseTable }
export {ChartPolarBar}
