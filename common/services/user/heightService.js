import request from '../serviceBase.js'
class heightService {
  constructor() {
    this._request = new request
    this._baseUrl = this._request.url + 'user/HeightPage/';
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }

  /**
   * 获取baby身高信息
   */
  fetchHeightList(data) {
    return this._request.postRequest(this._baseUrl + 'fetchHeightList', data).then(res => res.data)
  }

  /**
   * 添加身高信息
   */
  add(data) {
    return this._request.postRequest(this._baseUrl + 'add', data).then(res => res.data)
  }

  /**
   * 修改身高信息
   */
  update(data) {
    return this._request.postRequest(this._baseUrl + 'update', data).then(res => res.data)
  }

  /**
   * 删除身高信息
   */
  delete(data) {
    return this._request.postRequest(this._baseUrl + 'delete', data).then(res => res.data)
  }
}
export default heightService