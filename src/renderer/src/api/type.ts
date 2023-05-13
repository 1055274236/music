export type Album = {
  mid: string
}

export type Singer = {
  mid: string
}

export type Song = {
  mid: string
}

export type MusicPlayerLink = {
  req: {
    data: {
      msg: string
      sip: string[]
      midurlinfo: {
        songmid: string
        purl: string
      }[]
      expiration: number
    }
  }
}

type SmartBoxItemBase = {
  docid: string
  id: string
  mid: string
  name: string
  singer: string
  pic?: string
  vid?: string
}
export type SmartBoxBase = {
  count: number
  name: string
  order: number
  type: number
  itemlist: SmartBoxItemBase[]
}
export type SmartBox = {
  data: {
    album: SmartBoxBase
    mv: SmartBoxBase
    singer: SmartBoxBase
    song: SmartBoxBase
  }
}

export interface SearchResult {
  req: {
    data: {
      body: {
        album: {
          list: SearchResultAlbum[]
        }
        gedantip: {
          tab: number
          tip: string
        }
        mv: {
          list: unknown[]
        }
        qc: unknown[]
        singer: {
          list: SearchResultSinger[]
        }
        song: {
          list: SearchResultSong[]
        }
        songlist: {
          list: SearchResultSongList[]
        }
        user: {
          list: unknown[]
        }
        zhida: {
          list: unknown[]
        }
      }
      meta: {
        sum: number
      }
    }
  }
}
export interface SearchResultSong {
  album: {
    id: number
    mid: string
    name: string
    // https://y.qq.com/music/photo_new/T002R300x300M000 ${pmid} .jpg?max_age=2592000
    pmid: string
    subtitle: string
    time_public: string
    title: string
  }
  mid: string
  interval: number
  mv: {
    id: number
    name: string
    title: string
    vid: string
    vt: number
  }
  name: string
  singer: {
    id: number
    mid: string
    name: string
    pmid: string
    title: string
    type: number
    uin: number
  }[]
  time_public: string
  title: string
  title_hilight: string
  pay: {
    pay_down: number
    pay_play: number
    time_free: number
  }
}

export type SearchResultSinger = {
  albumNum: number
  mvNum: number
  singerID: string
  singerMID: string
  singerName: string
  singerName_hilight: string
  singerPic: string
  songNum: number
}

export type SearchResultAlbum = {
  albumID: string
  albumMID: string
  albumName: string
  albumName_hilight: string
  albumPic: string
  publicTime: string
  // singerID: string
  // singerMID: string
  // singerName: string
  // singerName_hilight: string
  // singerTransName: string
  // singerTransName_hilight: string
  singer_list: {
    id: string
    mid: string
    name: string
    pmid: string
    title: string
  }[]
  song_count: number
  type: string
}

export type SearchResultSongList = {
  createtime: string
  creator: {
    name: string
    qq: string
    singerid: string
    singermid: string
  }
  diss_status: string
  dissid: string
  dissname: string
  imgurl: string
  introduction: string
  listennum: 762532
  modifytime: string
  song_count: number
}

export interface SongListCategoriesType {
  data: SongListCategoriesDataType
}

export interface SongListCategoriesDataType {
  categories: {
    categoryGroupName?: string
    items?: SongListCategoriesItem[]
    usable: number
    categoryId?: number
    categoryName?: string
    allsorts?: Allsort[]
  }[]
}

export interface SongListCategoriesItem {
  allsorts?: Allsort[]
  categoryId?: number
  categoryName?: string
  usable?: number
  sortId?: number
  sortName?: string
}

export interface Allsort {
  sortId: number
  sortName: string
}

export interface SongListType {
  code: number
  subcode: number
  message: string
  default: number
  data: SongListData
}

export interface SongListData {
  uin: number
  categoryId: number
  sortId: number
  sum: number
  sin: number
  ein: number
  list: SongListList[]
}

export interface SongListList {
  dissid: string
  createtime: string
  commit_time: string
  dissname: string
  imgurl: string
  introduction: string
  listennum: number
  score: number
  version: number
  creator: SongListCreator
}

export interface SongListCreator {
  type: number
  qq: number
  encrypt_uin: string
  name: string
  isVip: number
  avatarUrl: string
  followflag: number
}

export interface SongListDetails {
  code: number
  subcode: number
  accessed_plaza_cache: number
  accessed_favbase: number
  login: string
  cdnum: number
  cdlist: SongListDetailsCdlist[]
  realcdnum: number
}

export interface SongListDetailsCdlist {
  disstid: string
  dir_show: number
  owndir: number
  dirid: number
  coveradurl: string
  dissid: number
  login: string
  uin: string
  encrypt_uin: string
  dissname: string
  logo: string
  pic_mid: string
  album_pic_mid: string
  pic_dpi: number
  isAd: number
  desc: string
  ctime: number
  mtime: number
  headurl: string
  ifpicurl: string
  nick: string
  nickname: string
  type: number
  singerid: number
  singermid: string
  isvip: number
  isdj: number
  tags: SongListDetailsTag[]
  songnum: number
  songids: string
  songtypes: string
  disstype: number
  dir_pic_url2: string
  song_update_time: number
  song_update_num: number
  total_song_num: number
  song_begin: number
  cur_song_num: number
  songlist: SongListDetailsSonglist[]
  visitnum: number
  cmtnum: number
  buynum: number
  scoreavage: string
  scoreusercount: number
}

export interface SongListDetailsTag {
  id: number
  name: string
  pid: number
}

export interface SongListDetailsSonglist {
  id: number
  type: number
  songtype: number
  mid: string
  name: string
  title: string
  subtitle: string
  interval: number
  isonly: number
  language: number
  genre: number
  index_cd: number
  index_album: number
  status: number
  fnote: number
  url: string
  time_public: string
  tid: number
  sa: number
  ov: number
  vs: string[]
  singer: SongListDetailsSinger[]
  album: SongListDetailsAlbum
  mv: SongListDetailsMv
  ksong: SongListDetailsKsong
  file: SongListDetailsFile
  volume: SongListDetailsVolume
  pay: SongListDetailsPay
  action: SongListDetailsAction
}

export interface SongListDetailsSinger {
  id: number
  mid: string
  name: string
  title: string
}

export interface SongListDetailsAlbum {
  id: number
  mid: string
  pmid: string
  name: string
  title: string
  subtitle: string
}

export interface SongListDetailsMv {
  id: number
  vid: string
}

export interface SongListDetailsKsong {
  id: number
  mid: string
}

export interface SongListDetailsFile {
  media_mid: string
  size_try: number
  b_30s: number
  e_30s: number
  try_begin: number
  try_end: number
  size_24aac: number
  size_48aac: number
  size_96aac: number
  size_192aac: number
  size_192ogg: number
  size_128mp3: number
  size_320mp3: number
  size_aac: number
  size_ogg: number
  size_128: number
  size_320: number
  size_ape: number
  size_flac: number
  size_dts: number
  size_hires: number
}

export interface SongListDetailsVolume {
  gain: number
  peak: number
  lra: number
}

export interface SongListDetailsPay {
  pay_month: number
  price_track: number
  price_album: number
  pay_play: number
  pay_down: number
  pay_status: number
  time_free: number
}

export interface SongListDetailsAction {
  switch: number
  msgid: number
  msgpay: number
  alert: number
  icons: number
}
