<template>
  <div>
    <!-- 房源数据 -->
    <van-card
      v-for="(item, index) in houseList"
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
export default {
  name: "App",
  data() {
    return {};
  },
  props: {
    houseList: {
      type: Array,
      default: () => [],
    },
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
  background: rgba(117, 209, 220, 0.1);
}
.van-card__thumb {
  flex: 2;
}
.van-card__content {
  flex: 3;
}
</style>
