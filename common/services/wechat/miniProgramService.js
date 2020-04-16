import request from '../serviceBase.js'
class miniProgramService {
  constructor() {
    this._request = new request
    this._baseUrl = this._request.url + 'wechat/MiniProgram/';
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }

  /**
   * 获取用户openid
   */
  fetchOpenid(data) {
    return this._request.postRequest(this._baseUrl + 'fetchOpenid', data).then(res => res.data)
  }
}
export default miniProgramService