// pages/annual/annual.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unitname: "",
    unitid: "",
    code: ''
  },
  iptname(res) {
    // console.log(res.detail.value)
    this.setData({
      unitname: res.detail.value
    })
  },
  iptid(res) {
    // console.log(res.detail.value)
    this.setData({
      unitid: res.detail.value
    })
  },

  btn() {
    var that = this
    console.log(this.data)
    if (that.data.code != 1) {
      if (this.data.unitname == "") {
        wx.showToast({
          title: '请填写姓名',
          icon: "none"
        })
      } else if (this.data.unitid == "") {
        wx.showToast({
          title: '请输入身份证号',
          icon: "none"
        })
      } else if (this.data.unitid.length != 18) {
        wx.showToast({
          title: '身份证号未满18位',
          icon: "none"
        })
      }
      else {
        // 接口位置
        wx.request({
          url: app.globalData.ipAddress + '/dogBrandBusiness/selectInfo',
          data: {
            idCardNumber: that.data.unitid,
            personId: app.globalData.openId
          },
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          complete(res) {
            console.log(res.data)
            if (res.data.code == 1) {
              that.setData({
                res: res
              })
              wx.navigateTo({
                url: '../unitDogOwner/unitDogOwner',
              })
            }
            else {
              wx.showToast({
                title: res.data.msg,
                icon: "none",
                duration: 3000,
              })
              setTimeout(() => {
                wx.navigateBack({
                  delta: 0,
                })
              }, 3000);
            }
          }
        })
      }
    }
    else {
      wx.showToast({
        title: '您已拥有犬牌，请勿重复申领',
        icon: 'none'
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.ipAddress + '/dogBrandPerson/selectInfoByPersonId',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        personId: app.globalData.openId
      },
      success(res) {
        console.log(res)
        that.setData({
          code: res.data.code
        })
      }
    })
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