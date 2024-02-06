// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ProjectDetailPage from '@/views/ProjectDetailPage.vue';
import NewTaskPage from '@/views/NewTaskPage.vue';
import NewProjectPage from '@/views/NewProjectPage.vue';
import EditProjectPage from  '@/views/EditProjectPage.vue';
import EditTaskPage from  '@/views/EditTaskPage.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/project/:id', name: 'ProjectDetail', component: ProjectDetailPage },
  { path: '/new-task/:id', name: 'NewTask', component: NewTaskPage },
  { path: '/new-project', name: 'NewProject', component: NewProjectPage },
  { path: '/edit-project/:id', name: 'EditProject', component: EditProjectPage },
  { path: '/edit-task/:projectId/:taskId', name: 'EditTask', component: EditTaskPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
