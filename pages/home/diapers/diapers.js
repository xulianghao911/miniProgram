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
    diapersList: [],
    showModal: false,
    modalData: {},
    recordingDate: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMyEvent: function (e) {
      this.fetchDiapersList();
    },

    //  获取身高数据列表
    fetchDiapersList: function () {
      app.diapersService.fetchDiapersList()
        .then(res => {
          if (res.success) {
            this.setData({
              diapersList: res.data
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
        var modalData = {
          id : 0,
          name : '',
          size : 1,
          number : 0,
          price : 0,
          beginDate: date,
          endDate: date,
          termOfValidity: date,
          remark : '',
          isUsed: 0
          };
        
        this.setData({ modalData: modalData })
      } else {
        this.setData({ modalData: event.currentTarget.dataset.id })
      }
    },
  },

  ready: function () {
    this.fetchDiapersList();
  },
})
