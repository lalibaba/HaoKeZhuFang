<template>
  <div class="my" style="positios: relative">
    <img src="../../assets/imgs/bg.png" alt="" style="width: 376px" />
    <!-- 登录界面 -->
    <div v-if="isLogin" class="myinfo">
      <div class="userimg">
        <img :src="'http://liufusong.top:8080' + userIfon.avatar" alt="" />
      </div>
      <p style="font-size: 13px; margin-bottom: 10px">
        {{ userIfon.nickname }}
      </p>
      <button class="login" @click="logoutfn">退出</button>
      <p style="font-size: 13px; margin-top: 20px; color: #999999">
        编辑个人资料▶
      </p>
    </div>
    <!-- 未登录界面 -->
    <div v-else class="myinfo">
      <div class="userimg">
        <img :src="userImg" alt="" />
      </div>
      <p style="font-size: 13px; margin-bottom: 10px">游客</p>
      <button class="login" @click="loginFn">去登录</button>
    </div>
    <!-- 功能按钮 -->
    <div class="list">
      <van-grid :column-num="3">
        <van-grid-item
          v-for="(item, index) in gridlist"
          :key="index"
          :text="item.text"
          @click="Fn(item.path)"
        >
          <template #icon>
            <p :class="'iconfont' + item.icon"></p>
          </template>
        </van-grid-item>
      </van-grid>
      <img
        src="../../assets/imgs/join.png"
        alt=""
        style="width: 376px; margin-top: 20px"
      />
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { userAPI } from "@/api";
export default {
  name: "App",
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token;
    },
  },
  data() {
    return {
      gridlist: [
        {
          icon: " icon-coll",
          text: "我的收藏",
          path: "/Favorites",
        },
        {
          icon: " icon-ind",
          text: "我的出租",
          path: "/",
        },
        {
          icon: " icon-record",
          text: "看房记录",
          path: "/",
        },
        {
          icon: " icon-identity",
          text: "成为房主",
          path: "/",
        },
        {
          icon: " icon-myinfo",
          text: "个人资料",
          path: "/",
        },
        {
          icon: " icon-cust",
          text: "练习我们",
          path: "/",
        },
      ],
      userImg: "http://liufusong.top:8080/img/profile/avatar.png",
      userIfon: {
        avatar: "",
        gender: "",
        id: "",
        nickname: "",
        phone: "",
      },
    };
  },
  methods: {
    // 功能按钮跳转
    Fn(path) {
      this.$router.push(path);
    },
    // 去登录跳转
    loginFn() {
      this.$router.push({
        path: "/login",
      });
    },
    // 退出按钮
    logoutfn() {
      Dialog.confirm({
        title: "标题",
        message: "弹窗内容",
      })
        .then(() => {
          this.$store.commit("TOKEN", {});
          // on confirm
        })
        .catch((e) => {
          // on cancel
          console.log(e);
        });
    },
    //请求用户数据
    async getuserInfo() {
      const token = this.$store.state.tokenObj.token;
      const res = await userAPI(token);
      this.userIfon = res.data.body;
    },
  },
  mounted() {
    this.getuserInfo();
  },
};
</script>

<style scoped>
.my {
  position: relative;
}
.myinfo {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 166px;
  margin: 0 auto;
  margin-top: 134px;
  box-shadow: 0 0 10px 3px #ddd;
  background-color: #fff;
}
.list {
  position: absolute;
  top: 180%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
}
:deep(.iconfont) {
  font-size: 20px;
  text-align: center;
}
.van-grid-item__content {
  padding: 10px 8px;
  height: 50%;
}
.userimg img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0 0 10px 3px #ddd;
}
.userimg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -170%);
  box-shadow: 0 0 10px 3px #ddd;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.login {
  width: 70px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 13px;
  color: #fff;
  background-color: #21b97a;
  border-radius: 5px;
}
</style>
