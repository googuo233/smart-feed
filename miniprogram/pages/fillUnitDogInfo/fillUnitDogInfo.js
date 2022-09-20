const app = getApp()
// pages/unitReview/unitReview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option1: [
      { text: '请选择宠物类型', value: -1 },
      { text: '超小型犬', value: '超小型犬' },
      { text: '小型犬', value: '小型犬' },
      { text: '中型犬', value: '中型犬' },
      { text: '大型犬', value: '大型犬' },
      { text: '超大型犬', value: '超大型犬' },
    ],
    value1: -1,
    option2: [
      { text: '请选择宠物性别', value: 0 },
      { text: '公', value: 'M' },
      { text: '母', value: 'F' },
    ],
    value2: 0,
    option3: [
      { text: '请选择宠物绝育状态', value: -1, },
      { text: '已绝育', value: 1 },
      { text: '未绝育', value: 0 },
    ],
    value3: -1,
    dogInfo: {
      petName: '',
      petType: '',
      petVarieties: '',
      petSex: '',
      petAge: '',
      petWeight: '',
      petPurpose: '',
      petSterilization: '',
      petColor: '',
      petId:''
    },
    disable: '',
    foreach: [],
    text: '',
    btnview:false
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
    if (info != null&&page[1].__data__.btn==1) {
      that.setData({
        'dogInfo.petName': info.petName,
        'dogInfo.petType': info.petType,
        value1: info.petType,
        'dogInfo.petVarieties': info.petVarieties,
        'dogInfo.petSex': info.petSex,
        value2: info.petSex,
        'dogInfo.petAge': info.petAge,
        age:info.petAge+'个月',
        'dogInfo.petWeight': info.petWeight,
        weight:info.petWeight + 'kg',
        'dogInfo.petPurpose': info.petPurpose,
        'dogInfo.petSterilization': info.petSterilization.toString(),
        value3: info.petSterilization,
        'dogInfo.petColor': info.petColor,
        'dogInfo.petId':info.petId,
        disable: true
      })
      console.log(that.data.value3)
      console.log(that.data.dogInfo.petId)
    }
    else {
      that.setData({
        value1: -1,
        value2: 0,
        value3: -1,
      })
    }
  },

  getName(e) {
    var that = this
    this.setData({
      'dogInfo.petName': e.detail.value
    })
  },

  getType(e) {
    var that = this
    if(e.detail!=-1){
    this.setData({
      'dogInfo.petType': e.detail
    })
  }
  else{
    wx.showToast({
      title: '请正确选择',
      icon:'none'
    })
    this.setData({
      'dogInfo.petType': ''
    })
  }
    console.log(e.detail)
  },

  getKind(e) {
    this.setData({
      'dogInfo.petVarieties': e.detail.value
    })
  },

  getSex(e) {
    var that = this
    if(e.detail!=0){
    this.setData({
      'dogInfo.petSex': e.detail
    })
  }
  else{
    wx.showToast({
      title: '请正确选择',
      icon:'none'
    })
    this.setData({
      'dogInfo.petSex': ''
    })
  }
    console.log(this.data.dogInfo.petSex)
  },

  getAge(e) {
    var that = this
    var age = Number(e.detail.value)
    if(age<1000){
      this.setData({
        'dogInfo.petAge': age
      })
    }
    else{
      wx.showToast({
        title: '年龄不能大于999个月或输入格式错误',
        icon:'none',
        duration:2000
      })
      this.setData({
        'dogInfo.petAge': ''
      })
    }
    // console.log(this.data.dogInfo.petAge)
  },

  getWeight(e) {
    var that = this
    var weight = Number(e.detail.value)
    if(weight<1000){
      this.setData({
        'dogInfo.petWeight': weight
      })
    }
    else{
      wx.showToast({
        title: '体重不能大于999KG或输入格式错误',
        icon:'none',
        duration:2000
      })
      this.setData({
        'dogInfo.petWeight': ''
      })
    }

    // console.log(this.data.dogInfo.petWeight)
  },

  getUse(e) {
    var that = this
    this.setData({
      'dogInfo.petPurpose': e.detail.value
    })
  },

  getState(e) {
    if(e.detail!=-1){
    this.setData({
      'dogInfo.petSterilization': String(e.detail)
    })
  }
  else{
    wx.showToast({
      title: '请正确选择',
      icon:'none'
    })
    this.setData({
      'dogInfo.petSterilization': ''
    })
  }
    console.log(e.detail)
    console.log(this.data.dogInfo.petSterilization)
    // console.log(typeof e.detail)
  },


  getColor(e) {
    this.setData({
      'dogInfo.petColor': e.detail.value
    })
  },

  btn() {
    // this.setData({
    //   applicationUnit:
    // })
    // wx.navigateTo({
    //   url: '../success/success',
    // })
    var page = getCurrentPages()
    console.log(page)
    var that = this
    that.data.foreach.push(that.data.dogInfo.petName)
    that.data.foreach.push(that.data.dogInfo.petType)
    that.data.foreach.push(that.data.dogInfo.petVarieties)
    that.data.foreach.push(that.data.dogInfo.petSex)
    that.data.foreach.push(that.data.dogInfo.petAge)
    that.data.foreach.push(that.data.dogInfo.petWeight)
    that.data.foreach.push(that.data.dogInfo.petPurpose)
    that.data.foreach.push(that.data.dogInfo.petSterilization)
    that.data.foreach.push(that.data.dogInfo.petColor)
    console.log(that.data.foreach)
    var tempOwner = that.data.foreach
    var check = 0
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
        check = 1
        that.setData({
          foreach: []
        })
      }
    }
    if (check == 1) {
      that.setData({
        btnview:true
      })
      wx.request({
        url: app.globalData.ipAddress + '/businessImmune/newApply',
        method: 'POST',
        data: {
          ownerId: app.globalData.openId,
          unitName: page[3].__data__.perInfo.unitName,
          chargeIdCardNumber: page[3].__data__.perInfo.chargeIdCardNumber,
          chargeName: page[3].__data__.perInfo.chargeName,
          chargeSex: page[3].__data__.perInfo.chargeSex,
          phoneNumber: page[3].__data__.perInfo.phoneNumber,
          address: page[3].__data__.perInfo.address,

          petId:page[4].__data__.dogInfo.petId,
          petName: page[4].__data__.dogInfo.petName,
          petColor: page[4].__data__.dogInfo.petColor,
          petType: page[4].__data__.dogInfo.petType,
          petVarieties: page[4].__data__.dogInfo.petVarieties,
          petSex: page[4].__data__.dogInfo.petSex,
          petAge: page[4].__data__.dogInfo.petAge,
          petWeight: page[4].__data__.dogInfo.petWeight,
          petPurpose: page[4].__data__.dogInfo.petPurpose,
          petSterilization: page[4].__data__.dogInfo.petSterilization,
          applicationUnit: page[2].__data__.aim
        },

        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        complete(res) {
          console.log(res.data)
          if (res.data.code == 1) {
            wx.navigateTo({
              url: '../success/success',
            })
            that.setData({
              btnview:false
            })
          }
          else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 3000,
              success(res) {
                setTimeout(() => {
                  wx.switchTab({
                    url: '../home/home',
                  })
                }, 3000)
              }
            })
            that.setData({
              btnview:false
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