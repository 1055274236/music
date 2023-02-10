import Abstract from './Abstract'
import { AxiosResponse } from 'axios'

class SongListApi extends Abstract {
  constructor() {
    super()
  }

  getSongListCategories(): Promise<AxiosResponse<unknown, unknown>> {
    return this.getReq('/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg?', {
      format: 'json',
      outCharset: 'utf-8'
    })
  }
}

export default new SongListApi()
