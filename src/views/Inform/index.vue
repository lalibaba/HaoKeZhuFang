<template>
  <div>
    <van-search
      @input="inputfn"
      v-model="value"
      shape="round"
      placeholder="请输入搜索关键词"
    />
    <!-- 搜索下容器 -->
    <div class="search_wrap" v-if="songList.length == 0">
      <!-- 标题 -->
      <p class="hot_title">热门搜索</p>
      <!-- 热搜关键词容器 -->
      <div class="hot_name_wrap">
        <!-- 每个搜索关键词 -->
        <span
          class="hot_item"
          v-for="(item, index) in hotSearchList"
          :key="index"
          @click="hotfn(item.first)"
          >{{ item.first }}</span
        >
      </div>
    </div>
    <div class="search_wrap" v-else>
      <!-- 搜索结果 -->
      <p class="hot_title">搜索结果</p>
      <!-- -->
      <!--v-model="refreshing" @refresh="onRefresh" -->
      <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <Songitem
          v-for="item in songList"
          :key="item.id"
          :name="item.name"
          :author="item.ar[0].name"
          :id="item.id"
        ></Songitem>
        <!-- <van-cell
          center
          v-for="obj in songList"
          :key="obj.id"
          :title="obj.name"
          :label="`${obj.name}-${obj.ar[0].name}`"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" size="0.6rem" />
          </template>
        </van-cell> -->
      </van-list>
      <!-- </van-pull-refresh> -->
    </div>
  </div>
</template>

<script>
import { hotSearchListApi, searchResultApi } from '@/api'
export default {
  name: 'App',
  data() {
    return {
      value: '',
      hotSearchList: [],
      songList: [],

      list: [],
      loading: false,
      finished: false,

      limit: 20,
      page: 1,
      timer: null,
    }
  },
  methods: {
    async gethotSearchList() {
      try {
        const res = await hotSearchListApi()
        // console.log(res.data.result.hots)
        this.hotSearchList = res.data.result.hots
      } catch (e) {
        console.log(e)
      }
    },
    // getsearchResult() {
    //   return searchResultApi({
    //     keywords: this.value,
    //   }).then(
    //     (res) => {
    //       return res || []
    //     },
    //     (err) => console.log(err)
    //   )
    // },
    // inputfn() {
    //   let list = this.getsearchResult()

    //   console.log(list)
    // },
    async getsearchResult() {
      try {
        const res = await searchResultApi({
          keywords: this.value,
          limit: this.limit,
          offset: (this.page - 1) * this.limit,
        })
        console.log(res)
        return res
      } catch (e) {
        console.log(e)
      }
    },
    async inputfn() {
      //防抖
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        if (this.value.trim() == '') return (this.songList = [])
        let res = await this.getsearchResult()
        this.songList = (res.data.result && res.data.result.songs) || []
      }, 1000)
    },
    async hotfn(val) {
      this.value = val
      let res = await this.getsearchResult()
      this.songList = (res.data.result && res.data.result.songs) || []
    },

    async onLoad() {
      this.page++
      let res = await this.getsearchResult()
      if (!res.data.result.songs) {
        this.finished = true
        this.loading = false
        return
      } else if ((this.page - 1) * this.limit >= res.data.result.songCount) {
        this.finished = true
        this.loading = false
        return
      } else {
        this.songList.push(...res.data.result.songs)
        // this.songList = [...this.songList, ...res.songs]
        this.loading = false
      }
    },
    // onRefresh() {
    //   // 清空列表数据
    //   this.finished = false

    //   // 重新加载数据
    //   // 将 loading 设置为 true，表示处于加载状态
    //   this.loading = true
    //   this.onLoad()
    // },
  },
  mounted() {
    this.gethotSearchList()
  },
}
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}

/* 给单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>
