<template>
  <div>
    <van-nav-bar title="账号登录" left-arrow @click-left="onClickLeft" />

    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="账号"
        placeholder="请输入账号"
        :rules="[
          { required: true, message: '请填写账号' },
          {
            pattern: /^[a-zA-Z0-9_-]{5,8}$/,
            message: '账号为5-8位数字和字母',
          },
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        placeholder="请输入密码"
        :rules="[
          { required: true, message: '请填写密码' },
          {
            pattern: /^[a-zA-Z0-9_-]{5,12}$/,
            message: '密码为5-12位数字和字母',
          },
        ]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <p
      @click="registeredFn"
      style="margin: 20px; font-size: 16px; text-align: center"
    >
      还没有账号，去注册~
    </p>
  </div>
</template>

<script>
import { loginAPI } from "@/api";
export default {
  name: "Login",
  data() {
    return {
      username: this.$parent.username,
      password: this.$parent.password,
    };
  },
  methods: {
    registeredFn() {
      this.$router.push({
        path: "/Registered",
      });
    },
    onClickLeft() {
      this.$router.push({
        path: "/Layout/My",
      });
    },
    // /登录请求
    async onSubmit() {
      try {
        const res = await loginAPI({
          username: this.username,
          password: this.password,
        });
        // console.log(res.data.body.token);
        //将token存入vuex.store
        const Token = {};
        Token.token = res.data.body.token;
        this.$store.commit("TOKEN", Token);

        if (res.data.status == 200) {
          this.$toast.success(res.data.description);
        } else if (res.data.status == 400) {
          this.$toast(res.data.description);
        } else if (res.data.status == 401) {
          this.$toast(res.data.description);
        } else if (res.data.status == 404) {
          this.$toast(res.data.description);
        }
        //跳转到我的页面
        this.$router.push("./Layout/My");
      } catch (e) {
        console.log(e);
        this.$toast(e);
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
:deep(.van-nav-bar__content) {
  background-color: #21b97a;
}
:deep(.van-nav-bar__title) {
  color: #fff;
}

:deep(.van-icon-arrow-left:before) {
  color: #fff;
}
:deep(.van-button--info) {
  background-color: #21b97a;
}
</style>
