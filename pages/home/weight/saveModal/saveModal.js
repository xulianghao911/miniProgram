// pages/home/weight/modal/modal.js
var app = new getApp();
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

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
        app.weightService.add(this.properties.modalData)
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
        app.weightService.update(this.properties.modalData)
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
      app.weightService.delete({ id: this.properties.modalData.id})
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

    //  时间变化
    bindDateChange: function (e) {
      let temp = "modalData.recordingDate";
      this.setData({
        [temp]: e.detail.value
      })
    },

    //  体重变化
    heightInput: function (e) {
      let temp = "modalData.weight";
      this.setData({
        [temp]: e.detail.value
      })
    },

    //  执行主页方法
    list () {
      this.triggerEvent('myevent', {});
    },

  }
})
