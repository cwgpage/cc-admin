import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home/analytics',
      // component: () => import('@/layouts/default/index.vue'),
      children: [
        /* ************* 概览 ************* */
        {
          path: '/home/analytics',
          component: () => import('@/views/home/analytics/index.vue'),
          meta: {
            title: '分析页',
          },
        },
        {
          path: '/home/workspace',
          component: () => import('@/views/home/analytics/index.vue'),
          meta: {
            title: '工作台',
          },
        },
        /* ************* 盲盒 ************* */
        {
          path: '/blindBox/qwcw/boxList',
          component: () => import('@/views/blindBox/qwcw/boxList/index.vue'),
          meta: {
            title: '趣玩潮玩-盲盒列表',
          },
        },
        {
          path: '/blindBox/qwcw/boxDetail',
          component: () => import('@/views/blindBox/qwcw/boxDetail/index.vue'),
          meta: {
            title: '趣玩潮玩-盲盒详情',
          },
        },

        /* ************* 示例 ************* */
        {
          path: '/home/analytics',
          component: () => import('@/views/home/analytics/index.vue'),
          meta: {
            title: '分析页',
          },
        },
      ],
    },
  ],
})

export default router
