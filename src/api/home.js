import request from '@/utils/request'

export const recommendSongList = (params) => {
  return request({
    url: '/personalized',
    params,
  })
}

export const newSongList = (params) =>
  request({
    url: '/personalized/newsong',
    params,
  })
