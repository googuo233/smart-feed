// miniprogram/pages/adoptInfo/adoptInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  //单选框
  data: {
    name: '',
    sex: '',
    IdNum: '',
    phone: "",
    info: []
  },
  name(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getSex(e) {
    this.setData({
      sex: e.detail.value
    })
  },
  idcard(res) {
    if (res.detail.value.length === 18) {
      var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if (reg.test(res.detail.value) === false) {
        wx.showToast({
          title: '身份证输入不合法!',
          icon: 'none',
          duration: 1000
        })
        setTimeout(() => {
          this.setData({
            IdNum: ''
          })
        }, 1000);

      } else {
        this.setData({
          IdNum: res.detail.value
        })
      }
    }
    // console.log(res)
    if (res.detail.keyCode == 8) {
      this.setData({
        IdNum: res.detail.value
      })
    }
  },
  phone(res) {
    if (res.detail.value.length === 11) {
      var reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (reg.test(res.detail.value) === false) {
        wx.showToast({
          title: '手机号码输入有误！',
          icon: 'none',
          duration: 1000
        })
        setTimeout(() => {
          this.setData({
            phone: '',
          })
        }, 1000);
      } else {
        this.setData({
          phone: res.detail.value,
        })
      }
    }
    if (res.detail.keyCode == 8) {
      this.setData({
        phone: res.detail.value
      })
    }
  },

  jumpPage: function () {
    console.log(this.data)
    var that = this
    var that = this
    var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    var reg2 = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (reg.test(that.data.IdNum) === false) {
      wx.showToast({
        title: '身份证输入不合法！',
        icon: 'none',
        duration: 1000
      })
      that.setData({
        IdNum: ''
      })
    }
    else if (reg2.test(that.data.phone) === false) {
      wx.showToast({
        title: '手机号码输入有误！',
        icon: 'none',
        duration: 1000
      })
      that.setData({
        phone: ''
      })
    }
    if (that.data.name != '' && that.data.sex != '' && that.data.IdNum != '' && that.data.phone != '') {
      wx.request({
        url: app.globalData.ipAddress + '/adoptionList/add',
        data: {
          id: 124,
          adoptionId: that.data.info.id,
          name: that.data.name,
          phoneNumber: that.data.phone,
          idCardNumber: that.data.IdNum
        },
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success(res) {
          console.log(res)
          if (res.data.code == 1) {
            wx.navigateTo({
              url: '../adoptSuccess/adoptSuccess',
            })
          }
          else (
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          )
        }
      })
    } else {
      wx.showToast({
        title: '信息填写不完整',
        icon: 'none'
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = getCurrentPages()
    var that = this
    var index = page[1].__data__.index
    console.log(page)
    that.setData({
      info: page[1].__data__.faiInfo[index]
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