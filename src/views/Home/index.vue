<template>
  <div>
    <div class="bannel">
      <!-- 搜索 -->
      <div class="top">
        <div class="add" @click="addfn">{{ currentCity }}</div>
        <i class="iconfont icon-arrow"></i>
        <i class="iconfont icon-seach"></i>
        <input type="text" name="" id="" placeholder="请输入小区或地址" />
        <i class="iconfont icon-map"></i>
      </div>
      <van-swipe :autoplay="1000">
        <van-swipe-item
          style="height: 212px"
          v-for="(item, index) in swiperlist"
          :key="index"
        >
          <img
            style="width: 100%"
            v-lazy="'http://liufusong.top:8080' + item.imgSrc"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 租房list -->
    <van-grid :border="false" :column-num="4" style="overflow: hidden">
      <van-grid-item @click="findfn">
        <van-image width="40px" height="40px" :src="img[0]" />
        <div style="font-size: 14px; padding-top: 10px">
          <p>整租</p>
        </div>
      </van-grid-item>
      <van-grid-item @click="findfn">
        <van-image width="40px" height="40px" :src="img[1]" />
        <div style="font-size: 14px; padding-top: 10px">
          <p>合租</p>
        </div>
      </van-grid-item>
      <van-grid-item>
        <van-image width="40px" height="40px" :src="img[2]" />
        <div style="font-size: 14px; padding-top: 10px">
          <p>地图找房</p>
        </div>
      </van-grid-item>
      <van-grid-item>
        <van-image width="40px" height="40px" :src="img[3]" />
        <div style="font-size: 14px; padding-top: 10px">
          <p>去出租</p>
        </div>
      </van-grid-item>
    </van-grid>

    <div class="title" style="display: flex; justify-content: space-between">
      <p>租房小组</p>
      <p>更多</p>
    </div>
    <van-grid :gutter="10" direction="horizontal" :column-num="2">
      <van-grid-item v-for="(item, index) in groupslist" :key="index"
        ><van-image
          width="40px"
          height="40px"
          style="margin-right: 12px"
          :src="'http://liufusong.top:8080' + item.imgSrc"
        />
        <div style="font-size: 14px">
          <p>{{ item.title }}</p>
          <p>{{ item.desc }}</p>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import img1 from "../../assets/imgs/1.png";
import img2 from "../../assets/imgs/2.png";
import img3 from "../../assets/imgs/3.png";
import img4 from "../../assets/imgs/4.png";
import { swiperApi, groupsApi } from "@/api";
export default {
  name: "App",
  data() {
    return {
      currentCity: this.$parent.$parent.currentCity,
      swiperlist: [],
      groupslist: [],
      img: [img1, img2, img3, img4],
    };
  },
  methods: {
    addfn() {
      this.$router.push({
        path: "/City",
      });
    },
    async getswiper() {
      try {
        const res = await swiperApi({});
        this.swiperlist = res.data.body;
        // console.log(res.data.body)
      } catch (e) {
        console.log(e);
      }
    },
    async getgroups() {
      try {
        const res = await groupsApi();
        this.groupslist = res.data.body;
        // console.log(res.data.body)
      } catch (e) {
        console.log(e);
      }
    },
    findfn() {
      this.$router.push({
        path: "/Layout/Search",
      });
    },
  },
  mounted() {
    this.getswiper();
    this.getgroups();
  },
};
</script>

<style scoped>
body {
  background-color: #eee;
}
.van-image {
  width: 60px;
  height: 60px;
}
.van-grid-item {
  font-size: 16px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
}

.icon-arrow {
  font-size: 16px;
  line-height: 24px;
  padding-right: 10px;
  border-right: 1px solid #000;
}
.icon-seach {
  font-size: 16px;
  line-height: 24px;
  margin-left: 10px;
}
.icon-map {
  font-size: 25px;
  line-height: 24px;
}
.bannel {
  position: relative;
}

.top {
  z-index: 999;
  padding: 0 10px;
  position: absolute;
  left: 10px;
  top: 10px;
  background-color: #fff;
  height: 34px;
  font-size: 14px;
  display: flex;
  margin: 20px 18px;
  align-content: space-between;
  align-items: center;
  border-radius: 5px;
}
.add {
  line-height: 24px;
  width: 35px;
}

input {
  margin: 0 5px;
  width: 180px;
  border-color: rgba(0, 0, 0, 0);
}

/* 标题 */

.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
</style>
