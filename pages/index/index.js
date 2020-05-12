
//index.js
const watch = require("../../common/lib/watch.js");
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: '你好，',
    userInfo: {},
    hasUserInfo: false,
    babyList: [],
    defaultImage: app.userService._request.url + 'img/logo.png',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    watch.setWatcher(this);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function(e) {
    if (!e.detail.userInfo) {
      wx.showToast({
        title: '登录异常！',
        icon: 'none'
      });
      return;
    }
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },

  //  获取宝宝列表信息
  fetchBabyList: function () {
    try {
      var value = wx.getStorageSync('openid')
      if (value) {
        this.openid = value
      }
    } catch (e) {
      wx.showToast({
        title: '登录异常！',
        icon: 'none'
      })
    }
    app.userService.fetchBabyList({ openid: value})
      .then(res => {
        if (res.success) {
          this.setData({
            babyList: res.data
          })
        } else {
          wx.showToast({
            title:'未获取到宝宝信息，正在跳转到添加页面....',
            icon: 'none'
          });

          //  跳转到添加页面
          setTimeout(function () {
            wx.navigateTo({
              url: '../addBaby/addBaby'
            })
          }, 1000);
        }
      })
      .catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        })
      })
  },

  jumpAdd: function() {
    wx.navigateTo({
      url: '../addBaby/addBaby'
    })
  },

  //  选择哪个宝宝
  clickBaby: function(e) {
    var babyInfo = e.currentTarget.dataset.id;
    wx.setStorageSync('bId', babyInfo.bId);
    wx.navigateTo({
      url: '../home/home'
    })
  },

  watch: {
    hasUserInfo: function(value) {
      if (value) {
        //  获取宝宝列表信息
        this.fetchBabyList();
        }
    }
  }

    
  
})
