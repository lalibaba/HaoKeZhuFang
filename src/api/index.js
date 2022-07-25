//首页页面接口
import { recommendSongList, newSongList } from './home'
//搜索页面接口
import { hotSearchList, searchResult } from './search'
//播放页面接口
import { getSongById, getLyricById } from './play'

export const recommendSongListApi = recommendSongList
export const newSongListApi = newSongList
//搜索页面接口
export const hotSearchListApi = hotSearchList
export const searchResultApi = searchResult

export const getSongByIdAPI = getSongById
export const getLyricByIdAPI = getLyricById
