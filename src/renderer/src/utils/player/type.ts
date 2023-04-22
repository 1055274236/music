type BaseInfo = {
  mid: string
  name: string
}

export type Album = BaseInfo & {
  img?: string
}

export type Singer = BaseInfo & {
  img?: string
}

export type Song = BaseInfo & {
  url?: string
  album?: Album
  duration?: number
  singer?: Singer[]
}

export type Listener = {
  id: string
  fun: () => unknown
}
