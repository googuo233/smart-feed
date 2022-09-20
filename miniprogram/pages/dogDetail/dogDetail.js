// pages/infoDetail/infoDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dogDetail: '',
    cover: [],
    img: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = getCurrentPages()

    var that = this

    var id = page[0].__data__.dogIndex
    that.setData({
      dogDetail: page[0].__data__.dogDetail[id],
    })
    that.data.img = that.data.dogDetail.img.split(",")
    for (var i = 0; i < that.data.img.length; i++) {
      that.data.cover.push(that.data.img[i])
    }
    var tempImg = that.data.img
    that.setData({
      img: tempImg
    })
    //   console.log(that.data.dogDetail)
    console.log(that.data.cover)
    console.log(page[0].__data__.dogDetail)
    console.log(that.data.dogDetail)

    wx.setNavigationBarTitle({
      title: that.data.dogDetail.title,
      complete(res) {
        console.log(res)
      }

    })
  },





  // 图片点击放大效果
  previewImg: function (event) {
    var that = this;
    var index = event.currentTarget.dataset.index
    wx.previewImage({
      current: that.data.img[index],
      urls: that.data.img,//所有要预览的图片的地址集合 数组形式
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