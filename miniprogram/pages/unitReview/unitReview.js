// pages/unitReview/unitReview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: '单位信息',
        inactiveIcon: "../../images/Unitone.png",
      },
      {
        text: '犬只信息',
        inactiveIcon: "../../images/two2.png",
      },
      {
        text: '犬只照片',
        inactiveIcon: "../../images/three2.png",
      },
      {
        text: '提交审核',
        inactiveIcon: "../../images/four2.png",
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //点击下一步按钮
  btn() {
    wx.switchTab({
      url: '../home/home',
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