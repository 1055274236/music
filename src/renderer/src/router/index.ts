import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/rankingdetails/4'
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
  // {
  //   name: 'SongLists',
  //   path: '/songlists',
  //   component: () => import('@renderer/page/SongLists/index.vue'),
  //   meta: {}
  // },
  {
    name: 'SongListDetails',
    path: '/songlistdetails/:disstid',
    component: () => import('@renderer/page/SongListDetails/index.vue'),
    meta: {}
  },
  {
    name: 'RankingDetails',
    path: '/rankingdetails/:topid',
    component: () => import('@renderer/page/RankingDetails/index.vue'),
    meta: {}
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
})

export default router
