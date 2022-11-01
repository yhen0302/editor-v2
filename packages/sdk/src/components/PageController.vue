<template>
  <div class="page-controller">
    <div class="scenes-box" @click="showScenesList = !showScenesList">
      <span class="cur-scenes">{{ curScenesRoute.meta.name }}</span>
      <i class="triangle" :class="{ active: showScenesList }" />
      <ul class="scenes-list" v-show="showScenesList">
        <li class="scenes-item" v-for="item in scenesNodes" :class="{ active: item.name === curScenesRoute.meta.name }" :key="item.uuid" @click.stop="checkScenes(item)">{{ item.meta.name }}</li>
      </ul>
    </div>
    <div class="split-line"></div>
    <div class="page-box">
      <i class="arrow-left" @click="decrementPage(curPage)" />
      <p class="page-info">
        <span class="cur-page">{{ curPage }}</span>
        <span>/</span>
        <span class="cur-page">{{ curScenesRoute.children.length }}</span>
      </p>
      <i class="arrow-right" @click="incrementPage(curPage)" />
    </div>
    <div class="split-line"></div>
    <div class="util-box"></div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import createRouterOfScenesTree, { getScenePageIndexByRoute } from '../feature/createRouterOfScenesTree'
import useScenesRouter from '../feature/scenesRouter'

export default {
  name: 'PageController',
  setup() {
    const [router, currentRoute] = useScenesRouter()
    const scenesNodes = computed(() => {
      const routes = router.getRoutes()
      return routes.filter((item) => /\/\d+[/]?$/.test(item.path))
    })
    const findRouteByPath = (path) => router.getRoutes().find((item) => item.path === path)
    const curScenesRoute = computed(() => {
      const [parent] = getScenePageIndexByRoute(currentRoute.value)
      return findRouteByPath(`/${parent}`)
    })

    const curPage = computed({
      get() {
        const [parent, pageIndex] = getScenePageIndexByRoute(currentRoute.value)
        return pageIndex + 1
      },
      set(newVal) {
        // jump router
        router.push(`${curScenesRoute.value.path}/${curScenesRoute.value.children[newVal - 1].path}`)
      }
    })
    const showScenesList = ref(false)

    function incrementPage() {
      curPage.value < curScenesRoute.value.children.length && curPage.value++
    }

    function decrementPage() {
      curPage.value > 1 && curPage.value--
    }

    function checkScenes(scenesRoute) {
      router.push(scenesRoute.path)
      showScenesList.value = false
    }

    return {
      curScenesRoute,
      curPage,
      showScenesList,
      incrementPage,
      decrementPage,
      scenesNodes,
      checkScenes
    }
  }
}
</script>

<style scoped>
ul{
  list-style: none;
}
.page-controller {
  display: flex;
  gap: 0 20px;
  position: fixed;
  right: 50px;
  bottom: 50px;
  padding: 8px 10px;
  background: #13151c;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}

.split-line {
  border-left: 2px solid rgba(255, 255, 255, 0.2);
}

.scenes-box {
  position: relative;
  cursor: pointer;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cur-scenes {
  text-align: left;
  flex: 1;
}

.scenes-list {
  position: absolute;
  bottom: calc(100% + 8px + 1px);
  left: -10px;
  background: #13151c;
  width: 150px;
}

.scenes-item {
  box-sizing: border-box;
  text-align: left;
  padding: 5px 0;
  padding-left: 8px;
}

.scenes-item:hover {
  background: rgba(59, 130, 246, 0.8);
}

.scenes-item.active {
  background: rgba(59, 130, 246, 0.8);
}

.triangle {
  display: block;
  border: 6px solid transparent;
  transition: transform 0.2s linear;
  transform-origin: 9px center;
  border-right: 6px solid rgba(255, 255, 255, 0.7);
}

.triangle.active {
  transform: rotate(90deg);
}

.page-box {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  --arrow-color: rgba(255, 255, 255, 0.7);
}

.page-info {
  letter-spacing: 3px;
}

.arrow-left,
.arrow-right {
  width: 8px;
  height: 8px;
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid transparent;
}

.arrow-left {
  transform: rotate(-45deg);
  border-left: 1px solid var(--arrow-color);
  border-top: 1px solid var(--arrow-color);
}

.arrow-left:hover,
.arrow-right:hover {
  --arrow-color: rgba(59, 130, 246, 0.5);
}

.arrow-right {
  transform: rotate(45deg);
  border-right: 1px solid var(--arrow-color);
  border-top: 1px solid var(--arrow-color);
}
</style>
