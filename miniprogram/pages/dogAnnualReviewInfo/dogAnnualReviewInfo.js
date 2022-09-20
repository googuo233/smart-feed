// pages/Doglist/Doglist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  dogInfo:[],
  index:-1,
  },
  btn:function(res){
    var that = this
  console.log(res.currentTarget.dataset.index)
  that.setData({
    index: res.currentTarget.dataset.index
  })
  wx.navigateTo({
    url: '../annualInfo/annualInfo',
  })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var page = getCurrentPages()
//查看犬证信息
     //单位
     if(page[0].__data__.reviewType == 0){
     wx.request({
      url: app.globalData.ipAddress + '/dogBrandBusiness/newSelectByPersonId',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        personId: app.globalData.openId
      },
      complete(res) {
        console.log(res)
        if (res.data.code == 1) {
          that.setData({
            // 'pet.name': res.data.data.petName,
            // 'pet.age': res.data.data.petAge,
            // 'pet.kind': res.data.data.petVarieties,
            // 'pet.bodyPhoto': res.data.data.petBodyPhoto,
            // 'pet.serialId': res.data.data.serialId,
            // 'pet.color': res.data.data.petColor,
            // 'person.name': res.data.data.chargeName || res.data.data.personName,
            // 'person.phone': res.data.data.phoneNumber,
            // 'person.address': res.data.data.address,
            // 'pet.Issue': res.data.data.issuingTime,
            // 'pet.review': res.data.data.auditTime,
            dogInfo:that.data.dogInfo.concat(res.data.data),
          })
        }
      }
    })
  }
      //个人
     else if(page[0].__data__.reviewType == 1){
    wx.request({
      url: app.globalData.ipAddress + '/dogBrandPerson/newSelectByPersonId	',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        personId: app.globalData.openId
      },
      complete(res) {
        console.log(res)
        that.setData({
          code: res.data.code
        })
        if (res.data.code == 1) {
          that.setData({
            // 'pet.name': res.data.data.petName,
            // 'pet.age': res.data.data.petAge,
            // 'pet.kind': res.data.data.petVarieties,
            // 'pet.bodyPhoto': res.data.data.petBodyPhoto,
            // 'pet.serialId': res.data.data.serialId,
            // 'pet.color': res.data.data.petColor,
            // 'person.name': res.data.data.chargeName || res.data.data.personName,
            // 'person.phone': res.data.data.phoneNumber,
            // 'person.address': res.data.data.address,
            // 'pet.Issue': res.data.data.issuingTime,
            // 'pet.review': res.data.data.auditTime,
            dogInfo:that.data.dogInfo.concat(res.data.data),
            code: 1
          })
        }
        console.log(that.data.dogInfo)
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