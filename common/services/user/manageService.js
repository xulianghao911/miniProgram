import request from '../serviceBase.js'
class manageService {
  constructor() {
    this._request = new request
    this._baseUrl = this._request.url + 'user/Manage/';
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }

  /**
   * 获取code识别码
   */
  fetchCode() {
    return this._request.postRequest(this._baseUrl + 'fetchCode', {}).then(res => res.data)
  }

  /**
   * 获取baby信息
   */
  fetchBabyInfo() {
    return this._request.postRequest(this._baseUrl + 'fetchBabyInfo', {}).then(res => res.data)
  }

  /**
  * 修改baby信息
  */
  updateBabyInfo(data) {
    return this._request.postRequest(this._baseUrl + 'updateBabyInfo', data).then(res => res.data)
  }

  /**
  * 获取tab标签列表
  */
  fetchTabList() {
    return this._request.postRequest(this._baseUrl + 'fetchTabList', {}).then(res => res.data)
  }

}
export default manageService