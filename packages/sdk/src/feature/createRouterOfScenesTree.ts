import { RouteLocationNormalizedLoaded, Router, RouteRecordRaw } from 'vue-router'
import { defineComponent, Ref } from 'vue'
import useScenesRouter from './scenesRouter'
import { flatTree } from '../../../../src/share/util/base'

export function scenesNodesToRouteRecord(scenesNodes) {
  const routes: RouteRecordRaw[] = []
  let init = true
  for (const [sIndex,scenes ] of scenesNodes.entries()) {
    const scenesR: RouteRecordRaw = {
      path: '/' + sIndex,
      children: [],
      name: scenes.uuid,
      meta:{name:scenes.name},
      component: defineComponent({})
    }
    if (init) {
      routes.push({ path: '/', name: 'root', redirect: '/' + scenes.uuid })
      init = false
    }
    for (const [index,page ] of scenes.children.entries()) {
      scenesR.children!.push({
        path: sIndex+'-'+index,
        name: page.uuid,
        meta:{name:page.name},
        component: defineComponent({})
      })
    }
    routes.push(scenesR)
  }
  return routes
}

// 通过路由对象，获取场景页面的索引
export function getScenePageIndexByRoute(route:RouteLocationNormalizedLoaded){
  if (route.path === '/') return [0, 0]
  else if (route.path.split('/').length === 2) return [parseInt(route.path.split('/')[1]), 0]
  else {
    return route.path
      .split('/')[2]
      .split('-')
      .map((item) => parseInt(item))
  }
}
// 使用场景树生成路由
export default function createRouterOfScenesTree(scenesNodes): Router {
  const initRoutes = scenesNodesToRouteRecord(scenesNodes)
  const [router] = useScenesRouter(initRoutes)
  return router
}


// 获取当前页的节点
export function getCurrentPageNodes(sceneTreeNodes){
  const [router,curRoute] = useScenesRouter()
  const routeIndex = getScenePageIndexByRoute(curRoute.value)
  return flatTree(sceneTreeNodes[routeIndex[0]].children[routeIndex[1]]?.trees?.twoDimension) || []
}