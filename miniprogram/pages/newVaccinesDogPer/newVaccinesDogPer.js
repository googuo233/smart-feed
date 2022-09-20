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
      { text: '请选择宠物绝育状态', value: -1 },
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
      purpose: '',
      sterilization: '',
      petColor: '',
      petId:''
    },
    disable: '',
    foreach: [],
    pagecode:''
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
        'dogInfo.petName': info.date.petName,
        'dogInfo.petType': info.date.petType,
        value1: info.date.petType,
        'dogInfo.petVarieties': info.date.petVarieties,
        'dogInfo.petSex': info.date.petSex,
        value2: info.date.petSex,
        'dogInfo.petAge': info.date.petAge,
        age:info.date.petAge+'个月',
        'dogInfo.petWeight': info.date.petWeight,
        weight:info.date.petWeight + 'kg',
        'dogInfo.purpose': info.date.petPurpose,
        'dogInfo.sterilization': info.date.petSterilization.toString(),
        value3: info.date.petSterilization,
        'dogInfo.petColor': info.date.petColor,
        'dogInfo.petId':info.date.petId,
        disable: false
      })
      console.log(that.data.value3)
      console.log(that.data.dogInfo.petId)
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
console.log(this.data.dogInfo.petType)
  },

  getKind(e) {
    this.setData({
      'dogInfo.petVarieties': e.detail.value
    })
    // console.log(this.data.dogInfo.petVarieties)
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
    console.log(that.data.dogInfo.petSex)
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
    // console.log(this.data.dogInfo.petAge)
  }
  if (e.detail.keyCode == 8) {
    this.setData({
      'dogInfo.petAge': e.detail.value,
    })
  }
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
    if (e.detail.keyCode == 8) {
      this.setData({
        'dogInfo.petWeight': e.detail.value,
      })
    }

    // console.log(this.data.dogInfo.petWeight)
  },

  getUse(e) {
    var that = this
    this.setData({
      'dogInfo.purpose': e.detail.value
    })
    // console.log(this.data.dogInfo.petAge)
  },

  getState(e) {
    if(e.detail!=-1){
    this.setData({
      'dogInfo.sterilization': String(e.detail)
    })
  }
  else{
    wx.showToast({
      title: '请正确选择',
      icon:'none'
    })
    this.setData({
      'dogInfo.sterilization': ''
    })
  }
    console.log(e.detail)
    console.log(this.data.dogInfo.sterilization)
  },


  getColor(e) {
    this.setData({
      'dogInfo.petColor': e.detail.value
    })
  },

  btn() {
    var page = getCurrentPages()
    console.log(page)
    console.log(page[2].__data__.dogInfo)
    // this.setData({
    //   applicationUnit:
    // })
    // wx.navigateTo({
    //   url: '../success/success',
    // })
    var page = getCurrentPages()
    // console.log(page)
    var that = this
    that.data.foreach.push(that.data.dogInfo.petName)
    that.data.foreach.push(that.data.dogInfo.petType)
    that.data.foreach.push(that.data.dogInfo.petVarieties)
    that.data.foreach.push(that.data.dogInfo.petSex)
    that.data.foreach.push(that.data.dogInfo.petAge)
    that.data.foreach.push(that.data.dogInfo.petWeight)
    that.data.foreach.push(that.data.dogInfo.purpose)
    that.data.foreach.push(that.data.dogInfo.sterilization)
    that.data.foreach.push(that.data.dogInfo.petColor)
    // console.log(that.data.foreach)
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
      wx.request({
        url: app.globalData.ipAddress + '/personImmune/setImmuneInfo',//个人修改
        method: 'POST',
        data: {
          personId: app.globalData.openId,
          personName: page[1].__data__.perInfo.personName,
          idCardNumber: page[1].__data__.perInfo.idCardNumber,
          personSex: page[1].__data__.perInfo.personSex,
          personPhoneNumber: page[1].__data__.perInfo.personPhoneNumber,
          personAddress: page[1].__data__.perInfo.address,

          petId:page[2].__data__.dogInfo.petId,
          petName: page[2].__data__.dogInfo.petName,
          petColor: page[2].__data__.dogInfo.petColor,
          petType: page[2].__data__.dogInfo.petType,
          petVarieties: page[2].__data__.dogInfo.petVarieties,
          petSex: page[2].__data__.dogInfo.petSex,
          petAge: page[2].__data__.dogInfo.petAge,
          petWeight: page[2].__data__.dogInfo.petWeight,
          petPurpose: page[2].__data__.dogInfo.purpose,
          petSterilization: page[2].__data__.dogInfo.sterilization,
          
          applicationUnit:null,
          applicationTime:null,
          stateCode:0,
          id:0,

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
              pagecode:1,
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