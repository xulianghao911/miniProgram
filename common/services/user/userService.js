
import request from '../serviceBase.js'
class userService {
  constructor() {
    this._request = new request
    this._baseUrl = this._request.url + 'user/user/';
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }

  /**
   * 获取宝宝列表信息
   */
  fetchBabyList(data) {
    return this._request.postRequest(this._baseUrl + 'fetchBabyList', data).then(res => res.data)
  }

  /**
   * 获取性别列表
   */
  fetchSex() {
    return this._request.postRequest(this._baseUrl + 'fetchSex', {}).then(res => res.data)
  }

  /**
   * 获取民族列表
   */
  fetchNation() {
    return this._request.postRequest(this._baseUrl + 'fetchNation', {}).then(res => res.data)
  }

  /**
   * 保存宝宝信息
   */
  saveBabyInfo(data) {
    return this._request.postRequest(this._baseUrl + 'saveBabyInfo', data).then(res => res.data)
  }

  /**
   * 通过识别码保存宝宝信息
   */
  saveBabyInfoByCode(data) {
    return this._request.postRequest(this._baseUrl + 'saveBabyInfoByCode', data).then(res => res.data)
  }

}
export default userService