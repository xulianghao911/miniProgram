//app.js
import diapersService from './common/services/goods/diapersService.js';
import milkPowderService from './common/services/goods/milkPowderService.js'
import heightService from './common/services/user/heightService.js';
import suckleService from './common/services/user/suckleService.js'
import userService from './common/services/user/userService.js'
import manageService from './common/services/user/manageService.js'
import weightService from './common/services/user/weightService.js'
import miniProgramService from './common/services/wechat/miniProgramService.js'

App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var data = { 'code': res.code};
        this.miniProgramService.fetchOpenid(data)
        .then(res => {
          if (res.success) {
            wx.setStorageSync('openid', res.data.openid);
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        })
        .catch(res => {
          wx.showToast({
            title: '通讯失败',
            icon: 'none'
          })
        });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 这里这么写，是要在其他界面监听，而不是在app.js中监听，而且这个监听方法，需要一个回调方法。
  // watch:function(method){
  //   var obj = this.globalData;
  //   Object.defineProperty(obj,"name", {
  //     configurable: true,
  //     enumerable: true,
  //     set: function (value) {
  //       this._name = value;
  //       console.log('是否会被执行2')
  //       method(value);
  //     },
  //     get:function(){
  //     // 可以在这里打印一些东西，然后在其他界面调用getApp().globalData.name的时候，这里就会执行。
  //       return this._name
  //     }
  //   })
  // },
  globalData: {
    userInfo: null
  },
  diapersService: new diapersService(),
  milkPowderService: new milkPowderService(),
  heightService: new heightService(),
  suckleService: new suckleService(),
  userService: new userService(),
  weightService: new weightService(),
  miniProgramService: new miniProgramService(),
  manageService: new manageService()
})