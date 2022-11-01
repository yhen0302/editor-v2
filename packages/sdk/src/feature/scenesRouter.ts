import { createMemoryHistory, createRouter, Router, RouteRecordRaw } from 'vue-router'

let router

function useScenesRouter(initRoutes?: RouteRecordRaw[]):[Router,Router["currentRoute"]] {
  if (!router) {
    router = createRouter({ history: createMemoryHistory(), routes: initRoutes || [] })
  } else if (initRoutes) {
    console.warn('sorry, scenes router has been initialization.')
  }
  return [router, router.currentRoute]
}


export default useScenesRouter
