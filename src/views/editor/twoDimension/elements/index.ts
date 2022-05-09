import RectShape from './shape/RectShape.vue'
import {App} from "vue";

export default {
    install(app: App) {
        app.component("RectShape", RectShape)
    }
}

export {RectShape}