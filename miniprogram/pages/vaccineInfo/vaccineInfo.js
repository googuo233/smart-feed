// pages/vaccineInfo/vaccineInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personInfo:[],
    dogInfo:[],
    btn2:'',
  // index:-1,
  // cardType:-1
  },
  btn2:function(res){
    var that = this
  console.log(res.currentTarget.dataset.index)
  that.setData({
    index: res.currentTarget.dataset.index
  })
  var page = getCurrentPages()
    if (page[0].__data__.cardType == 0) {
      wx.navigateTo({
        url: '../unitDogOwner/unitDogOwner',
      })
      that.setData({
        btn2:1
      })
    }
    else if (page[0].__data__.cardType == 1) {
      wx.navigateTo({
        url: '../perDogOwner/perDogOwner',
      })
      that.setData({
        btn2:1
      })
    }
  },
  btn1(){
  wx.switchTab({
    url: '../home/home',
  })
  },
  btn(){
    var page = getCurrentPages()
    var that = this
    if (page[0].__data__.cardType == 0) {
      wx.navigateTo({
        url: '../unitDogOwner/unitDogOwner',
      })
      that.setData({
        btn2:0
      })

    }
    else if (page[0].__data__.cardType == 1) {
      wx.navigateTo({
        url: '../perDogOwner/perDogOwner',
      })
      that.setData({
         btn2:0
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var page = getCurrentPages()
    console.log(page)
    if (page[0].__data__.cardType == 0) {
      //请求人的信息（单位）
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
          that.setData({
            personInfo:res.data.data,
          })
          console.log(that.data.personInfo)
        },
        fail(res){
          console.log(res)
        }
      })
      //请求犬的信息（单位）
      wx.request({
        url: app.globalData.ipAddress + '/dogBrandBusiness/getPetsByPersonId',
        data: {
          personId:app.globalData.openId
        },
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success(res) {
          console.log(res)
          that.setData({
            dogInfo:res.data.data,
          })
          console.log(that.data.dogInfo)
        },
        fail(res){
          console.log(res)
        }
      })
    }
    else if (page[0].__data__.cardType == 1) {
      //请求人的信息（个人）
      wx.request({
        url: app.globalData.ipAddress + '/dogBrandPerson/getPersonByPersonId',
        data: {
          personId:app.globalData.openId
        },
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success(res) {
          console.log(res)
          that.setData({
            personInfo:res.data.data,
          })
          console.log(that.data.personInfo)
        },
        fail(res){
          console.log(res)
        }
      })
      //请求犬的信息（个人）
      wx.request({
        url: app.globalData.ipAddress + '/dogBrandPerson/getPetsByPersonId',
        data: {
          personId:app.globalData.openId
        },
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success(res) {
          console.log(res)
          that.setData({
            dogInfo:res.data.data,
          })
          console.log(that.data.dogInfo)
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