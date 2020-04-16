
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
    milkPowderList: [],
    showModal: false,
    modalData: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMyEvent: function (e) {
      this.fetchMilkPowderList();
    },

    //  获取身高数据列表
    fetchMilkPowderList: function () {
      app.milkPowderService.fetchMilkPowderList()
        .then(res => {
          if (res.success) {
            this.setData({
              milkPowderList: res.data
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
          id: 0,
          name: '',
          section: 1,
          weight: 0,
          price: 0,
          beginDate: date,
          endDate: date,
          termOfValidity: date,
          remark: '',
          isUsed: 0
        };

        this.setData({ modalData: modalData })
      } else {
        this.setData({ modalData: event.currentTarget.dataset.id })
      }
    },
  },

  ready: function () {
    this.fetchMilkPowderList();
  },
})
