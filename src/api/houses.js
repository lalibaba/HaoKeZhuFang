import request from "@/utils/request";

// 获取房屋查询条件
export const condition = (ID) =>
  request({
    url: "/houses/condition",
    params: { id: ID },
  });
