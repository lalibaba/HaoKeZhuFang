import request from '@/utils/request'

// 热搜关键字
export const houses = (params) =>
  request({
    url: '/houses',
    params,
  })

  