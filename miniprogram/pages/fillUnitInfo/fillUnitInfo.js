// pages/dogOwner/dogOwner.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    perInfo: {
      unitName: '',
      chargeName: '',
      chargeSex: '',
      address: '',
      phoneNumber: '',
      chargeIdCardNumber: ''
    },
    disable: '',
    foreach: []
  },

  getUnit(e) {
    this.setData({
      'perInfo.unitName': e.detail.value
    })
  },

  getName(e) {
    this.setData({
      'perInfo.chargeName': e.detail.value
    })
  },

  getSex(e) {
    this.setData({
      'perInfo.chargeSex': e.detail.value
    })
  },

  getAddress(e) {
    this.setData({
      'perInfo.address': e.detail.value
    })
    // console.log(this.data.ownerInfo.ownerAddress)
  },
  getId: function (res) {
    if (res.detail.value.length === 18) {
      var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if (reg.test(res.detail.value) === false) {
        wx.showToast({
          title: '身份证输入不合法！',
          icon: 'none',
        })
      } else {
        this.setData({
          'perInfo.chargeIdCardNumber': res.detail.value
        })
      }

    }
    if (res.detail.keyCode == 8) {
      this.setData({
        'perInfo.chargeIdCardNumber': res.detail.value
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
        })
      } else {
        this.setData({
          'perInfo.phoneNumber': res.detail.value,
        })
      }
    }
    if (res.detail.keyCode == 8) {
      this.setData({
        'perInfo.phoneNumber': res.detail.value,
      })
    }
  },


  btn() {
    // that.data.foreach.push(that.data.perInfo.unitName)
    // that.data.foreach.push(that.data.perInfo.chargeName)
    // that.data.foreach.push(that.data.perInfo.phoneNumber)
    // that.data.foreach.push(that.data.perInfo.chargeSex)
    // that.data.foreach.push(that.data.perInfo.address)
    // that.data.foreach.push(that.data.perInfo.chargeIdCardNumber)
    // console.log(that.data.foreach)
    // for(var i=0;i<tempOwner.length;i++){
    //   if(tempOwner[i]==''){
    //     wx.showToast({
    //       title: '信息填写有误或者不完整',
    //       icon:'none'
    //     })
    //     that.setData({
    //       foreach:[]
    //     })
    //     break;
    //   }
    //   if(i==tempOwner.length-1){
    //       wx.navigateTo({
    //     url: '../fillUnitDogInfo/fillUnitDogInfo',
    //   })
    //   }
    // }
    var that = this
    var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    var reg2 = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    var tempOwner;
    if (reg.test(that.data.perInfo.chargeIdCardNumber) === false) {
      wx.showToast({
        title: '身份证号输入错误',
        icon: 'none',
        duration: 1000
      })
    }
    else if (reg2.test(that.data.perInfo.phoneNumber) === false) {
      wx.showToast({
        title: '手机号输入错误',
        icon: 'none',
        duration: 1000
      })
    }
    else {
      that.data.foreach.push(that.data.perInfo.unitName)
      that.data.foreach.push(that.data.perInfo.chargeName)
      that.data.foreach.push(that.data.perInfo.phoneNumber)
      that.data.foreach.push(that.data.perInfo.chargeSex)
      that.data.foreach.push(that.data.perInfo.address)
      that.data.foreach.push(that.data.perInfo.chargeIdCardNumber)
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
            url: '../fillUnitDogInfo/fillUnitDogInfo',
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
    var index = page[1].__data__.index
    var info = page[1].__data__.dogInfo[index]
    console.log(info)
    if (info != null) {
      that.setData({
        'perInfo.unitName': info.unitName,
        'perInfo.chargeName': info.chargeName,
        'perInfo.chargeSex': info.chargeSex,
        'perInfo.address': info.address,
        'perInfo.phoneNumber': info.phoneNumber,
        'perInfo.chargeIdCardNumber': info.chargeIdCardNumber,
        disable: true
      })
      if (info.chargeSex == 'F') {
        that.setData({
          F: true,
          'perInfo.chargeSex': info.chargeSex,
        })
      }
      if (info.chargeSex == 'M') {
        that.setData({
          M: true,
          'perInfo.chargeSex': info.chargeSex,
        })
      }
    }
    else{
      wx.request({
        url: app.globalData.ipAddress + '/dogBrandBusiness/getPersonByPersonId',
        data: {
          personId:app.globalData.openId
        },
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success(res) {
          console.log(res)
          if(res.data.data!=null){
          that.setData({
            'perInfo.unitName': res.data.data.unitName,
            'perInfo.chargeName': res.data.data.chargeName,
            'perInfo.address': res.data.data.address,
            'perInfo.phoneNumber': res.data.data.phoneNumber,
            'perInfo.chargeIdCardNumber': res.data.data.chargeIdCardNumber,
             disable: true
          })
          if (res.data.data.chargeSex == 'F') {
            that.setData({
              F: true,
              'perInfo.chargeSex': res.data.data.chargeSex,
            })
          }
          if (res.data.data.chargeSex == 'M') {
            that.setData({
              M: true,
              'perInfo.chargeSex': res.data.data.chargeSex,
            })
          }
        }
        },
        fail(res){
          console.log(res)
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