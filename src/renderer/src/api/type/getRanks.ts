export interface GetRanks {
  code: number
  ts: number
  start_ts: number
  traceid: string
  req_1: Req1
}

export interface Req1 {
  code: number
  data: Data
}

export interface Data {
  data: Data2
  songInfoList: unknown[]
  extInfoList: unknown[]
  songTagInfoList: unknown
  indexInfoList: unknown
}

export interface Data2 {
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
  pcSubTopIds: unknown[]
  pcSubTopTitles: unknown[]
  subTopIds: unknown[]
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
  year: unknown[]
  subPeriod: unknown[]
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
