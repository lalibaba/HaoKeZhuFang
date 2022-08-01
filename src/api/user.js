import request from "@/utils/request";

// 登录接口
export const login = (data) =>
  request({
    method: "POST",
    url: "/user/login",
    data,
  });
// 注册接口
export const registered = (data) =>
  request({
    method: "POST",
    url: "/user/registered",
    data,
  });
// 获取用户信息接口
export const user = (token) =>
  request({
    url: "/user",
    headers: {
      authorization: token,
    },
  });
