import request from '../serviceBase.js'
class weightService {
  constructor() {
    this._request = new request
    this._baseUrl = this._request.url + 'user/WeightPage/';
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }

  /**
   * 获取baby体重信息
   */
  fetchWeightList(data) {
    return this._request.postRequest(this._baseUrl + 'fetchWeightList', data).then(res => res.data)
  }

  /**
   * 添加体重信息
   */
  add(data) {
    return this._request.postRequest(this._baseUrl + 'add', data).then(res => res.data)
  }

  /**
   * 修改体重信息
   */
  update(data) {
    return this._request.postRequest(this._baseUrl + 'update', data).then(res => res.data)
  }

  /**
   * 删除体重信息
   */
  delete(data) {
    return this._request.postRequest(this._baseUrl + 'delete', data).then(res => res.data)
  }
}
export default weightService