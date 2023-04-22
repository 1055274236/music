import axios from 'axios'

const timeout = 16000
// 请求超时时间
axios.defaults.timeout = timeout

const headers = {
  ContentType: 'application/json;charset=UTF-8',
  referer: 'https://c.y.qq.com/',
  host: 'c.y.qq.com'
  // cookie: 'qm_keyst=Q_H_L_5y5w-7wFqbJy04fYHsa1fcq_wPHElLZeJ3ucZbwqwldUx4CCKb919BA; uid=2770295960;'
}

class Abstract {
  /**
   * GET类型的网络请求
   */
  protected getReq(url: string, query: unknown): Promise<unknown> {
    return window.electronAPI.apiAxios(url, query, {}, 'get', headers)
  }

  /**
   * POST类型的网络请求
   */
  protected postReq(url: string, query: unknown = {}, body: unknown = {}): Promise<unknown> {
    return window.electronAPI.apiAxios(url, query, body, 'post', headers)
  }

  protected simplePostReq(url: string, body: unknown = {}, query: unknown = {}): Promise<unknown> {
    return window.electronAPI.apiAxios(url, query, body, 'post')
  }
  protected simpleGetReq(url: string, query: unknown): Promise<unknown> {
    return window.electronAPI.apiAxios(url, query, {}, 'get')
  }
}

export default Abstract
