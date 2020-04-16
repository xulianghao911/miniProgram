// pages/home/babyCode/manage.js
var app = getApp();
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
    sexList: {
      type: Array,
      value: []
    },
    nationList: {
      type: Array,
      value: []
    },
    babyInfo: {
      type: Object,
      value: {}
    },

    type: 0,
    code: '',

    date: '',
    time: '',

    index: 0,
    name: 0,
    sex: 1,
    nation: 1,

    //  图片参数
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //  识别码生成
    codeMake() {
      this.setData({
        type: 1
      });
      this.fetchCode();
    },

    //  获取识别码
    fetchCode: function () {
      app.manageService.fetchCode()
      .then(res => {
        if (res.success) {
          this.setData({
            code: res.data
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

    //  信息展示
    infoShow() {
      this.setData({
        type: 0
      });
    },

    //  名字改变
    nameChange: function (e) {
      let temp = "babyInfo.name";
      this.setData({
        [temp]: e.detail.value
      })
      // this.data.babyInfo.name = e.detail.value;
    },

    //  性别改变
    radioChange: function (e) {
      let temp = "babyInfo.sex";
      this.setData({
        [temp]: e.detail.value
      })
      // this.data.babyInfo.sex = e.detail.value
    },

    //  日期变化
    bindDateChange: function (e) {
      let temp = "babyInfo.date";
      this.setData({
        [temp]: e.detail.value
      })
      // this.data.babyInfo.date = e.detail.value
    },

    //  时间变化
    bindTimeChange: function (e) {
      let temp = "babyInfo.time";
      this.setData({
        [temp]: e.detail.value
      })
      // this.data.babyInfo.time = e.detail.value
    },

    //  民族改变
    nationChange: function (e) {
      this.setData({
        index: e.detail.value
      });
      let temp = "babyInfo.nation";
      this.setData({
        [temp]: this.data.nationList[e.detail.value].id
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

    //  获取宝宝信息
    fetchBabyInfo() {
      app.manageService.fetchBabyInfo()
      .then(res => {
        if (res.success) {
          this.setData({
            babyInfo: res.data
          });
          this.setData({
            index: res.data.nation - 1,
            uploaderList: res.data.avatarPath,
            uploaderNum: res.data.avatarPath.length,
            showUpload: false
          });
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
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

    //  修改宝宝信息
    save: function () {
      if (this.data.code == 0) {
        if (!this.data.babyInfo.name) {
          wx.showToast({
            title: '请输入姓名',
            icon: 'none'
          });
          return;
        }
        if (!this.data.babyInfo.date) {
          wx.showToast({
            title: '请选择出生日期',
            icon: 'none'
          });
          return;
        }
        if (!this.data.babyInfo.time) {
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
        this.data.babyInfo.avatarPath = this.data.uploaderList;
        app.manageService.updateBabyInfo(this.data.babyInfo)
          .then(res => {
            if (res.success) {
              wx.showToast({
                title: '修改成功',
                icon: 'success'
              });
            } else {
              wx.showToast({
                title: res.msg,
                icon: 'none'
              });
              if (res.errorCode == 1002) {
                //  跳转到添加页面
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../addBaby/addBaby'
                  })
                }, 3000);
              }
            }
          })
          .catch(res => {
            wx.showToast({
              title: '服务异常',
              icon: 'none'
            });
          });
      } else {
        wx.showToast({
          title: '页面错误',
          icon: 'none'
        });
      }
    },

    //  复制识别码
    copyText: function () {
      wx.setClipboardData({
        data: this.data.code,
        success(res) {
          wx.getClipboardData({
            success(res) {
              wx.showToast({
                title: '复制成功'
              })
            }
          })
        },
        fail() {
          wx.showToast({
            title: '复制失败',
            icon: 'none'
          });
        }
      })
    }
  },

  ready: function () {
    this.fetchSex();
    this.fetchNation();
    this.fetchBabyInfo();
  }
})
