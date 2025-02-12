import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // name: 'Layout',
      redirect: '/home',
      component: () => import('@/layouts/default/index.vue'),
      children: [
        {
          path: '/home',
          name: 'Layout',
          component: () => import('@/views/home/index.vue'),
        },
      ],
    },
  ],
})

export default router
