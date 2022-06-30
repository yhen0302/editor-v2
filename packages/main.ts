import Vue from 'vue'
import elementsPlugin from './elements/index'
import ElementParser from './elements/ElementParser.vue'

export default function parse(){
  const app = Vue.createApp(ElementParser)
  app.use(elementsPlugin)
}

