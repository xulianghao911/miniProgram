// pages/home/home.js
var app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: '',
    tabList: []
  },

  switchTab(e) {
    // let tab = e.currentTarget.id
    // if (tab === 'tabHeight') {
    //   this.setData({ currentTab: 0 })
    // } else if (tab === 'tabWeight') {
    //   this.setData({ currentTab: 1 })
    // } else if (tab === 'tabDiapers') {
    //   this.setData({ currentTab: 2 })
    // } else if (tab === 'tabMilkPowder') {
    //   this.setData({ currentTab: 3 })
    // } else if (tab === 'tabSuckle') {
    //   this.setData({ currentTab: 4 })
    // } else {
    //   this.setData({ currentTab: 5 })
    // }
    this.setData({ currentTab: e.currentTarget.id })
  },

  //  获取tab标签列表
  fetchTabList () {
    app.manageService.fetchTabList()
      .then(res => {
        if (res.success) {
          this.setData({
            tabList: res.data,
            currentTab: res.data[0].tabCode
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
      .catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.fetchTabList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})