import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    app: {
      quit: () => void
      maximize: () => void
      minimize: () => void
    }
    electronAPI: {
      apiAxios: (
        url: string,
        query: unknown,
        body: unknown,
        method: 'get' | 'post',
        headers?
      ) => Promise<unknown>
      readFile: (path: string) => string
      saveFile: (path: string, context: string) => void
    }
  }
}
