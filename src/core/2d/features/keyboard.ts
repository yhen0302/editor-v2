import { deleteNodeHandle, keyboardHandle, marshalling2dNodesHandle } from '@/core/2d/features/hotKeyHandle'

export interface SpecialKeySign {
  ctrl: boolean
  alt: boolean
  shift: boolean
}
let currentHotKey: hotKeyMap[keyof hotKeyMap] | undefined
// eslint-disable-next-line @typescript-eslint/ban-types
export type hotKeyMap = { [key in string]: { effect: Function; keySet: Set<string> } }
export const hotKeyMap: hotKeyMap = {
  'delete 2d nodes.': { effect: deleteNodeHandle, keySet: new Set(['delete']) },
  'marshalling 2d nodes.': { effect: marshalling2dNodesHandle, keySet: new Set(['ctrl', 'g']) }
}

document.addEventListener('keydown', (ev) => {
  const specialKeySign: SpecialKeySign = { ctrl: ev.ctrlKey, alt: ev.altKey, shift: ev.shiftKey }
  const verifyRes = verifyClashHotKeyWithBrowser(ev, specialKeySign)
  if (verifyRes) {
    currentHotKey = verifyRes as hotKeyMap[keyof hotKeyMap]
    ev.preventDefault()
    ev.stopPropagation()
  }
})

document.addEventListener('keyup', (ev) => {
  const specialKeySign: SpecialKeySign = { ctrl: ev.ctrlKey, alt: ev.altKey, shift: ev.shiftKey }
  if (currentHotKey) keyboardHandle(currentHotKey)
  currentHotKey = void 0
})

function verifyClashHotKeyWithBrowser(ev: KeyboardEvent, specialKeySign: SpecialKeySign): boolean | hotKeyMap[keyof hotKeyMap] {
  const keys = new Set([<string>ev.key.toLocaleLowerCase()])
  for (const key in specialKeySign) {
    if (specialKeySign[key as keyof typeof specialKeySign]) keys.add(key)
  }
  for (const hotKey in hotKeyMap) {
    const v = hotKeyMap[hotKey as keyof typeof hotKeyMap]
    let flag = true
    for (const key of v.keySet) {
      if (!keys.has(key)) {
        flag = false
        break
      }
    }
    if (flag) return v
  }
  return false
}
