import request from '@/utils/request'

export const swiper = () => {
  return request({
    url: '/home/swiper',
  })
}

export const groups = (params) =>
  request({
    url: '/home/groups',
    params,
  })
export const news = (params) =>
  request({
    url: '/home/news',
    params,
  })
