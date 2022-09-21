import createPreviewTemplate from '../utils/createPreviewTemplate'
import htmlToUrl from '../utils/htmlToUrl'
import { getAvailableSceneTreeNodes } from './hotKeyShare'
import store from '../../store'
import { useState } from '@/store/helper'

export const globalHotKeyMap = {
  'preview.': { effect: previewHandle, keySet: new Set(['ctrl', 'p']) }
}

// handle
export async function previewHandle() {
  // const sdk = await (await fetch('/sdk/index.js')).text()
  // const sdk3d = await (await fetch('/static/main.js')).text()

  const stateGlobal = useState(store, 'global')
  const state3D = useState(store, '3d')
  const container = state3D.threeDimensionContainer

  const html = createPreviewTemplate(
    `console.log(EDITOR_SDK(${JSON.stringify({
      sceneTreeNodes: getAvailableSceneTreeNodes(),
      drawingBoard: stateGlobal.drawingBoard,
      modelUrls: container.attrs.modelUrls
    })}))`
  )
  window.open(htmlToUrl(html))
}
