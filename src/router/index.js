import { createRouter, createWebHashHistory } from 'vue-router'

import layout from '../layout/index.vue'

// alwaysShow: true

const routes = [
  {
    path: '/login',
    component: () => import('@/view/login/index.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/view/404.vue'),
    hidden: true
  },
  { path: '/:catchAll(.*)', redirect: '/404', hidden: true },
  {
    path: '/',
    component: layout,
    name:"layout",
    redirect: '/home',
    alwaysShow: true,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/view/home/index.vue'),
        meta: { title: '首页1', icon: 'HomeFilled' }
      },
      {
        path: '/about',
        name: 'about',
        meta: { title: '副业2', icon: 'Avatar' },
        component: () => import('@/view/about/index.vue')
      }
    ]
  },
  {
    path: '/list',
    component: layout,
    redirect: '/item1',
    meta: { title: '多级目录', icon: 'Collection' },
    children: [
      {
        path: '/item1',
        name: 'item1',
        meta: { title: '副业1', icon: 'Avatar' },
        component: () => import('@/view/list/item1.vue')
      },
      {
        path: '/item2',
        name: 'item2',
        meta: { title: '副业22', icon: 'Avatar' },
        component: () => import('@/view/list/item2.vue')
      },
      {
        path: '/list1',
        name: 'list1',
        meta: { title: '多级目录2', icon: 'Avatar' },
        component: () => import('@/view/list/list1/test1-1.vue')
      }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
