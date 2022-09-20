const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openId: ''
  },


  login() {
    var that = this
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.login({
          success: res => {
            // console.log('code---',res);
            wx.request({
              url: app.globalData.ipAddress + '/login',
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                code: res.code
              },
              success: function (lyd) {
                console.log(lyd);
                that.data.openId = lyd.data.openid;
                app.globalData.openId = that.data.openId
                wx.setStorageSync('key', lyd.data.openid)
                var key = wx.getStorageSync('key')
                if (key != '' && app.globalData.openId != '') {
                  app.globalData.check = true
                  wx.switchTab({
                    url: '../my/my',
                  })
                }
                console.log(app.globalData.openId);
              }
            })
          }
        })
        var info = wx.getStorageSync('info')
        var info1 = wx.getStorageSync('info1')
        app.globalData.uploadPerson = info,
          app.globalData.avatarUrl = info1,

          console.log(res)
        app.globalData.check = true
        app.globalData.uploadPerson = res.userInfo.nickName
        app.globalData.avatarUrl = res.userInfo.avatarUrl
        wx.setStorageSync('info', res.userInfo.nickName)
        wx.setStorageSync('info1', res.userInfo.avatarUrl)
        // that.toHome()
        console.log(app.globalData.openId)
        // wx.getStorage({
        //   key: 'key',
        //   success(res){
        //     console.log(res)
        //   }
        // })
      },
      fail(res) {
        console.log(res)
      }
    })




    // wx.login({
    //  success:res=>{
    //    wx.request({
    //      url: app.globalData.ipAddress+'/login',
    //      method:'POST',
    //      header: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     },
    //      data:{
    //        code:res.code
    //      },
    //      success:function(lyd){
    //        console.log(lyd);
    //        app.globalData.openId=lyd.data.openid;
    //        that.toHome()
    //      }
    //    })
    //  }
    // })
  },

  // toHome(){
  //   wx.switchTab({
  //     url: '../my/my',
  //   })
  // },
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