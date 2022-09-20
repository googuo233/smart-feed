
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    page: 1,
    // detailAnimation:{},//动画
    latitude: null,
    longitude: null,
    scale: 18,  //缩放级别3-20
    hide: true,//是否隐藏地标详情
    // markerDetail:{//点击地标显示信息
    //   address:"",
    //   phone:""
    // },
    markers: [],
    // markers: [
    //   {
    //     id: 0,
    //     latitude: 24.4455700000,
    //     longitude: 118.0824000000,
    //     address:'学院路',
    //     phone:'17628439332'
    //     // alpha:0,
    //     // callout:{
    //     //   content: " 厦门思明区政府 \n 12000元/㎡",
    //     //   padding:10,
    //     //   display:'BYCLICK',
    //     //   textAlign:'center',
    //     // }

    //   },
    //   {
    //     id: 1,
    //     latitude: 24.5131500000,
    //     longitude: 118.1468600000,
    //     // callout: {
    //     //   content: " 厦门湖里区政府 \n 70000元/㎡",
    //     //   padding: 10,
    //     //   display: 'BYCLICK',
    //     //   textAlign: 'center'
    //     // }

    //   },
    //   {
    //     id: 2,
    //     latitude: 24.7235700000,
    //     longitude: 118.1517300000,

    //     // callout: {
    //     //   content: " 厦门市同安区政府 \n 100",
    //     //   padding: 10,
    //     //   display: 'BYCLICK',
    //     //   textAlign: 'center'
    //     // }

    //   },
    //   {
    //     id: 3,
    //     latitude: 24.5759000000,
    //     longitude: 118.0972700000,

    //     // callout: {
    //     //   content: " 厦门市集美区政府 \n 100",
    //     //   padding: 10,
    //     //   display: 'BYCLICK',
    //     //   textAlign: 'center'
    //     // }

    //   },
    //   {
    //     id: 4,
    //     latitude: 24.4846000000,
    //     longitude: 118.0329300000,

    //     // callout: {
    //     //   content: " 厦门市海沧区政府 \n 100",
    //     //   padding: 10,
    //     //   display: 'BYCLICK',
    //     //   textAlign: 'center'
    //     // }

    //   },
    //   {
    //     id: 5,
    //     latitude: 24.6196000000,
    //     longitude: 118.2478900000,

    //     // callout: {
    //     //   content: " 厦门市翔安区政府 \n 100",
    //     //   padding: 10,
    //     //   display: 'BYCLICK',
    //     //   textAlign: 'center'
    //     // }

    //   },
    // ],//标记点
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.ipAddress + '/shelter/select',
      method: 'GET',
      data: {
        page: that.data.page,
        limit: 90,
        start: '',
        end: '',
        name: '',
        phoneNumber: ''
      },
      success(res) {
        var temp = {
          id: '',
          address: '',
          latitude: '',
          longitude: '',
          phoneNumber: ''
        }
        var index = []
        console.log(res.data.data)
        // console.log(Number(res.data.data[0].id))
        if (res.data.data.length > 0) {
          // if(Number(res.data.data[0].id)>0){
          //   console.log('1')
          //   for(var m=0;m<Number(res.data.data[0].id);m++){
          //     that.data.markers.concat(temp)
          //   }
          // }
          var j = 0
          for (var i = 0; i < res.data.data.length; i++) {
            // index=index.concat(temp)
            // index[i].id=Number(res.data.data[i].id)
            // index[i].address=res.data.data[i].address
            // index[i].latitude=res.data.data[i].lat
            // index[i].longitude=res.data.data[i].lng
            // index[i].phoneNumber=res.data.data[i].phoneNumber
            // console.log('--------->'+i)
            // console.log(index[i])
            that.data.markers.concat(temp)
            that.setData({
              ['markers[' + i + '].id']: j,
              ['markers[' + i + '].address']: res.data.data[i].address,
              ['markers[' + i + '].latitude']: res.data.data[i].lat,
              ['markers[' + i + '].longitude']: res.data.data[i].lng,
              ['markers[' + i + '].phoneNumber']: res.data.data[i].phoneNumber
            })
            j++
            console.log(j + '----->')
          }
          j = 0
          console.log(that.data.markers)
        }
      }
    })
    wx.getLocation({
      success(res) {
        // console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          scale: 16
        })
      }
    })


  },

  toMark(e) {
    var that = this
    console.log(e)

    this.shelterMap.moveToLocation({
      latitude: that.data.markers[e.currentTarget.dataset.index].latitude,
      longitude: that.data.markers[e.currentTarget.dataset.index].longitude,
      success(res) {
        console.log(res)
        that.setData({
          scale: 18,
        })
      }
    })
  },
  // move(){
  //   this.shelterMap.moveToLocation()
  // },
  getCenterLocation() {//获取当前 位置并设置缩放级别
    var that = this
    this.shelterMap.getCenterLocation({
      success(res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  // hideDetail(){
  //   this.positive()
  //   setTimeout(() => {
  //     this.setData({
  //       hide:true
  //     })
  //   }, 500);
  // },
  // tapMark(e){
  //   var that=this
  //   console.log(e)
  //   // console.log(this.data.markers[e.detail.markerId])
  //   this.setData({
  //     longitude:that.data.markers[e.detail.markerId].longitude,
  //     latitude:that.data.markers[e.detail.markerId].latitude,
  //     // hide:false,
  //     'markerDetail.address':that.data.markers[e.detail.markerId].address,
  //     'markerDetail.phone':that.data.markers[e.detail.markerId].phoneNumber,
  //   })
  //   // this.active()
  // },

  //显示动画
  // active(){   
  //   var systemInfo = wx.getSystemInfoSync();
  //   var detailAnimation=wx.createAnimation({
  //     delay: 0,
  //     duration:500,
  //     timingFunction:'ease'
  //   })
  //   detailAnimation.translateY(-250 / 750 * systemInfo.windowWidth).step()
  //   this.setData({
  //     detailAnimation:detailAnimation.export()
  //   })
  // },
  //隐藏动画
  // positive(){
  //   var systemInfo = wx.getSystemInfoSync();
  //   var detailAnimation=wx.createAnimation({
  //     delay: 0,
  //     duration:500,
  //     timingFunction:'ease'
  //   })
  //   detailAnimation.translateY(0 / 750 * systemInfo.windowWidth).step()
  //   this.setData({
  //     detailAnimation:detailAnimation.export()
  //   })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.shelterMap = wx.createMapContext('shelter', this)
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