// pages/declare/declare.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNote: '',
    orderNoteMax: 100,//最大长度
    orderResual: '',
    info:[],
    number:-1
  },


  submit() {
    var that = this
    var page = getCurrentPages()
    //个人犬只注销
    if (that.data.orderNote !== '' && that.data.orderResual !== ''&&that.data.number==1) {
      wx.request({
        url: app.globalData.ipAddress + '/dogBrandPerson/newCancellationByPersonIdPetId',
        method: "GET",
        data: {
          personId: app.globalData.openId,
          petId:that.data.info.petId
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        complete(res) {
          console.log(res)
          if (res.data.code == 1) {
            // page[0].setData({
            //   code: 0,
            // })
            wx.showToast({
              title: res.data.msg,
              icon: "none"
            })
            setTimeout(() => {
              wx.switchTab({
                url: '../home/home',
              })
            }, 1000);
          }
          else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        }
      })
    }
    else {
      wx.showToast({
        title: '上报失败，信息不能为空',
        icon: 'none'
      })
    }
    //单位犬只注销
    if (that.data.orderNote !== '' && that.data.orderResual !== ''&&that.data.number==0) {
      wx.request({
        url: app.globalData.ipAddress + '/dogBrandBusiness/newCancellationByPersonIdPetId',
        method: "GET",
        data: {
          personId: app.globalData.openId,
          petId:that.data.info.petId
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        complete(res) {
          console.log(res)
          if (res.data.code == 1) {
            // page[0].setData({
            //   code: 0,
            // })
            wx.showToast({
              title: res.data.msg,
              icon: "none"
            })
            setTimeout(() => {
              wx.switchTab({
                url: '../home/home',
              })
            }, 1000);
          }
          else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        }
      })
    }
    else {
      wx.showToast({
        title: '上报失败，信息不能为空',
        icon: 'none'
      })
    }
  },

  resual(e) {
    this.setData({
      orderResual: e.detail.value
    })
  },
  //textarea
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    this.setData({//更新备注内容到vue缓存
      orderNote: e.detail.value
    })
    // 获取输入框内容的长度
    var len = parseInt(value.length);


    //最多字数限制
    if (len > this.data.orderNoteMax) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = getCurrentPages()
    var that = this
    var index = page[1].__data__.index
    that.setData({
      info: page[1].__data__.dogInfo[index]
    })
    if(that.data.info.horsing!=null){
      that.setData({
        number:1
      })
    }
    else if(that.data.info.horsing==null){
      that.setData({
        number:0
      })
    }
    console.log(that.data.info)
    console.log(that.data.number)
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