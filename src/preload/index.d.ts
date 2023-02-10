import { ElectronAPI } from '@electron-toolkit/preload'
import { AxiosResponse } from 'axios'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    electronAPI: {
      apiAxios: (
        url: string,
        params: unknown,
        method: 'get' | 'post'
      ) => Promise<AxiosResponse<unknown, unknown>>
    }
  }
}
