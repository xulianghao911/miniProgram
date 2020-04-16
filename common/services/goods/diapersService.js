import request from '../serviceBase.js'
class diapersService {
  constructor() {
    this._request = new request
    this._baseUrl = this._request.url + 'goods/DiapersPage/';
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }

  /**
   * 获取baby使用纸尿裤信息
   */
  fetchDiapersList(data) {
    return this._request.postRequest(this._baseUrl + 'fetchDiapersList', data).then(res => res.data)
  }

  /**
   * 获取纸尿裤大小列表
   */
  fetchDiapersSizeList() {
    return this._request.postRequest(this._baseUrl + 'fetchDiapersSizeList', {}).then(res => res.data)
  }

  /**
   * 添加纸尿裤信息
   */
  add(data) {
    return this._request.postRequest(this._baseUrl + 'add', data).then(res => res.data)
  }

  /**
   * 修改纸尿裤信息
   */
  update(data) {
    return this._request.postRequest(this._baseUrl + 'update', data).then(res => res.data)
  }

  /**
   * 删除纸尿裤信息
   */
  delete(data) {
    return this._request.postRequest(this._baseUrl + 'delete', data).then(res => res.data)
  }
}
export default diapersService