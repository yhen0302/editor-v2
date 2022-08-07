import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory('/edit'),
  routes,
})

// router.beforeEach((to,from,next)=>{
//   console.log(to,from)
//   next()
// })

export default router
