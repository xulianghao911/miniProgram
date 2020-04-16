import request from '../serviceBase.js'
class milkPowderService {
  constructor() {
    this._request = new request
    this._baseUrl = this._request.url + 'goods/MilkPowderPage/';
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }

  /**
   * 获取baby使用奶粉信息
   */
  fetchMilkPowderList(data) {
    return this._request.postRequest(this._baseUrl + 'fetchMilkPowderList', data).then(res => res.data)
  }

  /**
   * 添加奶粉信息
   */
  add(data) {
    return this._request.postRequest(this._baseUrl + 'add', data).then(res => res.data)
  }

  /**
   * 修改奶粉信息
   */
  update(data) {
    return this._request.postRequest(this._baseUrl + 'update', data).then(res => res.data)
  }

  /**
   * 删除奶粉信息
   */
  delete(data) {
    return this._request.postRequest(this._baseUrl + 'delete', data).then(res => res.data)
  }
}
export default milkPowderService