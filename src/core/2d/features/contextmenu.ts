import store from '@/store'
import { useState } from '@/store/helper'

const stateGlobal = useState(store, 'global')

document.addEventListener('contextmenu', function (ev) {
  if (stateGlobal.dimensionType == '3d') return
  stateGlobal.contextmenu.show = true
  stateGlobal.contextmenu.x = ev.pageX
  stateGlobal.contextmenu.y = ev.pageY
})

document.addEventListener('click', function () {
  if (stateGlobal.dimensionType == '3d') return
  stateGlobal.contextmenu.show = false
})
