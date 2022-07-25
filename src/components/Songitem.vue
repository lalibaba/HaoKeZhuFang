<template>
  <van-cell center :title="name" :label="`${name}-${author}`">
    <template #right-icon>
      <van-icon @click="playfn" name="play-circle-o" size="0.6rem" />
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  props: ['name', 'author', 'id'],
  methods: {
    playfn() {
      this.$router.push({
        path: '/Play',
        query: {
          id: this.id, // 歌曲id, 通过路由跳转传递过去
        },
      })
    },
  },
}
</script>

<style scoped></style>
