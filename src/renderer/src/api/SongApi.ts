import Abstract from './Abstract'
import { encrypt } from '@renderer/utils/encode/index'
import { GetRecommend } from './type/getRecommend'
import { GetTopLists } from './type/getTopLists'
import { GetRanks } from './type/getRanks'
import { GetSongInfo } from './type/getSongInfo'
import moment from 'moment'

import { MusicPlayerLink, SearchResult, SmartBox } from './type'

class SongApi extends Abstract {
  constructor() {
    super()
  }

  // :param key: 搜索关键词
  // :param num: 搜索数量
  // :param page: 搜索页数
  // :param mode: 搜索类型（0:单曲, 1:歌手, 2:专辑, 3:歌单, 4:mv, 7:歌词, 8:用户）
  getSearchByKey({ key = '周杰伦', num = 10, page = 1, mode = 0 }): Promise<SearchResult> {
    const body = {
      req: {
        method: 'DoSearchForQQMusicDesktop',
        module: 'music.search.SearchCgiService',
        param: {
          search_type: mode,
          query: key,
          page_num: page,
          num_per_page: num
        }
      }
    }

    return this.simplePostReq('https://u.y.qq.com/cgi-bin/musics.fcg?', body, {
      _: new Date().getTime(),
      sign: encrypt(JSON.stringify(body))
    }) as Promise<SearchResult>
  }

  // 获取关键字提示
  // @params key string
  getSmartbox(key: string): Promise<SmartBox> {
    return this.getReq('/splcloud/fcgi-bin/smartbox_new.fcg', {
      key,
      format: 'json',
      outCharset: 'utf-8',
      is_xml: 0
    }) as Promise<SmartBox>
  }

  // 获取排行榜单列表
  getTopLists(): Promise<GetTopLists> {
    return this.getReq('/v8/fcg-bin/fcg_myqq_toplist.fcg', {
      format: 'json',
      outCharset: 'utf-8',
      platform: 'h5',
      needNewCode: 1
    }) as Promise<GetTopLists>
  }

  // 获取榜单详情
  getRanks(topId = 4, offset = 0, limit = 20): Promise<GetRanks> {
    return this.simpleGetReq('https://u.y.qq.com/cgi-bin/musicu.fcg', {
      format: 'json',
      data: JSON.stringify({
        req_1: {
          module: 'musicToplist.ToplistInfoServer',
          method: 'GetDetail',
          param: { topId, offset, num: limit, period: `${moment().year()}_${moment().isoWeek()}` }
        }
      })
    }) as Promise<GetRanks>
  }

  // 获取首页推荐
  getRecommend(): Promise<GetRecommend> {
    return this.simpleGetReq('https://u.y.qq.com/cgi-bin/musicu.fcg', {
      format: 'json',
      data: '{"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"newsong.NewSongServer","method":"get_new_song_info","param":{"type":5}},"new_album":{"module":"newalbum.NewAlbumServer","method":"get_new_album_info","param":{"area":1,"sin":0,"num":10}},"new_album_tag":{"module":"newalbum.NewAlbumServer","method":"get_new_album_area","param":{}},"toplist":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}}'
    }) as Promise<GetRecommend>
  }

  // 获取歌词
  // @params songmind string 歌曲ID
  getLyric(songmid: string): Promise<unknown> {
    return this.getReq('/lyric/fcgi-bin/fcg_query_lyric_new.fcg', {
      format: 'json',
      outCharset: 'utf-8',
      pcachetime: Math.floor(new Date().getTime() / 1000),
      songmid
    })
  }

  // 获取歌曲详细信息
  // @params songid string 歌曲id
  getSongInfo(songid: string): Promise<GetSongInfo> {
    return this.simpleGetReq('https://u.y.qq.com/cgi-bin/musicu.fcg', {
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0,
      data: JSON.stringify({
        comm: {
          ct: 24,
          cv: 0
        },
        songinfo: {
          method: 'get_song_detail_yqq',
          param: {
            song_type: 0,
            song_mid: songid,
            song_id: songid
          },
          module: 'music.pf_song_detail_svr'
        }
      })
    }) as Promise<GetSongInfo>
  }

  // 获取播放链接
  // @params songmid string[] 歌曲id数组
  getMusicPlayLink(songmid: string[]): Promise<MusicPlayerLink> {
    return this.simpleGetReq('https://u.y.qq.com/cgi-bin/musicu.fcg?', {
      format: 'json',
      data: JSON.stringify({
        req: {
          module: 'vkey.GetVkeyServer',
          method: 'CgiGetVkey',
          param: { guid: '358840384', songmid, platform: '20' }
        }
      })
    }) as Promise<MusicPlayerLink>
  }
}

export default new SongApi()
