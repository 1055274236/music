import Abstract from './Abstract'

class SingerApi extends Abstract {
  constructor() {
    super()
  }

  // 获取歌手热歌
  // @params singermid string 歌手ID
  getSingerHotsong({ singermid = '0025NhlN2yWrP4', limit = 20, offect = 0 }): Promise<unknown> {
    return this.getReq('https://u.y.qq.com/cgi-bin/musicu.fcg?', {
      format: 'json',
      data: JSON.stringify({
        comm: { ct: 24, cv: 0 },
        singer: {
          method: 'get_singer_detail_info',
          param: { sort: 5, singermid, sin: limit, num: offect },
          module: 'music.web_singer_info_svr'
        }
      })
    })
  }

  // 获取相似歌手
  // @params singer_mid string 歌手ID
  getSimilarSinger({ singer_mid = '0025NhlN2yWrP4', limit = 5, offect = 0 }): Promise<unknown> {
    return this.getReq('/v8/fcg-bin/fcg_v8_simsinger.fcg?', {
      singer_mid,
      format: 'json',
      outCharset: 'utf-8',
      utf8: 1,
      start: offect,
      num: limit
    })
  }

  // 根据分类获取歌手
  // @params area 地区
  // @params sex 性别
  // @params genre 风格
  // @params index 歌手名称字母索引
  // @params page 当前页
  getSingerList({
    area = -100,
    sex = -100,
    genre = -100,
    index = -100,
    page = 1
  }): Promise<unknown> {
    return this.getReq('https://u.y.qq.com/cgi-bin/musicu.fcg?', {
      format: 'json',
      data: JSON.stringify({
        comm: {
          ct: 24,
          cv: 0
        },
        singerList: {
          module: 'Music.SingerListServer',
          method: 'get_singer_list',
          param: {
            area: +area,
            sex: +sex,
            genre: +genre,
            index: +index,
            sin: (page - 1) * 80,
            cur_page: +page
          }
        }
      })
    })
  }

  // 获取歌手专辑
  getSingerAlbum(singermid: string, offect = 0, limit = 20): Promise<unknown> {
    return this.getReq('https://u.y.qq.com/cgi-bin/musicu.fcg', {
      format: 'json',
      singermid,
      data: {
        comm: {
          ct: 24,
          cv: 0
        },
        singer: {
          method: 'GetAlbumList',
          param: {
            sort: 5,
            singermid,
            begin: offect,
            num: limit
          },
          module: 'music.musichallAlbum.AlbumListServer'
        }
      }
    })
  }
}

export default new SingerApi()
