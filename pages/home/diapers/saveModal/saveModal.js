// pages/home/height/modal/modal.js
var app = new getApp();
var util = require('../../../../utils/util.js');
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示modal 
    show: { 
      type: Boolean, 
      value: false 
    }, 
    //modal的高度 
    height: { 
      type: String, 
      value: '80%' 
    },
    modalData: {
      type: Object,
      value: {},
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    diapersSizeList: [],
    index: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //  关闭模态框
    cancel() { 
      this.setData(
        { show: false }
      ) 
      this.triggerEvent('cancel') 
    }, 

    //  保存数据
    save() { 
      //  添加数据
      if (this.properties.modalData.id == 0) {
        app.diapersService.add(this.properties.modalData)
          .then(res => {
            if (res.success) {
              wx.showToast({
                title: res.msg,
                icon: 'success'
              });
              this.setData(
                { show: false }
              );
              this.list();
            } else {
              wx.showToast({
                title: res.msg,
                icon: 'none'
              })
            }
          })
          .catch(
            res => {
              wx.showToast({
                title: '出错了！',
                icon: 'none'
              })
            }
          );
      } else {
        //  修改数据
        app.diapersService.update(this.properties.modalData)
          .then(res => {
            if (res.success) {
              wx.showToast({
                title: res.msg,
                icon: 'success'
              });
              this.setData(
                { show: false }
              );
              this.list();
            } else {
              wx.showToast({
                title: res.msg,
                icon: 'none'
              })
            }
          })
          .catch(
            res => {
              wx.showToast({
                title: '出错了！',
                icon: 'none'
              })
            }
          );
      }
      
      this.triggerEvent('save') 
    },

    //  删除数据
    deleteData () {
      app.diapersService.delete({ id: this.properties.modalData.id})
        .then(res => {
          if (res.success) {
            wx.showToast({
              title: res.msg,
              icon: 'success'
            });
            this.setData(
              { show: false }
            );
            this.list();
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        })
        .catch(
          res => {
            wx.showToast({
              title: '出错了！',
              icon: 'none'
            })
          }
        );
    },

    //  使用状态变化
    useChange: function (e) {
      let temp = "modalData.isUsed";
      this.setData({
        [temp]: e.detail.value
      })
    },

    //  名称变化
    nameChange: function (e) {
      let temp = "modalData.name";
      this.setData({
        [temp]: e.detail.value
      })
    },

    //  大小改变
    sizeChange: function (e) {
      this.setData({
        index: e.detail.value
      });
      let temp = "modalData.size";
      this.setData({
        [temp]: e.detail.value
      })
    },

    //  数量变化
    numberChange: function (e) {
      let temp = "modalData.number";
      this.setData({
        [temp]: e.detail.value
      })
      // this.properties.modalData.number = e.detail.value
    },

    //  价格变化
    priceChange: function (e) {
      let temp = "modalData.price";
      this.setData({
        [temp]: e.detail.value
      })
      // this.properties.modalData.price = e.detail.value
    },

    //  使用日期变化
    beginDateChange: function (e) {
      let temp = "modalData.beginDate";
      this.setData({
        [temp]: e.detail.value
      })
      // this.properties.modalData.beginDate = e.detail.value
    },

    //  用完日期变化
    endDateChange: function (e) {
      let temp = "modalData.endDate";
      this.setData({
        [temp]: e.detail.value
      })
      // this.properties.modalData.endDate = e.detail.value
    },

    //  有效期变化
    termOfValidityChange: function (e) {
      let temp = "modalData.termOfValidity";
      this.setData({
        [temp]: e.detail.value
      })
      // this.properties.modalData.termOfValidity = e.detail.value
    },

    //  备注变化
    remarkChange: function (e) {
      let temp = "modalData.remark";
      this.setData({
        [temp]: e.detail.value
      })
      // this.properties.modalData.remark = e.detail.value
    },

    //  执行主页方法
    list () {
      this.triggerEvent('myevent', {});
    },

    //  加载纸尿裤大小
    fetchDiapersSizeList() {
      app.diapersService.fetchDiapersSizeList()
        .then(res => {
          if (res.success) {
            this.setData(
              { diapersSizeList: res.data }
            );
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
        });
    }


  },

  ready: function () {
   this.fetchDiapersSizeList();
  }
})
