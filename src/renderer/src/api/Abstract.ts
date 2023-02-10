import axios, { AxiosResponse } from 'axios'
import qs from 'qs'

const timeout = 16000
// 请求超时时间
axios.defaults.timeout = timeout

class Abstract {
  // 自定义header头
  // protected headers = {
  //   ContentType: 'application/json;charset=UTF-8'
  // }

  // private apiAxios({
  //   url,
  //   params = {},
  //   method,
  //   headers = this.headers
  // }: AxiosRequestConfig): Promise<AxiosResponse> {
  //   const config: AxiosRequestConfig = {
  //     url: url,
  //     data: params,
  //     params,
  //     method: method,
  //     headers: headers
  //   }

  //   return new Promise((resolve, reject) => {
  //     axios(config)
  //       .then((res) => {
  //         resolve(res)
  //       })
  //       .catch((err) => {
  //         reject(err.toString())
  //       })
  //   })
  // }

  /**
   * GET类型的网络请求
   */
  protected getReq(url: string, params: unknown): Promise<AxiosResponse<unknown, unknown>> {
    return window.electronAPI.apiAxios(url + qs.stringify(params), {}, 'get')
    // return this.apiAxios({ url: url + qs.stringify(params), method: 'get' })
  }

  /**
   * POST类型的网络请求
   */
  protected postReq(url: string, params: unknown): Promise<AxiosResponse<unknown, unknown>> {
    return window.electronAPI.apiAxios(url, params, 'post')
    // return this.apiAxios({ url, params, method: 'post' })
  }
}

export default Abstract
