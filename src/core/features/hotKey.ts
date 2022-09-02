import createPreviewTemplate from '../utils/createPreviewTemplate'
import htmlToUrl from '../utils/htmlToUrl'
import { getAvailablePageTreeNodes } from './hotKeyShare'
import store from '../../store'

export const globalHotKeyMap ={
  'preview.': { effect: previewHandle, keySet: new Set(['ctrl','p']) },
}


// handle
export async function previewHandle() {
  // const sdk = await (await fetch('/sdk/index.js')).text()
  // const sdk3d = await (await fetch('/static/main.js')).text()

  const html = createPreviewTemplate(
    `console.log(EDITOR_SDK(${JSON.stringify({
      pageTreeNodes: getAvailablePageTreeNodes(),
      drawingBoard: store.state.drawingBoard
    })}))`
  )
  window.open(htmlToUrl(html))
}

