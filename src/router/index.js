import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Search from '@/views/Search'
import Play from '@/views/Play'

Vue.use(VueRouter)

//配置规则

const routes = [
  {
    path: '/',
    redirect: '/Layout',
  },
  {
    path: '/Layout',
    component: Layout,
    redirect: '/Layout/Home',
    children: [
      {
        path: 'Home',
        component: Home,
        meta: {
          title: '首页',
        },
      },
      {
        path: 'Search',
        component: Search,
        meta: {
          title: '搜索',
        },
      },
    ],
  },
  {
    path: '/Play',
    component: Play,
  },
]

//创建路由器

export default new VueRouter({
  routes,
  mode: 'history',
})
