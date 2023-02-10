import { AxiosRequestConfig } from 'axios'
import { IpcMainInvokeEvent } from 'electron'
import axios from 'axios'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'https://c.y.qq.com'

const headers = {
  ContentType: 'application/json;charset=UTF-8',
  referer: 'https://c.y.qq.com/',
  host: 'c.y.qq.com'
}

export default async function apiAxios(
  _event: IpcMainInvokeEvent,
  url: string,
  params: unknown,
  method: 'get' | 'post' = 'get'
): Promise<unknown> {
  const config: AxiosRequestConfig = {
    url: url,
    data: params,
    params: params,
    method: method,
    headers: headers
  }
  const result = await axios(config).catch((err) => {
    throw err
  })
  return result.data
}
