// miniprogram/pages/adopt/adopt.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgcolor1: 'rgb(26, 90, 226)',
        bgcolor2: 'rgb(234, 238, 250)',
        wcolor1: 'white',
        wcolor2: 'rgb(26, 90, 226)',
        bg: {
            act: 'rgb(26, 90, 226)',
            pos: 'rgb(234, 238, 250)'
        },
        wcolor: {
            act: 'white',
            pos: 'rgb(26, 90, 226)'
        },
        hide1: false,
        hide2: true,
    faiInfo: [],//待领养
    sucInfo: [],//已领养
    index: -1,
    page1:2,
    page2:2
  },
  info() {
    var that = this
    that.setData({
        bgcolor1: that.data.bg.act,
        wcolor1: that.data.wcolor.act,
        bgcolor2: that.data.bg.pos,
        wcolor2: that.data.wcolor.pos,
        hide1: false,
        hide2: true,
    })

},

search() {
    var that = this
    that.setData({
        bgcolor1: that.data.bg.pos,
        wcolor1: that.data.wcolor.pos,
        bgcolor2: that.data.bg.act,
        wcolor2: that.data.wcolor.act,
        hide1: true,
        hide2: false,
    })
},
  jumpPage: function (res) {
    var that = this
    console.log(res)
    that.setData({
      index: res.currentTarget.dataset.index
    })
    console.log(that.data.index)
    wx.navigateTo({
      url: '../adoptInfo/adoptInfo',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //待领养
    wx.request({
      url: app.globalData.ipAddress + '/petAdoption/selectWait',
      data: {
        page: 1,
        limit: 10,
        start: '',
        end: '',
        petName: '',
      },
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res.data.data)
        that.setData({
          faiInfo: that.data.faiInfo.concat(res.data.data),
          page1:2
        })
        console.log(that.data.faiInfo)
      },
    })
    //已经领养
    wx.request({
      url: app.globalData.ipAddress + '/petAdoption/selectAlready',
      data: {
        page: 1,
        limit: 10,
        start: '',
        end: '',
        petName: '',
      },
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
        that.setData({
          sucInfo: res.data.data,
          page2:2
        })
      },
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
    var that = this
    //待领养
    setTimeout(() => {
      that.setData({
        faiInfo:[],
        sucInfo:[]
      })
    wx.request({
      url: app.globalData.ipAddress + '/petAdoption/selectWait',
      data: {
        page: 1,
        limit: 10,
        start: '',
        end: '',
        petName: '',
      },
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res.data.data)
        that.setData({
          faiInfo: that.data.faiInfo.concat(res.data.data),
        })
        wx.showToast({
          title: '刷新成功',
        })   
        console.log(that.data.faiInfo)
      },
      fail(res){
        wx.showToast({
          title: '刷新失败',
          icon:'error',
        })   
      }
    })
    //已经领养
    wx.request({
      url: app.globalData.ipAddress + '/petAdoption/selectAlready',
      data: {
        page: 1,
        limit: 10,
        start: '',
        end: '',
        petName: '',
      },
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
        that.setData({
          sucInfo: that.data.sucInfo.concat(res.data.data),
        })
        wx.showToast({
          title: '刷新成功',
        })   
      },
      fail(res){
        wx.showToast({
          title: '刷新失败',
          icon:'error',
        })   
      }
    }) 
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },1000)


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    //待领养
    wx.request({
      url: app.globalData.ipAddress + '/petAdoption/selectWait',
      data: {
        page: that.data.page1,
        limit: 10,
        start: '',
        end: '',
        petName: '',
      },
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res.data.data)
        that.setData({
          faiInfo: that.data.faiInfo.concat(res.data.data),
          page1:++(that.data.page1)
        })
        console.log(that.data.faiInfo)
      },
    })
    //已经领养
    wx.request({
      url: app.globalData.ipAddress + '/petAdoption/selectAlready',
      data: {
        page: that.data.page2,
        limit: 10,
        start: '',
        end: '',
        petName: '',
      },
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
        that.setData({
          sucInfo: that.data.sucInfo.concat(res.data.data),
          page2:++(that.data.page2)
        })  
        console.log(that.data.sucInfo)
      },
    }) 
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})