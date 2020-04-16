/**
 * name: serviceBase.js
 * description: request处理基础类
 * author: 徐磊(简书分享)
 * date: 2018-5-19
 */
class request {
  //url = 'http://localhost:8082/api/';
  url = 'https://baby.chongzhe.site/api/';
  openid = '';
  bId = 0;

  constructor() {
    this.makeHeader();
  }

  makeHeader () {
    this.openid = wx.getStorageSync('openid');
    this.bId = wx.getStorageSync('bId');
    this._header = {
      'Content-Type': 'application/json',
      'openid': !this.openid ? '' : this.openid,
      'bId': !this.bId ? 0 : this.bId
    }
  }

  /**
   * 设置统一的异常处理
   */
  setErrorHandler(handler) {
    this._errorHandler = handler;
  }

  /**
   * GET类型的网络请求
   */
  getRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'GET')
  }

  /**
   * DELETE类型的网络请求
   */
  deleteRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'DELETE')
  }

  /**
   * PUT类型的网络请求
   */
  putRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'PUT')
  }

  /**
   * POST类型的网络请求
   */
  postRequest(url, data) {
    this.makeHeader();
    return this.requestAll(url, data, this._header, 'POST')
  }

  /**
   * 网络请求
   */
  requestAll(url, data, header, method) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        header: header,
        method: method,
        success: (res => {
          if (res.statusCode === 200) {
            if (res.data.errorCode == 1002) {
              wx.navigateTo({
                url: '../index/index'
              });
              reject(res.data.msg)
            }
            
            //200: 服务端业务处理正常结束
            resolve(res)
          } else {
            //其它错误，提示用户错误信息
            if (this._errorHandler != null) {
              //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
              this._errorHandler(res)
            }
            reject(res)
          }
        }),
        fail: (res => {
          if (this._errorHandler != null) {
            this._errorHandler(res)
          }
          reject(res)
        })
      })
    })
  }
}

export default request