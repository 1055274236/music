import Abstract from './Abstract'
import { SongListCategoriesType, SongListType } from './type'

class SongListApi extends Abstract {
  constructor() {
    super()
  }

  getSongListCategories(): Promise<SongListCategoriesType> {
    return this.getReq('/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg?', {
      format: 'json',
      outCharset: 'utf-8'
    }) as Promise<SongListCategoriesType>
  }

  // 获取歌单列表
  // categoryId 歌单类别
  // sortId 歌单子类别
  getSongLists({
    categoryId = 10000000,
    sortId = 5,
    limit = 0,
    offect = 20
  }): Promise<SongListType> {
    return this.getReq('/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?', {
      format: 'json',
      outCharset: 'utf-8',
      categoryId,
      sortId,
      ein: offect + limit,
      sin: offect
    }) as Promise<SongListType>
  }

  // 获取歌单详情
  // @params disstid 歌单id
  getSongListDetail(disstid: string): Promise<unknown> {
    return this.getReq('/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?', {
      disstid,
      format: 'json',
      outCharset: 'utf-8',
      type: 1,
      json: 1,
      utf8: 1,
      onlysong: 0,
      new_format: 1
    })
  }
}

export default new SongListApi()
