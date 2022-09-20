//app.js
App({
  onLaunch: function () {
    var that=this

    // wx.login({
    //  success:res=>{
    //    wx.request({
    //      url: that.globalData.ipAddress+'/login',
    //      method:'POST',
    //      header: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     },
    //      data:{
    //        code:res.code
    //      },
    //      success:function(lyd){
    //        console.log(lyd);
    //        that.globalData.openId=lyd.data.openid;
    //        wx.setStorageSync('key', lyd.data.openid)
    //      }
    //    })
    //  }
    // })
    var key=wx.getStorageSync('key')
    var info=wx.getStorageSync('info')
    var info1=wx.getStorageSync('info1')
    that.globalData.openId=key
    that.globalData.uploadPerson=info
    that.globalData.avatarUrl=info1
  },
  
  globalData:{
    ipAddress:"https://www.hhdogms.cn:99/api",//测试网
    // ipAddress:"http://42.101.45.23:99/api",//测试网
    openId:'',
    uploadPerson:'',
    avatarUrl:'',
    check:false,
    search:false,
    dogBrand:'',
    load:''
  }
})
