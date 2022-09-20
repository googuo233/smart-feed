// pages/unitReview/unitReview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: '犬主信息',
        inactiveIcon: "../../images/Preone.png",
      },
      {
        text: '犬只信息',
        inactiveIcon: "../../images/two2.png",
      },
      {
        text: '犬只照片',
        inactiveIcon: "../../images/three1.png",
      },
      {
        text: '提交审核',
        inactiveIcon: "../../images/four1.png",
      },
    ],
    value: 0,
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
      { text: '未绝育', value: 0 },
      { text: '已绝育', value: 1 },
    ],
    value3: -1,
    dogInfo: {
      petName: '',
      petCategory: '',
      petVarieties: '',
      petSex: '',
      petAge: '',
      petWeight: '',
      petPurpose: '',
      petSterilizationStatus: '',
      color: '',
      // petName:''//是否注射疫苗信息待定
    },
    foreach: [],
    disabled:false
  },

  getState(e) {
    console.log(e.detail)
    var that = this
    if(e.detail!=-1){
    this.setData({
      'dogInfo.petSterilizationStatus': String(e.detail)
    })
  }
  else{
    this.setData({
      'dogInfo.petSterilizationStatus': ''
    })
    wx.showToast({
      title: '请正确选择',
      icon:'none'
    })
  }
    // console.log(that.data.dogInfo.petSterilizationStatus)
  },

  getUse(e) {
    var that = this
    this.setData({
      'dogInfo.petPurpose': e.detail.value
    })
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
    if (e.detail.keyCode == 8) {
      this.setData({
        'dogInfo.petWeight': e.detail.value,
      })
    }

    // console.log(this.data.dogInfo.petWeight)
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
    if (e.detail.keyCode == 8) {
      this.setData({
        'dogInfo.petAge': e.detail.value,
      })
    }
    // console.log(this.data.dogInfo.petAge)
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
    this.setData({
      'dogInfo.petSex': ''
    })
    wx.showToast({
      title: '请正确选择',
      icon:'none'
    })
  }
    console.log(that.data.dogInfo.petSex)
  },


  getType(e) {
    var that = this
    if(e.detail!=-1){
    this.setData({
      'dogInfo.petCategory': e.detail
    })
  }
  else{
    this.setData({
      'dogInfo.petCategory': ''
    })
    wx.showToast({
      title: '请正确选择',
      icon:'none'
    })
  }
    console.log(this.data.dogInfo.petCategory)
  },


  getName(e) {
    var that = this
    this.setData({
      'dogInfo.petName': e.detail.value
    })
    console.log(this.data.dogInfo.petName)
  },
  color(e) {
    var that = this
    this.setData({
      'dogInfo.color': e.detail.value
    })
    console.log(this.data.dogInfo.color)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var page = getCurrentPages()
    var index = page[0].__data__.move1
    var info = page[0].__data__.applyInfo[index].date
    console.log(info)
    if(info!=null){
    that.setData({
      'dogInfo.petName': info.petName,
      'dogInfo.petCategory': info.petType,
      value1: info.petType,
      'dogInfo.petVarieties': info.petVarieties,
      'dogInfo.petAge': info.petAge,
      age:info.petAge+'个月',
      'dogInfo.petWeight': info.petWeight,
      weight:info.petWeight + 'kg',
      'dogInfo.petPurpose': info.petPurpose,
      'dogInfo.color': info.petColor,
      'dogInfo.petSex': info.petSex,
      value2: info.petSex,
      value3: info.petSterilization,
      'dogInfo.petSterilizationStatus':String(info.petSterilization),
      disabled:false
    })
  }
  },

  // 文本输入框（宠物名称）
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  //点击下一步按钮
  btn() {
    var that = this
    that.data.foreach.push(that.data.dogInfo.petName)
    that.data.foreach.push(that.data.dogInfo.petCategory)
    that.data.foreach.push(that.data.dogInfo.petVarieties)
    that.data.foreach.push(that.data.dogInfo.petSex)
    that.data.foreach.push(that.data.dogInfo.petAge)
    that.data.foreach.push(that.data.dogInfo.petWeight)
    that.data.foreach.push(that.data.dogInfo.petPurpose)
    that.data.foreach.push(that.data.dogInfo.petSterilizationStatus)
    that.data.foreach.push(that.data.dogInfo.color)
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
      wx.navigateTo({
        url: '../modificationDogPermitUnitPic/modificationDogPermitUnitPic',
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