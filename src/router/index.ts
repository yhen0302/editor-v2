import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import PersonalCenter from '@/views/PersonalCenter.vue'
import Editor from '@/views/Editor.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/PersonalCenter',
    name: 'PersonalCenter',
    component: PersonalCenter
  },
  {
    path: '/',
    name: 'Editor',
    component: Editor
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
