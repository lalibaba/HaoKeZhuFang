<template>
  <div>
    <van-nav-bar title="账号注册" left-arrow @click-left="loginFn" />

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
        <van-button block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <p
      @click="loginFn"
      style="margin: 20px; font-size: 16px; text-align: center"
    >
      返回登录页面~
    </p>
  </div>
</template>

<script>
import { registeredAPI } from "@/api";
export default {
  name: "registered",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    loginFn() {
      this.$router.push({
        path: "/Login",
      });
    },
    async onSubmit() {
      const res = await registeredAPI({
        username: this.username,
        password: this.password,
      });
      if (res.data.status == 200) {
        this.$toast.success(res.data.description);
        this.$parent.username = this.username;
        this.$parent.password = this.password;
        this.loginFn();
      } else if (res.data.status == 400) {
        this.$toast(res.data.description);
      } else if (res.data.status == 404) {
        this.$toast(res.data.description);
      }
      // console.log(res);
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
