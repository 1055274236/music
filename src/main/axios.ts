import { AxiosRequestConfig } from 'axios'
import { IpcMainInvokeEvent } from 'electron'
import axios, { AxiosHeaders } from 'axios'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'https://c.y.qq.com'

export default async function apiAxios(
  _event: IpcMainInvokeEvent,
  url: string,
  params: unknown,
  body: unknown,
  method: 'get' | 'post' = 'get',
  headers = {}
): Promise<unknown> {
  const config: AxiosRequestConfig = {
    url: url,
    data: body,
    params,
    method: method,
    headers: headers
  }
  const result = await axios(config).catch((err) => {
    throw err
  })

  if (process.env.NODE_ENV === 'development') console.log(new Date(), JSON.stringify(result.data))

  return result.data
}
