<template>
  <div class="city">
    <!-- 搜索 -->
    <div class="bannel">
      <i class="iconfont icon-back" @click="backfn"></i>
    </div>
    <div class="list">
      <!-- 当前城市 -->
      <van-list>
        <div class="tag">当前城市</div>
        <van-cell>{{ currentCity }} </van-cell>
      </van-list>
      <!-- 热门城市 -->
      <!-- <van-list>
      <div class="tag">热门城市</div>
      <van-cell
        v-for="(item, index) in hotCityList"
        :key="index"
        :title="item.label"
      >
      </van-cell>
    </van-list> -->
      <!-- 筛选城市 -->
      <!-- <van-list v-for="(item, index) in cityList" :key="index">
      <div v-if="item.index.length == 0" class="tag">无城市</div>
      <div v-else class="tag">{{ index }}</div>
      <van-cell :title="item"></van-cell>
    </van-list> -->

      <van-index-bar>
        <div>
          <van-index-anchor index="热门城市" />
          <van-cell
            v-for="(item, index) in hotCityList"
            :key="index"
            :title="item.label"
            @click="addName($event)"
          />
        </div>
      </van-index-bar>
      <van-index-bar>
        <div v-for="(item, index) in cityList" :key="index">
          <van-index-anchor :index="String.fromCharCode(+index + 65)" />
          <van-cell
            v-for="(it, ind) in item"
            :key="ind"
            :title="it"
            @click="addName($event)"
          />
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import { cityAPI, hotcityAPI } from "@/api";
export default {
  name: "App",
  data() {
    return {
      cityList: [],
      hotCityList: [],
      currentCity: this.$parent.currentCity,
    };
  },

  methods: {
    addName(e) {
      this.currentCity = e.target.innerText;
      this.$parent.currentCity = this.currentCity;
      // console.log(this.currentCity);
    },
    //请求全部城市
    async getcity() {
      try {
        const res = await cityAPI({
          level: 1,
        });
        // 生成key
        let obj = {};
        for (let i = 0; i < 26; i++) {
          let key = String.fromCharCode(65 + i);
          obj[key] = [];
        }
        //按字母存放城市
        for (let i = 0; i < res.data.body.length; i++) {
          let key = res.data.body[i].short[0].toUpperCase();
          if (obj[key]) {
            obj[key].push(res.data.body[i].label);
          }
        }
        console.log(obj);
        for (let key in obj) {
          if (obj[key].length == 0) obj[key] = ["暂无城市"];
          this.cityList.push(obj[key]);
        }
      } catch (e) {
        console.log(e);
      }
    },
    //请求热门城市
    async gethotcity() {
      try {
        const res = await hotcityAPI();
        this.hotCityList = res.data.body;
        // console.log(res.data.body);
      } catch (e) {
        console.log(e);
      }
    },
    // //请求城市信息
    // async getinfocity() {
    //   try {
    //     const res = await infocityAPI({
    //       name: "北京",
    //     });
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    //返回首页
    backfn() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.getcity();
    this.gethotcity();

    // this.getinfocity();
  },
};
</script>

<style scoped>
:deep(.van-index-bar__index--active) {
  color: #fff;
  border: 1px solid #4ef34e;
  background-color: #4ef34e;
  border-radius: 50%;
  width: 16px;
  /* margin: 0 auto; */
  height: 16px;
  line-height: 16px;
  text-align: center;
}
:deep(.van-index-bar__index) {
  padding: 1px;
}
.city {
  background-color: #fff;
  border: 1px solid #000;
}

/* 顶部的样式 */
.icon-back {
  font-size: 16px;
  line-height: 24px;
  margin: 0 10px;
  color: #fff;
}

.bannel {
  background-color: #21b97a;
  height: 50px;
  display: flex;
  align-items: center;
}
:deep(.van-index-anchor) {
  font-size: 14px;
  color: #999999;
  margin-bottom: 10px;
  background-color: #fff;
  height: 40px;
  line-height: 40px;
  margin-bottom: 0;
  padding-left: 17px;
}
.tag {
  font-size: 14px;
  color: #999999;
  margin-bottom: 10px;
  background-color: #fff;
  height: 40px;
  line-height: 40px;
  margin-bottom: 0;
  padding-left: 17px;
}
</style>
