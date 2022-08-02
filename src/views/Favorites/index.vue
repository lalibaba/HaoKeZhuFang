<template>
  <div>
    <van-nav-bar
      title="我的收藏"
      left-arrow
      @click-left="$router.push('/Layout/My')"
    />
    <house :houseList="List"></house>
  </div>
</template>

<script>
import { favoritesAPI } from "@/api";
import house from "@/components/house";
export default {
  name: "Favorites",
  data() {
    return {
      List: [],
    };
  },
  components: {
    house,
  },
  methods: {
    async getFavoritesAPI() {
      this.$toast.loading("正在加载");
      try {
        const res = await favoritesAPI(this.$store.state.tokenObj.token);
        // console.log(res.data.body);
        this.List = res.data.body;
        this.$toast.success("加载成功");
      } catch (e) {
        console.log(e);
        this.$toast.fail("请重新刷新");
      }
    },
  },
  mounted() {
    this.getFavoritesAPI();
  },
};
</script>

<style scoped>
:deep(.van-nav-bar) {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-icon-arrow-left) {
  color: #fff;
}
:deep(.van-nav-bar__content) {
  background: #21b97a;
}
:deep(.van-nav-bar__title) {
  color: #fff;
}
</style>
