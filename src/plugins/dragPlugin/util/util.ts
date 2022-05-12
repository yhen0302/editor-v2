export interface PxTargetObject {
  [key: string]: string | number
}

export function toPx(target: number | PxTargetObject): string | PxTargetObject {
  const cssUnitRE = /^\d+(px|rem|em|vh|vw|%|cm|mm)$/
  if (typeof target === 'number') {
    return target + 'px'
  } else if (typeof target === 'object') {
    const result: PxTargetObject = Object.assign({}, target)
    const excludeStyleKey = ['zoom', 'opacity', 'zIndex']
    for (const key of Object.keys(target)) {
      if (!excludeStyleKey.includes(key)) {
        if (!cssUnitRE.test(target[key].toString())) {
          result[key] = target[key] + 'px'
        }
      }
    }
    return result
  } else {
    return target
  }
}

export function cssUnitToNumber(target: string) {
  const cssUnitRE = /^\d+(px|rem|em|vh|vw|%|cm|mm)$/
  return cssUnitRE.test(target) ? parseInt(target) : 0
}

export function getCss(el: HTMLElement, css: keyof CSSStyleDeclaration): CSSStyleDeclaration[keyof CSSStyleDeclaration] {
  return window.getComputedStyle(el)[css]
}

export function findParentPathHasEl(target: HTMLElement | null, el: HTMLElement | null): boolean {
  do {
    if (target === el) return true
    // eslint-disable-next-line no-cond-assign
  } while (target = target?.parentElement || null);

  return false
}

// 防抖。
// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce<T extends Function>(targetFn: T, delay: number, ctx?: any): Function {
  let timer: number | null = null
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    timer = setTimeout(targetFn.bind(ctx, ...args), delay)
  }
}

export function computedElementsRect(els: HTMLElement[]) {
  const leftNumSet: Set<number> = new Set<number>(),
    rightNumSet: Set<number> = new Set<number>(),
    topNumSet: Set<number> = new Set<number>(),
    bottomNumSet: Set<number> = new Set<number>()
  for (const el of els) {
    const {left, right, bottom, top} = el.getBoundingClientRect()
    leftNumSet.add(left)
    rightNumSet.add(right)
    topNumSet.add(top)
    bottomNumSet.add(bottom)
  }
  const left = Math.min(...leftNumSet),
    right = Math.max(...rightNumSet),
    top = Math.min(...topNumSet),
    bottom = Math.max(...bottomNumSet)

  return {
    left, right, top, bottom,
    width: right - left,
    height: bottom - top
  }
}