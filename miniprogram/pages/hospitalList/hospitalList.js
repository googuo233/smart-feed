// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aim: '',
    info: [],
    index:-1
  },


  dogOwer(res) {
    var that = this
    var page = getCurrentPages()
    //  console.log(e)
    that.setData({
      aim:that.data.info[res.currentTarget.dataset.index].name
    })

    console.log(that.data.aim)
    //  console.log(page[0].__data__.orderType)
    if (page[0].__data__.orderType == 0) {
      wx.navigateTo({
        url: '../fillUnitInfo/fillUnitInfo',
      })
    }
    else if (page[0].__data__.orderType == 1) {
      wx.navigateTo({
        url: '../fillOwnerInfo/fillOwnerInfo',
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // var page = getCurrentPages()
    // var index = page[1].__data__.index
    // var info = page[1].__data__.dogInfo[index]
    // console.log(info)
    wx.request({
      url: app.globalData.ipAddress + '/user/showAllHospital',
      method: 'GET',
      data: {
          name:'',
          phoneNumber:'',
          profile:''

      },
      header: {
          "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res){
        console.log(res)
        that.setData({
          info:res.data.hospital
        })
        console.log(that.data.info)
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