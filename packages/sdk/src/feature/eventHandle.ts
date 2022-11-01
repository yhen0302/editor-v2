import useScenesRouter from './scenesRouter'
import { toPx } from '../../../../src/share/util/base'
import { toRaw } from 'vue'

const eventMap = {
  linkToPage,
  linkToExternal,
  nodeTransform
}
export default function(eventType, item, sceneTreeNodes, nodes) {
  const eventList = item.option.emitters || []
  for (const e of eventList) {
    if (eventType === e.eventType) {
      eventMap[e.eventAction].call(null, e.effect, sceneTreeNodes, nodes)
    }
  }
}

function linkToPage(effect) {
  const [router] = useScenesRouter()
  const routes = router.getRoutes()
  const tRoute = routes.find((item) => item.name === effect.pageId)
  tRoute && router.push(tRoute.path)
}

function linkToExternal(effect) {
  window.open(effect.url)
}

function nodeTransform(effect, sceneTreeNodes, nodes) {
  for (const key in effect) {
    switch (key) {
      case '2d':
        nodeTransform2dHandle(effect[key], nodes)
    }
  }
}

function nodeTransform2dHandle(effectList, nodeListProxy) {
  const effectSet = new Set<any>(toRaw(effectList))
  for (const [index, node] of toRaw(nodeListProxy).entries()) {
    for (const item of effectSet) {
      if (item.id === node.id) {
        transformNode(nodeListProxy[index], item.parameter)
        effectSet.delete(item)
      }
    }
  }
}


function transformNode(node, transformParams) {
  console.log(transformParams)
  const getShow = (node, toggleType) => {
    switch (toggleType) {
      case'SHOW':
        return true
      case'HIDE':
        return false
      case'TOGGLE':
        return !node.show
    }
  }

  const animationStyle: any = {
    transition: `all ${transformParams.animationDuration}ms linear`
  };
  ['width', 'height', 'left', 'top'].forEach(key => {
    if (transformParams[key] === null) return
    animationStyle[key] = toPx(transformParams[key])
  });
  ['rotate', 'scale'].forEach(key => {
    if (transformParams[key] === null) return
    animationStyle['transform'] = animationStyle['transform'] || ''
    switch (key) {
      case 'rotate':
        animationStyle['transform'] += `rotate(${transformParams[key]}deg) `
        return
      case 'scale':
        animationStyle['transform'] += `scale(${transformParams[key]}) `
    }
  });
  // 显隐切换
  if (transformParams.toggleType !== null){
    node.show = getShow(node, transformParams.toggleType)
    if (node.show) {
      animationStyle.opacity = 1
      if (!node.lock) animationStyle.pointerEvents = 'auto'
    } else {
      animationStyle.opacity = 0
      animationStyle.pointerEvents = 'none'
    }
  }
  node.option.animationStyle = Object.assign(node.option.animationStyle || {}, animationStyle)
}