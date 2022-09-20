// pages/infoDetail/infoDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dogDetail: '',
    img: [],
    image: []
  },

  // 图片点击放大效果
  preview(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    console.log(e)
    wx.previewImage({
      urls: that.data.img,
      current: that.data.img[index]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = getCurrentPages()
    var that = this
    var id = page[0].__data__.index
    console.log(page)
    that.setData({
      dogDetail: page[0].__data__.punInfo[id],
    })
    that.data.img = that.data.dogDetail.img.split(",")
    for (var i = 0; i < that.data.img.length; i++) {
      that.data.image.push(that.data.img[i])
    }
    var tempImg = that.data.img
    that.setData({
      image: tempImg
    })

    wx.setNavigationBarTitle({
      title: that.data.dogDetail.title,
      complete(res) {
        console.log(res)
      }

    })
    // console.log(that.data.img)
    // console.log(that.data.image)
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