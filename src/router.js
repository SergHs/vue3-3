import { createRouter, createWebHistory } from 'vue-router'
import Tasks from './views/Tasks'
import Task from './views/Task'
import New from './views/New'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/tasks', component: Tasks, alias: '/' },
    { path: '/task/:taskId?', component: Task, props: true },
    { path: '/new', component: New }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
router.afterEach((to, from) => {

})
export default router
