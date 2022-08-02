import Vue from "vue";
import VueRouter from "vue-router";
// 引入组件
import Layout from "@/views/Layout";
import Home from "@/views/Home";
import Search from "@/views/Search";
import City from "@/views/City";
import Inform from "@/views/Inform";
import My from "@/views/My";
import Login from "@/views/Login";
import Registered from "@/views/Registered";
import Favorites from "@/views/Favorites";

Vue.use(VueRouter);

//配置规则

const routes = [
  {
    path: "/",
    redirect: "/Layout",
  },
  {
    path: "/Layout",
    component: Layout,
    redirect: "/Layout/Home",
    children: [
      {
        path: "Home",
        component: Home,
        meta: {
          title: "首页",
        },
      },
      {
        path: "Search",
        component: Search,
        meta: {
          title: "搜索",
        },
      },
      {
        path: "Inform",
        component: Inform,
        meta: {
          title: "资讯",
        },
      },
      {
        path: "My",
        component: My,
        meta: {
          title: "我的",
        },
      },
    ],
  },
  {
    path: "/City",
    component: City,
  },
  {
    path: "/Login",
    component: Login,
  },
  {
    path: "/Registered",
    component: Registered,
  },
  {
    path: "/Favorites",
    component: Favorites,
  },
];

//创建路由器

export default new VueRouter({
  routes,
  // mode: 'history',
});
