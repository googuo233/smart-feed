// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: "",//登录的页面值
    username: '',
    password: '',
    lawInfo: [],
    lawEnforcers: '',
    addPerson: ''
  },
  username(e) {
    this.setData({
      username: e.detail.value
    })
  },
  password(e) {
    this.setData({
      password: e.detail.value
    })
  },

  btn(e) {
    var that = this
    var page = getCurrentPages()
    // console.log(page[0].__data__.login)
    if (page[0].__data__.login == 1) {  //执法处理

//输入用户名和密码和微信号绑定
      wx.request({
        url: app.globalData.ipAddress + '/LawManagement/addOpenid',
        method: 'GET',
        header: {
          "Content-Type": "json",
        },
        data: {
          id: that.data.username,
          password: that.data.password,
          openId:app.globalData.openId
        },
        success(res) {
          console.log(res)
          if (res.data.code == 0) {
            wx.showToast({
              title: '账号或密码输入错误',
              icon: 'none',
              duration:1000
            })
          }
        else  if (res.data.code == 2) {
            wx.showToast({
              title: '您输入的账号已绑定，如有问题请联系管理员',
              icon: 'none',
              duration:3000
            })
          }
          else if (res.data.code == 1) {
            that.setData({
              lawEnforcers: res.data.data.name,

            })
            // 允许从相机和相册扫码
            wx.scanCode({
              success: (res) => {
                var result = res.result.split('=');
                console.log(result)
                wx.request({
                  url: app.globalData.ipAddress + '/dogBrandPerson/selectDogBrandBySerialId',
                  method: 'GET',
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  data: {
                    serialId: result[1]
                  },
                  success(res) {
                    console.log(res)
                    if (res.data.code == 1 || res.data.code == 2) {
                      that.setData({
                        lawInfo: res.data.data,
                        unitInfo: res.data.data
                      })
                      wx.navigateTo({
                        url: '../scanDetail/scanDetail',
                        // 执法处理
                      })
                    } else {
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                      })
                    }

                  },
                  fail(res) {
                    wx.showToast({
                      title: '网络异常',
                      icon: 'none'
                    })
                  }
                })
              }
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '网络异常',
            icon: 'none'
          })
        }
      })

    }
    else if (page[0].__data__.login == 2) {
      wx.request({
        url: app.globalData.ipAddress + '/LawManagement/addOpenid',
        method: 'GET',
        header: {
          "Content-Type": "json",
        },
        data: {
          id: that.data.username,
          password: that.data.password,
          openId:app.globalData.openId
        },
        success(res) {
          console.log(res)
          if (res.data.code == 0) {
            wx.showToast({
              title: '账号或密码输入错误',
              icon: 'none',
              duration:1000
            })
          }
        else if (res.data.code == 2) {
            wx.showToast({
              title: '您输入的账号已绑定，如有问题请联系管理员',
              icon: 'none',
              duration:3000
            })
          }
          else if (res.data.code == 1) {
            that.setData({
              lawEnforcers: res.data.data.name
            })
            wx.navigateTo({
              url: '../captureReason/captureReason',
            })
          }
        }
      })
    }













  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    var page = getCurrentPages()
    // console.log(page[0].__data__.login)
    if (page[0].__data__.login == 1) {  //执法处理
//进入这个页面后先查询openid是否有执法权力，如果有就直接扫码
      wx.request({
        url: app.globalData.ipAddress + '/LawManagement/loginAsOpenid',
        method: 'GET',
        header: {
          "Content-Type": "json",
        },
        data: {
          openId:app.globalData.openId
        },
        success(res) {
          console.log(res)
          if (res.data.code == 0) {
            wx.showToast({
              title: '请登录',
              icon: 'none'
            })
          }
          else if (res.data.code == 1) {
            that.setData({
              lawEnforcers: res.data.data.name,
            })
            // 允许从相机和相册扫码
            wx.scanCode({
              success: (res) => {
                var result = res.result.split('=');
                console.log(result)
                wx.request({
                  url: app.globalData.ipAddress + '/dogBrandPerson/selectDogBrandBySerialId',
                  method: 'GET',
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  data: {
                    serialId: result[1]
                  },
                  success(res) {
                    console.log(res)
                    if (res.data.code == 1 || res.data.code == 2) {
                      that.setData({
                        lawInfo: res.data.data,
                        unitInfo: res.data.data
                      })
                      wx.navigateTo({
                        url: '../scanDetail/scanDetail',
                        // 执法处理
                      })
                    } else {
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                      })
                    }

                  },
                  fail(res) {
                    wx.showToast({
                      title: '网络异常',
                      icon: 'none'
                    })
                  }
                })
              }
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '网络异常',
            icon: 'none'
          })
        }
      })

    }
    else if (page[0].__data__.login == 2) {
      wx.request({
        url: app.globalData.ipAddress + '/LawManagement/loginAsOpenid',
        method: 'GET',
        header: {
          "Content-Type": "json",
        },
        data: {
          openId:app.globalData.openId
        },
        success(res) {
          console.log(res)
          if (res.data.code == 0) {
            wx.showToast({
              title: '请登录',
              icon: 'none'
            })
          }
          else if (res.data.code == 1) {
            that.setData({
              lawEnforcers: res.data.data.name
            })
            wx.navigateTo({
              url: '../captureReason/captureReason',
            })
          }
        }
      })
    }
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