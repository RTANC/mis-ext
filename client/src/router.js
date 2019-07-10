import Vue from 'vue'
import Router from 'vue-router'
import Task from './views/Task.vue'
import Activitie from './views/Activitie.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Task',
      component: Task,
    },
    {
      path: 'mis-ext/Task/:taskId/Activitie',
      name: 'Activitie',
      component: Activitie,
    }
  ]
})
