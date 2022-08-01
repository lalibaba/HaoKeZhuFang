import request from "@/utils/request";
// 获取城市列表数据
export const city = (params) =>
  request({
    url: "/area/city",
    params,
  });
// 热门城市
export const hotcity = (params) =>
  request({
    url: "/area/hot",
    params,
  });
// 根据城市名称查询该城市信息
export const infocity = (Name) =>
  request({
    url: "/area/info",
    params: {
      name: Name,
    },
  });
// 小区关键词查询
export const community = (Name, ID) =>
  request({
    url: "/area/community",
    params: {
      name: Name,
      id: ID,
    },
  });
// 查询房源数据
export const map = (params) =>
  request({
    url: "/area/map",
    params,
  });
// 获取子级城市列表
export const area = (params) =>
  request({
    url: "/area",
    params,
  });
