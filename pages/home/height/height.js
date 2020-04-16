// pages/home/height/height.js
var app = new getApp();
var util = require('../../../utils/util.js');
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    heightList: [],
    showModal: false,
    modalData: {},
    recordingDate: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMyEvent: function (e) {
      this.fetchHeightList();
    },

    //  获取身高数据列表
    fetchHeightList: function() {
      app.heightService.fetchHeightList()
      .then(res => {
          if (res.success) {
            this.setData({
              heightList: res.data
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

    //  模态框事件
    modal: function (event) {
      this.setData({ showModal: true })
      if (!event.currentTarget.dataset.id) {
        var date = util.formatDate(new Date());
        this.setData({ modalData: { recordingDate: date, height: 50, id: 0} })
      } else {
        this.setData({ modalData: event.currentTarget.dataset.id })
      }
    },
  },

  ready: function () {
    this.fetchHeightList();
  },
})
