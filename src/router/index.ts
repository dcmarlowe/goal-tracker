import { createRouter, createWebHistory } from 'vue-router'
import DailyGoals from '../views/DailyGoals.vue';
import Projects from '../views/Projects.vue';
import Tasks from '../views/Tasks.vue';
import TasksAndProjects from '../views/TasksAndProjects.vue';
import WeeklyGoals from '../views/WeeklyGoals.vue';

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
      path: '/tasks-and-projects',
      name: 'tasks-and-projects',
      component: TasksAndProjects
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/weekly-goals',
      name: 'WeeklyGoals',
      component: WeeklyGoals
    }
  ]
});

export default router
