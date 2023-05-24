export interface GetRecommend {
  code: number
  ts: number
  start_ts: number
  traceid: string
  category: Category
  recomPlaylist: RecomPlaylist
  playlist: Playlist
  new_song: NewSong
  new_album: NewAlbum
  new_album_tag: NewAlbumTag
  toplist: Toplist
  focus: Focus
}

export interface Category {
  code: number
  data: Data
}

export interface Data {
  category: Category2[]
}

export interface Category2 {
  group_id: number
  group_name: string
  items: Item[]
}

export interface Item {
  item_id: number
  item_name: string
  item_desc: string
  item_new: number
  item_hot: number
  show_type: number
  is_parent: number
  reimgurl: string
  item_share_pic: string
  show_detail: number
  group_id: number
}

export interface RecomPlaylist {
  code: number
  data: Data2
}

export interface Data2 {
  page: number
  v_hot: VHot[]
}

export interface VHot {
  album_pic_mid: string
  content_id: number
  cover: string
  creator: number
  edge_mark: string
  id: number
  is_dj: boolean
  is_vip: boolean
  jump_url: string
  listen_num: number
  pic_mid: string
  rcmdcontent: string
  rcmdtemplate: string
  rcmdtype: number
  singerid: number
  title: string
  tjreport: string
  type: number
  username: string
}

export interface Playlist {
  code: number
  data: Data3
}

export interface Data3 {
  total: number
  v_playlist: VPlaylist[]
}

export interface VPlaylist {
  access_num: number
  album_pic_mid: string
  censor_remark: any[]
  censor_status: number
  censor_time: number
  commit_time: number
  cover_mid: string
  cover_url_big: string
  cover_url_medium: string
  cover_url_small: string
  create_time: number
  creator_info: CreatorInfo
  creator_uin: number
  desc: string
  dirid: number
  fav_num: number
  modify_time: number
  pic_mid: string
  rcmdcontent: string
  rcmdtemplate: string
  score: number
  song_ids: number[]
  song_types: number[]
  tag_ids: number[]
  tag_names: any[]
  tid: number
  title: string
  tjreport: string
}

export interface CreatorInfo {
  avatar: string
  is_dj: number
  nick: string
  taoge_avatar: string
  taoge_nick: string
  uin: number
  vip_type: number
}

export interface NewSong {
  code: number
  data: Data4
}

export interface Data4 {
  lanlist: Lanlist[]
  lan: string
  songlist: Songlist[]
  ret_msg: string
  type: number
  songTagInfoList: SongTagInfoList[]
}

export interface Lanlist {
  name: string
  lan: string
  type: number
  tjreport: string
}

export interface Songlist {
  id: number
  type: number
  mid: string
  name: string
  title: string
  subtitle: string
  singer: Singer[]
  album: Album
  mv: Mv
  interval: number
  isonly: number
  language: number
  genre: number
  index_cd: number
  index_album: number
  time_public: string
  status: number
  fnote: number
  file: File
  pay: Pay
  action: Action
  ksong: Ksong
  volume: Volume
  label: string
  url: string
  bpm: number
  version: number
  trace: string
  data_type: number
  modify_stamp: number
  pingpong: string
  aid: number
  ppurl: string
  tid: number
  ov: number
  sa: number
  es: string
  vs: string[]
  vi: number[]
  ktag: string
}

export interface Singer {
  id: number
  mid: string
  name: string
  title: string
  type: number
  uin: number
  pmid: string
}

export interface Album {
  id: number
  mid: string
  name: string
  title: string
  subtitle: string
  time_public: string
  pmid: string
}

export interface Mv {
  id: number
  vid: string
  name: string
  title: string
  vt: number
}

export interface File {
  media_mid: string
  size_24aac: number
  size_48aac: number
  size_96aac: number
  size_192ogg: number
  size_192aac: number
  size_128mp3: number
  size_320mp3: number
  size_ape: number
  size_flac: number
  size_dts: number
  size_try: number
  try_begin: number
  try_end: number
  url: string
  size_hires: number
  hires_sample: number
  hires_bitdepth: number
  b_30s: number
  e_30s: number
  size_96ogg: number
  size_360ra: any[]
  size_dolby: number
  size_new: number[]
}

export interface Pay {
  pay_month: number
  price_track: number
  price_album: number
  pay_play: number
  pay_down: number
  pay_status: number
  time_free: number
}

export interface Action {
  switch: number
  msgid: number
  alert: number
  icons: number
  msgshare: number
  msgfav: number
  msgdown: number
  msgpay: number
  switch2: number
  icon2: number
}

export interface Ksong {
  id: number
  mid: string
}

export interface Volume {
  gain: number
  peak: number
  lra: number
}

export interface SongTagInfoList {
  id: number
  tag: string
  link: string
  tagid: number
  from_type: number
}

export interface NewAlbum {
  code: number
  data: Data5
}

export interface Data5 {
  albums: Album2[]
  ret_msg: string
  total: number
}

