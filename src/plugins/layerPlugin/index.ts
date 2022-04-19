import LayerList from "./LayerList.vue";
import {App} from "vue";

export default {
  install(app: App, option: any) {
    app.component('layer-list', LayerList)
  }
}