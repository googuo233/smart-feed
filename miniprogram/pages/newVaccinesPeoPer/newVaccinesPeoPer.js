// pages/dogOwner/dogOwner.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    perInfo: {
      personName: '',
      personSex: '',
      address: '',
      personPhoneNumber: '',
      idCardNumber: ''
    },
    disable: '',
    foreach: [],
  },
  del() {
    this.setData({
      'perInfo.idCardNumber': ''
    })
  },
  unitName(e) {
    this.setData({
      'perInfo.personName': e.detail.value
    })
  },

  getSex(e) {
    this.setData({
      'perInfo.personSex': e.detail.value
    })
  },

  getAddress(e) {
    this.setData({
      'perInfo.address': e.detail.value
    })
    // console.log(this.data.ownerInfo.ownerAddress)
  },

  idDel(e) {
    console.log(e)
  },

  getId: function (res) {

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
            'perInfo.idCardNumber': ''
          })
        }, 1000);

      } else {
        this.setData({
          'perInfo.idCardNumber': res.detail.value
        })
      }
    }
    // console.log(res)
    if (res.detail.keyCode == 8) {
      this.setData({
        'perInfo.idCardNumber': res.detail.value
      })
    }
  },
  getMobbile(res) {
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
            'perInfo.personPhoneNumber': '',
          })
        }, 1000);
      } else {
        this.setData({
          'perInfo.personPhoneNumber': res.detail.value,
        })
      }
    }
    if (res.detail.keyCode == 8) {
      this.setData({
        'perInfo.personPhoneNumber': res.detail.value
      })
    }
  },


  btn() {
    var that = this
    var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    var reg2 = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    var tempOwner;
    if (reg.test(that.data.perInfo.idCardNumber) === false) {
      wx.showToast({
        title: '身份证号输入错误',
        icon: 'none',
        duration: 1000
      })
    }
    else if (reg2.test(that.data.perInfo.personPhoneNumber) === false) {
      wx.showToast({
        title: '手机号输入错误',
        icon: 'none',
        duration: 1000
      })
    }
    else {
      that.data.foreach.push(that.data.perInfo.personName)
      that.data.foreach.push(that.data.perInfo.personPhoneNumber)
      that.data.foreach.push(that.data.perInfo.personSex)
      that.data.foreach.push(that.data.perInfo.address)
      that.data.foreach.push(that.data.perInfo.idCardNumber)
      tempOwner = that.data.foreach;
      console.log(that.data.foreach)
      for (var i = 0; i < tempOwner.length; i++) {
        if (tempOwner[i] == '') {
          wx.showToast({
            title: '信息填写不完整',
            icon: 'none'
          })
          that.setData({
            foreach: []
          })
          break;
        }
        if (i == tempOwner.length - 1) {
          wx.navigateTo({
            url: '../newVaccinesDogPer/newVaccinesDogPer',
          })
        }
      }
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var page = getCurrentPages()
    var index = page[0].__data__.move
    var info = page[0].__data__.appointmentInfo[index]
    console.log(info.date)
    if (info != null) {
      that.setData({
        'perInfo.personName': info.date.personName,
        'perInfo.address': info.date.personAddress,
        'perInfo.idCardNumber': info.date.idCardNumber,
        'perInfo.personPhoneNumber': info.date.personPhoneNumber,
        disable: false
      })
      if (info.date.personSex == 'F') {
        that.setData({
          F: true,
          'perInfo.personSex': info.date.personSex,
        })
      }
      if (info.date.personSex == 'M') {
        that.setData({
          M: true,
          'perInfo.personSex': info.date.personSex,
        })
      }
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