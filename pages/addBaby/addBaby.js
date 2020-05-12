// pages/addBaby/addBaby.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexList: {
      type: Array,
      value: []
    }, 
    nationList: {
      type: Array,
      value: []
    },

    type: 0,
    code: '',

    date: '',
    time: '',

    index: 0,
    name: 0,
    sex: 2,
    nation: 1,
    appellation: '妈妈',

    //  图片参数
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true
  },

//  识别码添加
  codeAdd () {
    this.setData({
      type: 1
    });
  },

  //  信息添加
  infoAdd() {
    this.setData({
      type: 0
    });
  },

  //  名字改变
  nameChange: function (e) {
    this.setData({
      name: e.detail.value
    });
  },

  //  性别改变
  radioChange: function (e) {
    this.setData({
      sex: e.detail.value
    });
  },

  //  称谓改变
  appellationChange: function (e) {
    this.setData({
      appellation: e.detail.value
    });
  },

  //  日期变化
  bindDateChange: function (e) {
      this.setData({
        date: e.detail.value
      });
  },

  //  时间变化
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    });
  },

  //  民族改变
  nationChange: function(e) {
    this.setData({
      index: e.detail.value
    });
    this.setData({
      nation: this.data.nationList[e.detail.value].id
    });
  },

  //  识别码改变
  codeChange: function (e) {
    this.setData({
      code: e.detail.value
    });
  },

  //  获取性别列表
  fetchSex() {
    app.userService.fetchSex()
    .then(res => {
      if (res.success) {
        this.setData({
          sexList: res.data
        });
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        });
        wx.navigateTo({
          url: '../error/error'
        })
      }
    })
    .catch(res => {
      wx.showToast({
        title: '服务异常！',
        icon: 'none'
      })
    });
  },

  //  获取民族列表
  fetchNation() {
    app.userService.fetchNation()
      .then(res => {
        if (res.success) {
          this.setData({
            nationList: res.data
          });
          this.setData({
            nation: res.data[this.data.index].id
          });
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          });
        }
      })
      .catch(res => {
        wx.showToast({
          title: '服务异常！',
          icon: 'none'
        })
      });
  },
  
  // 删除图片
  clearImg: function (e) {
    var nowList = [];//新数据
    var uploaderList = this.data.uploaderList;//原数据

    for (let i = 0; i < uploaderList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploaderList[i])
      }
    }
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })
  },
  //展示图片
  showImg: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        const tempFilePaths = res.tempFilePaths
        var uploadTask = wx.uploadFile({
          url: app.userService._request.url + 'file/Upload/uploadAvatar',
          filePath: tempFilePaths[0],
          header: {
            'content-type': 'application/json'
          },
          name: 'file',
          formData: null,
          success(res) {
            var back = JSON.parse(res.data);
            if (back.success) {
              let tempFilePaths = back.data;
              let uploaderList = that.data.uploaderList.concat(tempFilePaths);
              if (uploaderList.length == 1) {
                that.setData({
                  showUpload: false
                })
              }
              that.setData({
                uploaderList: uploaderList,
                uploaderNum: uploaderList.length,
              })
            } else {
              wx.showToast({
                title: back.msg,
                icon: 'none'
              })
            }
          }
        });

        uploadTask.onProgressUpdate((result) => {
          console.log('上传进度', result.progress)
          console.log('已经上传的数据长度', result.totalBytesSent)
          console.log('预期需要上传的数据总长度', result.totalBytesExpectedToSend)
        })

      }
    })
  },

  //  提交
  save: function() {
    if (this.data.type == 0) {
      if (!this.data.name) {
        wx.showToast({
          title: '请输入姓名',
          icon: 'none'
        });
        return;
      }
      if (!this.data.date) {
        wx.showToast({
          title: '请选择出生日期',
          icon: 'none'
        });
        return;
      }
      if (!this.data.time) {
        wx.showToast({
          title: '请选择出生时间',
          icon: 'none'
        });
        return;
      }
      if (this.data.uploaderList.length == 0) {
        wx.showToast({
          title: '请上传头像',
          icon: 'none'
        });
        return;
      }
      const data = {
        name: this.data.name,
        sex: this.data.sex,
        appellation: this.data.appellation,
        avatarPath: this.data.uploaderList,
        nation: this.data.nation,
        date: this.data.date,
        time: this.data.time,
      };
      app.userService.saveBabyInfo(data)
      .then(res => {
        if (res.success) {
          wx.showToast({
            title: '提交成功',
            icon: 'success'
          });
          wx.navigateTo({
            url: '../index/index'
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          });
        }
      })
      .catch(res => {
        wx.showToast({
          title: '服务异常',
          icon: 'none'
        });
      });
    } else {
      if (!this.data.code) {
        wx.showToast({
          title: '请输入识别码',
          icon: 'none'
        });
      }
      const data = {
        code: this.data.code,
        appellation: this.data.appellation
      };
      app.userService.saveBabyInfoByCode(data)
        .then(res => {
          if (res.success) {
            wx.showToast({
              title: '提交成功',
              icon: 'success'
            });
            wx.navigateTo({
              url: '../index/index'
            })
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            });
          }
        })
        .catch(res => {
          wx.showToast({
            title: '服务异常',
            icon: 'none'
          });
        });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dateTime = util.formatTime(new Date());
    this.setData({
      date: dateTime.substring(0, 10)
    });

    this.setData({
      time: dateTime.substring(11, 16)
    });
    this.fetchSex();
    this.fetchNation();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
    let pages = getCurrentPages(); //页面栈
    let beforePage = pages[pages.length - 2];
    // console.log(beforePage.route)

    // wx.navigateBack({
    //   delta: 1, //返回的页面数，如果 delta 大于现有页面数，则返回到首页。
    //   success: function () {
    //     if (beforePage.route == 'pages/commodity/mySupply') {
    //       beforePage.onLoad() //这个函数式调用接口的函数
    //     }
    //   }
    // })

    // wx.switchTab({});    //tabBar页面的跳转
    wx.navigateTo({       //非tabBar页面的跳转
      url: '/' + beforePage.route,
      success: function () {
        if (beforePage.route == 'pages/index/index') {
          beforePage.fetchBabyList()
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
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