import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/songlist'
  },
  {
    name: 'Home',
    path: '/home',
    component: () => import('@renderer/page/Home/index.vue'),
    meta: {}
  },
  {
    name: 'SearchResult',
    path: '/searchresult/:keyword',
    component: () => import('@renderer/page/SearchResult/index.vue'),
    meta: {}
  },
  {
    name: 'SongList',
    path: '/songlist',
    component: () => import('@renderer/page/SongList/index.vue'),
    meta: {}
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
})

export default router
