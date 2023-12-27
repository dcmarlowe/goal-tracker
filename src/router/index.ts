import { createRouter, createWebHistory } from 'vue-router'
import DailyGoals from '../views/DailyGoals.vue';
import Projects from '../views/Projects.vue';
import Tasks from '../views/Tasks.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DailyGoals
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    }
  ]
});

export default router