export interface Album2 {
  id: number
  mid: string
  name: string
  trans_name: string
  singers: Singer2[]
  type: number
  language: number
  genre: number
  area: number
  movie: string
  release_time: string
  company: Company2
  status: number
  index: string
  tag: string
  pay: Pay2
  ex: Ex4
  photo: Photo2
  tmetags: string
  ex_status: number
  show_com_new: number
  companyshow: Companyshow
  modify_time: string
  str_genre: string
  album_right: number
  Fpay_control: number
  cd_album_id: string
  mini_album_id: string
  data: Data6
  album_wiki: string
}

export interface Singer2 {
  id: number
  mid: string
  name: string
  foreign_name: string
  type: number
  genre: number
  area: number
  company: Company
  grade: number
  origin: number
  enter: number
  country: number
  identity: number
  birthday: string
  instrument: number
  ex: Ex2
  photo: Photo
  opt_grade: number
  status: number
  opt_grade_new: number
  vertical_type: string
  singer_wiki: string
}

export interface Company {
  id: number
  name: string
  ex: Ex
}

export interface Ex {
  desc: string
  company_photo: number
}

export interface Ex2 {
  desc: string
  wiki: string
  tag: string
  ex_status: number
  ex_identity: number
  info_name: string
  name_spell: string
  band: string
  dieDate: string
}

export interface Photo {
  has_photo: number
  photo_cnt: number
  big_photo_flag: string
  magic_rgb: number
  pic1_flag: number
  pic2_flag: number
  pic_mid: string
}

export interface Company2 {
  id: number
  name: string
  ex: Ex3
}

export interface Ex3 {
  desc: string
  company_photo: number
}

export interface Pay2 {
  payment_total: number
  payment_album_type: number
  payment_discount: number
  payment_discount_beg: number
  payment_discount_end: number
  payment_beg: string
  payment_end: string
  pre_sale_beg: string
  str_payment_discount_beg: string
  str_payment_discount_end: string
}

export interface Ex4 {
  desc: string
  track_nums: number
  playable_track_nums: number
  album_tag3: number
  singer_tag: string
  album_tag5: string
  schedule_status: number
  long_audio_nums: number
  caliber: number
}

export interface Photo2 {
  gaus_pic: string
  has_photo: number
  pic_mid: string
  vip_flag: number
  pay_flag: number
  version: number
  primecolor: number
  magic_class: number
  magic_color: number
}

export interface Companyshow {
  id: number
  name: string
  ex: Ex5
}

export interface Ex5 {
  desc: string
  company_photo: number
}

export interface Data6 {
  int2: number
  int3: number
  update_time: string
  int4: number
}

export interface NewAlbumTag {
  code: number
  data: Data7
}

export interface Data7 {
  area: Area[]
}

export interface Area {
  name: string
  id: number
  tjreport: string
}

export interface Toplist {
  code: number
  data: Data8
}

export interface Data8 {
  group: Group[]
  refreshInterval: number
  abt: string
}

export interface Group {
  groupId: number
  groupName: string
  toplist: Toplist2[]
  type: number
  myFeatureButtonText: string
  myFeatureButtonScheme: string
}

export interface Toplist2 {
  topId: number
  recType: number
  topType: number
  updateType: number
  title: string
  titleDetail: string
  titleShare: string
  titleSub: string
  intro: string
  cornerMark: number
  period: string
  updateTime: string
  history: History
  listenNum: number
  totalNum: number
  song: Song[]
  headPicUrl: string
  frontPicUrl: string
  mbFrontPicUrl: string
  mbHeadPicUrl: string
  pcSubTopIds: any[]
  pcSubTopTitles: any[]
  subTopIds: any[]
  adJumpUrl: string
  h5JumpUrl: string
  url_key: string
  url_params: string
  tjreport: string
  rt: number
  updateTips: string
  bannerText: string
  AdShareContent: string
  abt: string
  cityId: number
  provId: number
  sinceCV: number
  musichallTitle: string
  musichallSubtitle: string
  musichallPicUrl: string
  specialScheme: string
  mbFrontLogoUrl: string
  mbHeadLogoUrl: string
  cityName: string
  magicColor: MagicColor
  topAlbumURL: string
  groupType: number
  icon: number
  adID: number
  mbIntroWebUrl: string
  mbLogoUrl: string
}

export interface History {
  year: number[]
  subPeriod: number[][]
}

export interface Song {
  rank: number
  rankType: number
  rankValue: string
  recType: number
  songId: number
  vid: string
  albumMid: string
  title: string
  singerName: string
  singerMid: string
  songType: number
  uuidCnt: number
  cover: string
  mvid: number
}

export interface MagicColor {
  r: number
  g: number
  b: number
}

export interface Focus {
  code: number
  data: Data9
}

export interface Data9 {
  content: Content[]
  id: number
  sub_cube: any[]
  title: string
}

export interface Content {
  cover: string
  id: number
  jump_info: JumpInfo
  listen_num: number
  pic_info: PicInfo
  report: string
  sub_title: string
  title: string
  type: number
}

export interface JumpInfo {
  id: number
  mid: string
  url: string
}

export interface PicInfo {
  mid: string
  url: string
  urlex1: string
  urlex2: string
}
