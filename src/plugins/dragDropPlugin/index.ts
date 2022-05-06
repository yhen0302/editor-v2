import {App} from "vue";
import dragable from "../../directive/dragable";
import dropable from "../../directive/dropable";

export default {
  install(app: App, option: any) {
    app.directive('dragable',dragable)
    app.directive('dropable',dropable)
  }
}