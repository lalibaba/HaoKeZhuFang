<template>
  <div style="padding-bottom: 50px">
    <!-- <van-nav-bar :title="$route.meta.title" /> -->

    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/Layout/Home">
        <p class="iconfont icon-ind"></p>
        <p>首页</p></van-tabbar-item
      >
      <van-tabbar-item to="/Layout/Search"
        ><p class="iconfont icon-findHouse"></p>
        <p>找房</p></van-tabbar-item
      >
      <van-tabbar-item to="/Layout/Inform"
        ><p class="iconfont icon-infom"></p>
        <p>资讯</p></van-tabbar-item
      >
      <van-tabbar-item to="/Layout/My"
        ><p class="iconfont icon-my"></p>
        <p>我的</p>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // active: 0,
    };
  },
  methods: {},
};
</script>

<style scoped>
.iconfont {
  text-align: center;
  font-size: 20px;
}
</style>
