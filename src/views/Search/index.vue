<template>
  <div>
    <div class="bannel">
      <!-- 搜索 -->
      <div class="top">
        <i class="iconfont icon-back" @click="backfn"></i>
        <div class="top1">
          <div class="add" @click="addfn">{{ currentCity }}</div>
          <i class="iconfont icon-arrow"></i>
          <i class="iconfont icon-seach"></i>
          <input type="text" name="" id="" placeholder="请输入小区或地址" />
        </div>
        <i class="iconfont icon-map"></i>
      </div>
    </div>
    <!-- 下拉菜单 -->
    <van-dropdown-menu>
      <!-- 1.区域筛选 -->
      <van-dropdown-item v-model="value1" :options="option1"
        ><van-picker toolbar-position="bottom" show-toolbar :columns="columns"
      /></van-dropdown-item>
      <!-- 2.方式筛选 -->
      <van-dropdown-item v-model="value2" :options="option2" />
      <!-- 3.租金筛选 -->
      <van-dropdown-item v-model="value2" :options="option3" />
      <!-- 4.其他筛选 -->
      <van-dropdown-item v-model="value2" :options="option4" />
    </van-dropdown-menu>

    <!-- 房源数据 -->
    <van-card
      v-for="(item, index) in housesList"
      :key="index"
      :price="item.price + ' 元 / 月'"
      :desc="item.desc"
      :title="item.title"
      :thumb="'http://liufusong.top:8080' + item.houseImg"
    >
      <template #tags>
        <van-tag
          v-for="(it, index) in item.tags"
          :key="index"
          plain
          type="danger"
          >{{ it }}</van-tag
        >
      </template>
    </van-card>
  </div>
</template>

<script>
import { housesApi, infocityAPI, conditionAPI } from "@/api";
export default {
  name: "App",
  data() {
    return {
      currentCity: this.$parent.$parent.currentCity,
      columns: [],
      value1: 0,
      value2: "a",
      value3: "a",
      value4: "a",
      option1: [{ text: "区域", value: 0 }],
      option2: [{ text: "方式", value: "a" }],
      option3: [{ text: "租金", value: "a" }],
      option4: [{ text: "筛选", value: "a" }],

      value: "",
      housesList: [],
    };
  },
  methods: {
    addfn() {
      this.$router.push({
        path: "/City",
      });
    },
    backfn() {
      this.$router.push({
        path: "/Layout/Home",
      });
    },
    async gethouses() {
      try {
        const res = await housesApi();
        this.housesList = res.data.body.list;
        // console.log(res.data.body.list)
      } catch (e) {
        console.log(e);
      }
    },

    //按条件获取所有信息

    //请求获取所有城市id信息
    async getinfocity() {
      try {
        const res = await infocityAPI(this.currentCity);
        let cityID = res.data.body.value;
        //请求获取所有信息
        const res2 = await conditionAPI(cityID);
        console.log(res2.data.body);
        let areaData = res2.data.body.area; //区域
        let subwayData = res2.data.body.subway; //地铁
        let areaChildren = []; //区域
        let subwayChildren = []; //地铁
        // 获取小区数据
        for (let k in areaData.children) {
          areaChildren[k] = {};
          areaChildren[k].text = areaData.children[k].label;
          areaChildren[k].children = [];
          // 获取街区数据
          for (let i in areaData.children[k].children) {
            areaChildren[k].children[i] = {};
            areaChildren[k].children[i].text =
              areaData.children[k].children[i].label;
          }
        }
        // 获取地铁数据
        for (let k in subwayData.children) {
          subwayChildren[k] = {};
          subwayChildren[k].text = subwayData.children[k].label;
          subwayChildren[k].children = [];
          // 获取街区数据
          for (let i in subwayData.children[k].children) {
            subwayChildren[k].children[i] = {};
            subwayChildren[k].children[i].text =
              subwayData.children[k].children[i].label;
          }
        }
        let Data = [];
        Data[0] = {};
        Data[0].text = "区域";
        Data[0].children = areaChildren;
        Data[1] = {};
        Data[1].text = "地铁";
        Data[1].children = subwayChildren;
        this.columns = Data;
        //请求获取城市小区信息
        // const res2 = await communityAPI(this.currentCity, cityID);
        // let result = res2.data.body;
        // //小区和截取数组赋值
        // let i = 0;
        // // for (let key in result) {
        // //   if (result.areaName) this.columns[i];
        // // }

        // console.log(result, this.columns[1].values, this.columns[2].values);
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.gethouses();
    this.getinfocity();
  },
};
</script>

<style scoped>
/* 房源顶部筛选样式 */
:deep(.van-cell) {
  display: none;
}
:deep(.van-picker__cancel) {
  color: #21b97a;
  flex: 1;
}
:deep(.van-picker__confirm) {
  color: #fff;
  background: #21b97a;
  flex: 2;
}

/* 房源数据右侧样式 */
.van-card__price-currency {
  display: none;
}
.van-card__title {
  font-weight: bold;
  font-size: 16px;
}
.van-card__price {
  color: red;
}
.van-tag--danger.van-tag--plain {
  color: #75d1dc;
}
.van-card__thumb {
  flex: 2;
}
.van-card__content {
  flex: 3;
}

/* 搜索栏的样式 */
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
.icon-back {
  font-size: 16px;
  line-height: 24px;
  margin: 0 10px;
  color: #fff;
}
.icon-map {
  font-size: 25px;
  line-height: 24px;
  margin: 0 10px;
  color: #fff;
}
.bannel {
  background-color: #21b97a;
  height: 50px;

  position: relative;
}
.top {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 34px;

  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.top1 {
  padding: 0 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  font-size: 14px;
  height: 34px;
  border-radius: 5px;
}
.add {
  line-height: 24px;
  width: 35px;
}

input {
  margin: 0 5px;
  border-color: rgba(0, 0, 0, 0);
}
</style>
