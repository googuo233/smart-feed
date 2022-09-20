// pages/my/my.js
const app = getApp()
let drawQrcode = require("../../utils/weapp.qrcode.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // pet: {
    //   name: '',
    //   age: '',
    //   kind: '',
    //   bodyPhoto: '',
    //   serialId: '',//犬证号,
    //   color: ''

    // },
    // person: {
    //   name: '',
    //   phone: '',
    //   address: ''
    // },
    dogInfo:[],
    index: -1,
    appointmentInfo:[],//我的预约
    punInfo: [],//我的发布
    applyInfo:[],//我的申领
    showModal: false,
    showModal2: false,
    page: 1,
    code: -1,
    shareImg: '',
    resIn: -1,
    hid1: false,
    hid2: true,
    save:-1,
    back:"6rpx solid rgb(26, 90, 226);",
    back1:'',
    back2:'',
    back3:'',
    appointment:'',
    release:'',
    apply:'',
    move:-1,
    move1:-1,
    load:'',
  },
  //我的预约
  appointment(){
  this.setData({
    back1:this.data.back,
    back2:'',
    back3:'',
    appointment:true,
    release:false,
    apply:false
  })
  },
  //我的发布
  release(){
    this.setData({
      back1:'',
      back2:this.data.back,
      back3:'',
      appointment:false,
      release:true,
      apply:false
    })
    },
    //我的申领
    apply(){
      this.setData({
        back1:'',
        back2:'',
        back3:this.data.back,
        appointment:false,
        release:false,
        apply:true
      })
      },
      //我的预约修改
      move(e){
        var that = this
      console.log(e.currentTarget.dataset.index)
      var temp = e.currentTarget.dataset.index
      that.setData({
        move:e.currentTarget.dataset.index
      })
      if(that.data.appointmentInfo[temp].unit==2){
      wx.navigateTo({
        url: '../newVaccinesPeoUnit/newVaccinesPeoUnit',//单位
      })
    }
    else if(that.data.appointmentInfo[temp].unit==1){
      wx.navigateTo({
        url: '../newVaccinesPeoPer/newVaccinesPeoPer',//个人
      })
    }
      },
      //我的申领修改
      move1(e){
        var that = this
      console.log(e.currentTarget.dataset.index)
      var temp = e.currentTarget.dataset.index
      that.setData({
        move1:e.currentTarget.dataset.index
      })
      if(that.data.applyInfo[temp].unit==0){
      wx.navigateTo({
        url: '../modificationDogPermitUnit/modificationDogPermitUnit',//单位
      })
    }
    else if(that.data.applyInfo[temp].unit==1){
      wx.navigateTo({
        url: '../modificationDogPermitPer/modificationDogPermitPer',//个人
      })
    }
      },
  //保存犬证
  save(res){
    var that = this
    console.log(res.currentTarget.dataset.index)
    that.setData({
      save: res.currentTarget.dataset.index
    })
  wx.navigateTo({
    url: '../save/save',
  })
  },
  //登录
  login() {
    var that = this
    wx.navigateTo({
      url: '../index/index',
    })
  },

  // 外面的弹窗
  refuse: function (e) {
    console.log(e)
    this.setData({
      showModal2: true,
      resIn: e.currentTarget.dataset.index
    })
  },

  // 弹出层里面的弹窗
  ok: function () {
    this.setData({
      showModal2: false
    })
  },

  // 外面的弹窗
  dogAdmition: function () {
    var that = this
    if (this.data.dogInfo != '') {
      that.setData({
        showModal: true
      })
    }
    else {
      wx.showToast({
        title: '请先申领犬证再查看',
        icon: 'none'
      })
    }
  },

  // 禁止屏幕滚动
  preventTouchMove: function () {
  },

  // 弹出层里面的弹窗
  close: function () {
    this.setData({
      showModal: false
    })
  },

  //申报注销
  declare() {
    if (this.data.dogInfo != '') {
      wx.navigateTo({
        url: '../Doglist/Doglist',
      })
    }
    else {
      wx.showToast({
        title: '您没有犬证，请先申领',
        icon: 'none'
      })
    }
  },
  //信息修改
  modifyInfo() {
    if (this.data.dogInfo != '') {
      wx.navigateTo({
        url: '../infoModification/infoModification',
      })
    }
    else {
      wx.showToast({
        title: '您没有犬证，请先申领',
        icon: 'none'
      })
    }
  },

  //查看详情
  toDogDetail(e) {
    console.log(e)
    this.setData({
      index: e.currentTarget.dataset.index
    })
    wx.navigateTo({
      url: '../check/check',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    that.setData({
      back1:this.data.back,
      back2:'',
      back3:'',
      appointmentInfo:[],//我的预约
      punInfo: [],//我的发布
      applyInfo:[],//我的申领
      appointment:true,
      release:false,
      apply:false,
      load:1
    })

    //登录
    if (app.globalData.openId != '') {
      that.setData({
        hid1: true,
        hid2: false
      })
    }

    if (app.globalData.openId != '') {
    //从接口获取我的预约中的内容
      wx.request({
        url: app.globalData.ipAddress + '/immune/showAllImmuneByPersonId',
        method: 'GET',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          personId: app.globalData.openId
        },
        success: function (res) {
          console.log(res)
          that.setData({
            appointmentInfo: that.data.appointmentInfo.concat(res.data.data),
          })
          console.log(that.data.appointmentInfo)
        }
      })

    //从接口获取我的发布中的通过内容
      wx.request({
        url: app.globalData.ipAddress + '/lose/selectRange',
        method: 'GET',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          start: '',
          end: '',
          title: '',
          page: that.data.page,
          limit: 10,
          uploadPerson: '',
          openId: app.globalData.openId
        },
        success: function (res) {
          console.log(res)
          that.setData({
            punInfo: that.data.punInfo.concat(res.data.data),
          })
          // console.log(that.data.page)
          // console.log(that.data.punInfo)
        }
      })

          //从接口获取我的申领中的内容
          wx.request({
            url: app.globalData.ipAddress + '/immune/showAllDogBrandByPersonId',
            method: 'GET',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              personId: app.globalData.openId
            },
            success: function (res) {
              console.log(res)
              that.setData({
                applyInfo: that.data.applyInfo.concat(res.data.data),
              })
    
              console.log(that.data.applyInfo)
            }
          })

    //查看犬证信息
     //单位
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
        // console.log(res)
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
      }
    })
      //个人
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
        // console.log(res)
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
    var that = this
    if (app.globalData.openId != '') {
      that.setData({
        hid1: true,
        hid2: false
      })
    }
    if(that.data.load==2){
      that.onLoad()
    }
    else{
      that.setData({
        load:2
      })
    }
    // console.log(app.globalData.openId)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      showModal: false
    })
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
    that.setData({
      dogInfo:[],
      appointmentInfo:[],
      applyInfo:[]
    })

    setTimeout(() => {
      if (app.globalData.openId != '') {
//从接口获取我的预约中的内容
wx.request({
  url: app.globalData.ipAddress + '/immune/showAllImmuneByPersonId',
  method: 'GET',
  header: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  data: {
    personId: app.globalData.openId
  },
  success: function (res) {
    console.log(res)
    that.setData({
      appointmentInfo: that.data.appointmentInfo.concat(res.data.data),
    })
    console.log(that.data.appointmentInfo)
  }
})
//我的发布
        wx.request({
          url: app.globalData.ipAddress + '/lose/selectRange',
          data: {
            start: '',
            end: '',
            title: '',
            page: 1,
            limit: 90,
            uploadPerson: '',
            openId: app.globalData.openId
          },
          method: 'GET',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },

          success: function (res) {
            console.log(res.data.code)
            var temp = res.data.data
            that.setData({
              punInfo: temp
            })
            wx.showToast({
              title: '刷新成功',
            })
          },
          fail: function () {
            wx.showToast({
              title: '刷新失败',
              icon: 'none'
            })
          },
          complete: function (res) {
            // complete
            console.log(res.data.data)
          }

        })
//从接口获取我的申领中的内容
wx.request({
  url: app.globalData.ipAddress + '/immune/showAllDogBrandByPersonId',
  method: 'GET',
  header: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  data: {
    personId: app.globalData.openId
  },
  success: function (res) {
    console.log(res)
    that.setData({
      applyInfo: that.data.applyInfo.concat(res.data.data),
    })

    console.log(that.data.applyInfo)
  }
})

//刷新个人犬牌
        wx.request({
          url: app.globalData.ipAddress + '/dogBrandPerson/newSelectByPersonId',
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
            if (res.data.code == 0) {
              that.setData({
                dogInfo:[],
                code: 0
              })
              console.log(that.data.pet)
            }
            else if (res.data.code == 1) {
              that.setData({
                dogInfo:that.data.dogInfo.concat(res.data.data),
              })
            }
          }
        })
        //刷新单位犬牌
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
            that.setData({
              code: res.data.code
            })
            if (res.data.code == 0) {
              that.setData({
                dogInfo:[],
                code: 0
              })
              console.log(that.data.pet)
            }
            else if (res.data.code == 1) {
              that.setData({
                dogInfo:that.data.dogInfo.concat(res.data.data),
              })
            }
            console.log(that.data.dogInfo)
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          }
        })
      } else {
        wx.showToast({
          title: '请先登录再体验',
          icon: 'none'
        })
      }
      












    }, 1000)





  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    //从接口获取我的发布中的通过内容
    wx.request({
      url: app.globalData.ipAddress + '/lose/selectRange',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        start: '',
        end: '',
        title: '',
        page: that.data.page + 1,
        limit: 10,
        uploadPerson: '',
        openId: app.globalData.openId
      },
      success: function (res) {
        console.log(res)
        var temp1 = res.data.data
        that.setData({
          punInfo: that.data.punInfo.concat(temp1),
        })
        if (res.data.data.length > 0) {
          that.setData({
            page: (++that.data.page)
          })
        }
        // that.setData({
        //   punInfo:that.data.punInfo.concat(res.data.data),
        // })

        console.log(that.data.page)

        console.log(that.data.punInfo)
      }


    })
  },



  //   //点击生成二维码
  //   btn(){
  //     let that=this;
  //     drawQrcode({
  //       _this: this,//在开发过程中发现这边不加this二维码出不来
  //       width: 100,
  //       height: 100,
  //       canvasId: 'myQrcode',
  //       text:'https://open.weixin.qq.com/sns/getexpappinfo?appid=wx6925e831b6ebfa19&path=pages%2Fhome%2Fhome.html#wechat-redirect&petname='+that.data.pet.name+'&petage='+that.data.pet.age+'&petkind='+that.data.pet.name+that.data.pet.name, //二维码的路径
  //       image: {
  //         // imageResource: '../../pages/images/ygbLogo.png',//二维码中图片的路劲
  //         dx: 60,
  //         dy: 60,
  //         dWidth: 80,
  //         dHeight: 80
  //       },
  //       callback: (e) => {
  //         // 使用 setTimeout, 避免部分安卓机转出来的二维码图片不完整
  //         //我的华为mate20pro放1000才出的来
  //          setTimeout(() => {
  //          //此处调用下面第四点调用canvas转图片的方法
  //          },1000)
  //       }

  // })

  // wx.canvasToTempFilePath({
  //      canvasId: 'myQrcode',
  //      success: function (res) {
  //         that.setData({shareImg: res.tempFilePath})
  //         console.log(that.data.shareImg)
  //      },
  //      fail: function (res) {
  //          wx.showToast({title: '图片生成失败'});
  //          console.log("图片生成失败error", res)
  //      }
  // }, this)

  //   },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})