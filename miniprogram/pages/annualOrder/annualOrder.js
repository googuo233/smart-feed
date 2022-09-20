
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option1: [
      { text: '请选择接种医院', value: 0 },
      { text: 'A医院', value: 1 },
      { text: 'B医院', value: 2 },
      { text: '......', value: 3 },
    ],
    value1: 0,
    option2: [
      { text: '2021-05-15', value: 0 },
      { text: '......', value: 1 },
    ],
    value2: 0,
  },
  hospital(res) {
    this.setData({
      value1: res.detail
    })
    console.log(this.data.value1)
  },

  time(res) {
    this.setData({
      value2: res.detail
    })
    console.log(this.data.value2)
  },
  Success(res) {
    var pages = getCurrentPages();
    var list = [this.data.value1, this.data.value2]
    console.log(list)
    if (this.data.value1 == 0) {
      wx.showToast({
        title: '请选择接种医院',
        icon: "none"
      })
    } else if (this.data.value2 == 0) {
      wx.showToast({
        title: '请选择接种时间',
        icon: "none"
      })
    } else {
      // 接口位置
      wx.request({
        url: 'url',
      })
      console.log(pages)
      wx.navigateTo({
        url: '../annualSuccess/annualSuccess',
      })
    }

  },

  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

