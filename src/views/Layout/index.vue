<template>
  <div style="padding-bottom: 50px">
    <van-nav-bar :title="$route.meta.title" />

    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item replace to="/Layout/Home" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/Layout/Search" icon="search"
        >搜索</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // active: 0,
    }
  },
  methods: {},
}
</script>

<style scoped></style>
