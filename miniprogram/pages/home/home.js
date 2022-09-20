// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideModal1: true, //模态框的状态 true-隐藏 false-显示
    animationData1: {},//
    hideModal2: true, //模态框的状态 true-隐藏 false-显示
    animationData2: {},//
    hideModal3: true, //模态框的状态 true-隐藏 false-显示
    animationData3: {},//
    orderType: 0,
    cardType:0,
    reviewType:0,
    login: 0,
    swiper: [
      { url: '../../images/policebadge.png' }
    ],
    showModal5: false,
    pet: {
      name: '',
      age: '',
      kind: '',
      bodyPhoto: '',
      serialId: '',//犬证号,
      color: ''

    },
    person: {
      name: '',
      phone: '',
      address: ''
    },
  },

  // 弹出层里面的弹窗
  close: function () {
    this.setData({
      showModal5: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    var that = this
    var qrCodeUrl = decodeURIComponent(options.q);
    var arr1 = qrCodeUrl.split('=')
    console.log(qrCodeUrl)
    console.log(arr1)
    wx.request({
      url: app.globalData.ipAddress + '/dogBrandPerson/selectDogBrandBySerialId',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        serialId: arr1[1]
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 1 || res.data.code == 2) {
          that.setData({
            'pet.name': res.data.data.petName,
            'pet.age': res.data.data.petAge,
            'pet.kind': res.data.data.petVarieties,
            'pet.bodyPhoto': res.data.data.petBodyPhoto,
            'pet.serialId': res.data.data.serialId,
            'pet.color': res.data.data.petColor,
            'person.name': res.data.data.chargeName || res.data.data.personName,
            'person.phone': res.data.data.phoneNumber,
            'person.address': res.data.data.address,
            'pet.Issue': res.data.data.issuingTime,
            'pet.review': res.data.data.auditTime,
            showModal5: true
          })
          var name = that.data.person.name.split("")
          that.setData({
            'person.name':name[0]+"**"
          })
        }
      }
    })
    // console.log(app.globalData.uploadPerson)
    // console.log(app.globalData)
    wx.request({
      url: app.globalData.ipAddress + '/slideshow/select',
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        page: 1,
        limit: 5,
        uploadPerson: 'admin'
      },
      success(res) {
        console.log(res)
        that.setData({
          swiper: that.data.swiper.concat(res.data.data)
        })
      }
    })
  },
  //犬证申领

  // 显示遮罩层
  showModal1: function () {
    var that = this;
    that.setData({
      hideModal1: false
    })
    var animation1 = wx.createAnimation({
      duration: 300,//动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation1 = animation1
    setTimeout(function () {
      that.fadeIn1();//调用显示动画
    }, 80)
  },

  // 隐藏遮罩层
  hideModal1: function () {
    var that = this;
    var animation1 = wx.createAnimation({
      duration: 300,//动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation1 = animation1
    that.fadeDown1();//调用隐藏动画 
    setTimeout(function () {
      that.setData({
        hideModal1: true
      })
    }, 300)//先执行下滑动画，再隐藏模块

  },

  //动画集
  fadeIn1: function () {
    this.animation1.translateY(0).step()
    this.setData({
      animationData1: this.animation1.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown1: function () {
    this.animation1.translateY(300).step()
    this.setData({
      animationData1: this.animation1.export(),
    })
  },


  // 犬证申领（单位）
  unitdogad() {
    if (app.globalData.openId == '') {
      wx.showToast({
        title: '请先登录再体验',
        icon: 'none'
      })
    }
    else{
      var that = this
      that.setData({
        cardType:0
      })
    wx.navigateTo({
      // url: '../unitSearch/unitSearch',
      // url: '../unitDogOwner/unitDogOwner',
      url:'../publicity/publicity'
    })
  }
    var that = this;
    var animation1 = wx.createAnimation({
      duration: 300,//动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation1 = animation1
    that.fadeDown1();//调用隐藏动画 
    setTimeout(function () {
      that.setData({
        hideModal1: true
      })
    }, 300)//先执行下滑动画，再隐藏模块
  },
  // 犬证申领（个人）
  perdogad() {
    if (app.globalData.openId == '') {
      wx.showToast({
        title: '请先登录再体验',
        icon: 'none'
      })
    }else{
      var that = this
      that.setData({
        cardType:1
      })
    wx.navigateTo({
      // url: '../perSearch/perSearch',
      // url: '../perDogOwner/perDogOwner',
      url:'../publicity/publicity'
    })
  }
    var that = this;
    var animation1 = wx.createAnimation({
      duration: 300,//动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation1 = animation1
    that.fadeDown1();//调用隐藏动画 
    setTimeout(function () {
      that.setData({
        hideModal1: true
      })
    }, 300)//先执行下滑动画，再隐藏模块
  },





  // 犬证年审

  // 显示遮罩层
  showModal2: function () {
    var that = this;
    that.setData({
      hideModal2: false
    })
    var animation2 = wx.createAnimation({
      duration: 300,//动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation2 = animation2
    setTimeout(function () {
      that.fadeIn2();//调用显示动画
    }, 80)
  },

  // 隐藏遮罩层
  hideModal2: function () {
    var that = this;
    var animation2 = wx.createAnimation({
      duration: 300,//动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation2 = animation2
    that.fadeDown2();//调用隐藏动画 
    setTimeout(function () {
      that.setData({
        hideModal2: true
      })
    }, 300)//先执行下滑动画，再隐藏模块

  },

  //动画集
  fadeIn2: function () {
    this.animation2.translateY(0).step()
    this.setData({
      animationData2: this.animation2.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown2: function () {
    this.animation2.translateY(300).step()
    this.setData({
      animationData2: this.animation2.export(),
    })
  },
  // 犬证年审（个人）
  ann() {
    if (app.globalData.openId == '') {
      wx.showToast({
        title: '请先登录再体验',
        icon: 'none'
      })
    }else{
      var that = this
      that.setData({
        reviewType:1
      })
      wx.navigateTo({
        url: '../dogAnnualReviewInfo/dogAnnualReviewInfo',
      })
  }
    var that = this;
    var animation2 = wx.createAnimation({
      duration: 300,//动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation2 = animation2
    that.fadeDown2();//调用隐藏动画 
    setTimeout(function () {
      that.setData({
        hideModal2: true
      })
    }, 300)//先执行下滑动画，再隐藏模块

  },
  // 犬证年审（单位）
  unitann() {
    if (app.globalData.openId == '') {
      wx.showToast({
        title: '请先登录再体验',
        icon: 'none'
      })
    }else{
      var that = this
      that.setData({
        reviewType:0
      })
      wx.navigateTo({
        url: '../dogAnnualReviewInfo/dogAnnualReviewInfo',
      })
  }
    var that = this;
    var animation2 = wx.createAnimation({
      duration: 300,//动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation2 = animation2
    that.fadeDown2();//调用隐藏动画 
    setTimeout(function () {
      that.setData({
        hideModal2: true
      })
    }, 300)//先执行下滑动画，再隐藏模块
  },








  // 预约接种

  // 显示遮罩层
  showModal3: function () {
    var that = this
    that.setData({
      hideModal3: false
    })
    var animation3 = wx.createAnimation({
      duration: 300,//动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation3 = animation3
    setTimeout(function () {
      that.fadeIn3();//调用显示动画
    }, 80)
  },

  // 隐藏遮罩层
  hideModal3: function () {
    var that = this;
    var animation3 = wx.createAnimation({
      duration: 300,//动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation3 = animation3
    that.fadeDown3();//调用隐藏动画 
    setTimeout(function () {
      that.setData({
        hideModal3: true
      })
    }, 300)//先执行下滑动画，再隐藏模块

  },

  //动画集
  fadeIn3: function () {
    this.animation3.translateY(0).step()
    this.setData({
      animationData3: this.animation3.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown3: function () {
    this.animation3.translateY(300).step()
    this.setData({
      animationData3: this.animation3.export(),
    })
  },



  // 预约接种（单位）
  unitorder() {
    if (app.globalData.openId == '') {
      wx.showToast({
        title: '请先登录再体验',
        icon: 'none'
      })
    } else {
      var that = this
      that.setData({
        orderType: 0
      })
      wx.navigateTo({
        url: '../dogImmuneInformation/dogImmuneInformation',
      })
    }
    var that = this;
    var animation3 = wx.createAnimation({
      duration: 300,//动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation3 = animation3
    that.fadeDown3();//调用隐藏动画 
    setTimeout(function () {
      that.setData({
        hideModal3: true
      })
    }, 300)//先执行下滑动画，再隐藏模块

  },
  // 预约接种（个人）
  perorder() {
    if (app.globalData.openId == '') {
      wx.showToast({
        title: '请先登录再体验',
        icon: 'none'
      })
    } else {
      var that = this
      that.setData({
        orderType: 1
      })
      wx.navigateTo({
        url: '../dogImmuneInformation/dogImmuneInformation',
      })
    }
    var that = this;
    var animation3 = wx.createAnimation({
      duration: 300,//动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation3 = animation3
    that.fadeDown3();//调用隐藏动画 
    setTimeout(function () {
      that.setData({
        hideModal3: true
      })
    }, 300)//先执行下滑动画，再隐藏模块
  },

  // 执法处理
  law() {
    var that = this
    that.setData({
      login: 1
    })
    wx.navigateTo({
      url: '../login/login',
    })
  },
  // 执法犬只收缴
  reason() {
    var that = this
    that.setData({
      login: 2
    })
    wx.navigateTo({
      url: '../login/login',
    })
  },
  // 收容所
  shelter() {
    wx.navigateTo({
      url: '../Shelter/Shelter',
    })
  },
  // 宠物领养
  adopt() {
    wx.navigateTo({
      url: '../adopt/adopt',
    })
  },
  // 寻犬启示
  info() {
    app.globalData.search = true
    wx.switchTab({
      url: '../info/info'
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
    var that = this
    if (that.data.hideModal1 == false || that.data.hideModal2 == false || that.data.hideModal3 == false) {
      that.setData({
        hideModal1: true,
        hideModal2: true,
        hideModal3: true
      })
    }
    this.setData({
      showModal5: false
    })
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