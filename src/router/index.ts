import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '@/views/Home.vue'
import PersonalCenter from '@/views/PersonalCenter.vue'
import Editor from '@/views/editor/Editor.vue'

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
  history: createWebHistory("/demo/editorV2/"),
  routes
})

export default router
