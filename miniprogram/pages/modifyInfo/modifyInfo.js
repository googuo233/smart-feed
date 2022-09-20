// pages/modifyInfo/modifyInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doginfo: {
      name: '',
      weight: '',
      sex: '',
      type: '',
      age: '',
      state: '',
      var: ''
    },
    group: '',
    side: '',
    front: '',
    ownerinfo: {
      name: '',
      phone: '',
      address: ''
    },
    number: -1,
    petId: '',
    check: true,
    check2: true
  },

  add(e) {
    // console.log(e)
    this.setData({
      'ownerinfo.address': e.detail.value
    })
  },

  phone(res) {

    if (res.detail.value.length === 11) {
      var reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (reg.test(res.detail.value) === false) {
        wx.showToast({
          title: '手机号码输入有误！',
          icon: 'none',
        })
      } else {
        this.setData({
          'ownerinfo.phone': res.detail.value,
        })
      }
    }
  },

  changeAdd(e) {
    console.log(e)
    this.setData({
      check2: false
    })
  },


  com2() {
    this.setData({
      check2: true
    })
  },

  changeNum(e) {
    console.log(e)
    this.setData({
      check: false,
      'ownerinfo.phone': ''
    })
  },


  com() {
    this.setData({
      check: true
    })
  },
  btn() {

    var that = this
    console.log(that.data)
    //单位
    if (that.data.ownerinfo.address !== '' && that.data.ownerinfo.phone !== '') {
      if (that.data.number == 2) {
        wx.request({
          url: app.globalData.ipAddress + '/dogBrandBusiness/newUpdate',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            personId: app.globalData.openId,
            address: that.data.ownerinfo.address,
            petId: that.data.petId,
            phoneNumber: that.data.ownerinfo.phone,
          },
          complete(res) {
            console.log(res)
            if (res.data.code == 1) {
              wx.showToast({
                title: '信息修改成功',
                duration: 1000
              })
              setTimeout(() => {
                wx.switchTab({
                  url: '../home/home',
                })
              }, 1000)
            }
            else {
              wx.showToast({
                title: '修改失败，请重试',
                icon: 'none',
                duration: 1000
              })
            }
          }
        })
      }
      else {
        wx.showToast({
          title: '请输入正确的信息',
          icon: 'none',
        })
      }
      //个人
       if (that.data.number == 1) {
        wx.request({
          url: app.globalData.ipAddress + '/dogBrandPerson/newUpdate',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            personId: app.globalData.openId,
            address: that.data.ownerinfo.address,
            petId: that.data.petId,
            phoneNumber: that.data.ownerinfo.phone,
          },
          complete(res) {
            console.log(res)
            if (res.data.code == 1) {
              wx.showToast({
                title: '信息修改成功',
                duration: 1000
              })
              setTimeout(() => {
                wx.switchTab({
                  url: '../home/home',
                })
              }, 1000)
            }
            else {
              wx.showToast({
                title: '修改失败，请重试',
                icon: 'none',
                duration: 1000
              })
            }
          }
        })
      }
      else {
        wx.showToast({
          title: '请输入正确的信息',
          icon: 'none',
        })
      }
      }
      
    // var that = this
    // console.log(that.data)
    // //单位
    // if (that.data.ownerinfo.address !== '' && that.data.ownerinfo.phone !== '') {
    //   if (that.data.number == 2) {
    //     wx.request({
    //       url: app.globalData.ipAddress + '/dogBrandBusiness/newUpdate',
    //       method: "POST",
    //       header: {
    //         "Content-Type": "application/x-www-form-urlencoded"
    //       },
    //       data: {
    //         address: that.data.ownerinfo.address,
    //         petId: that.data.petId
    //       },
    //       success(res) {
    //         console.log(res)
    //       }
    //     })
    //     wx.request({
    //       url: app.globalData.ipAddress + '/dogBrandPerson/updateValue',
    //       method: "POST",
    //       header: {
    //         "Content-Type": "application/x-www-form-urlencoded"
    //       },
    //       data: {
    //         personId: app.globalData.openId,
    //         address: that.data.ownerinfo.address,
    //         phoneNumber: that.data.ownerinfo.phone,
    //         code: that.data.number
    //       },
    //       complete(res) {
    //         console.log(res)
    //         if (res.data.code == 1) {
    //           wx.showToast({
    //             title: '信息修改成功',
    //             duration: 1000
    //           })
    //           setTimeout(() => {
    //             wx.switchTab({
    //               url: '../home/home',
    //             })
    //           }, 1000)
    //         }
    //         else {
    //           wx.showToast({
    //             title: '修改失败，请重试',
    //             icon: 'none',
    //             duration: 1000
    //           })
    //         }
    //       }
    //     })
    //   }
    //   else {
    //     wx.showToast({
    //       title: '请输入正确的信息',
    //       icon: 'none',
    //     })
    //   }
    //   //个人
    //    if (that.data.number == 1) {
    //     wx.request({
    //       url: app.globalData.ipAddress + '/dogBrandPerson/newUpdate',
    //       method: "POST",
    //       header: {
    //         "Content-Type": "application/x-www-form-urlencoded"
    //       },
    //       data: {
    //         address: that.data.ownerinfo.address,
    //         petId: that.data.petId
    //       },
    //       success(res) {
    //         console.log(res)
    //       }
    //     })
    //   }
    //   wx.request({
    //     url: app.globalData.ipAddress + '/dogBrandPerson/updateValue',
    //     method: "POST",
    //     header: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     },
    //     data: {
    //       personId: app.globalData.openId,
    //       address: that.data.ownerinfo.address,
    //       phoneNumber: that.data.ownerinfo.phone,
    //       code: that.data.number
    //     },
    //     complete(res) {
    //       console.log(res)
    //       if (res.data.code == 1) {
    //         wx.showToast({
    //           title: '信息修改成功',
    //           duration: 1000
    //         })
    //         setTimeout(() => {
    //           wx.switchTab({
    //             url: '../home/home',
    //           })
    //         }, 1000)
    //       }
    //       else {
    //         wx.showToast({
    //           title: '修改失败，请重试',
    //           icon: 'none',
    //           duration: 1000
    //         })
    //       }
    //     }
    //   })
    // }
    // else {
    //   wx.showToast({
    //     title: '请输入正确的信息',
    //     icon: 'none',
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    var page = getCurrentPages()
    var index = page[1].__data__.index
    var info = page[1].__data__.dogInfo[index]
    that.setData({
      'doginfo.name': info.petName,
      'doginfo.weight': info.petWeight,
      'doginfo.type': info.petType,
      'doginfo.age': info.petAge,
      'doginfo.var': info.petVarieties,
      group: info.groupPhoto || info.petGroupPhoto,
      side: info.leftSidePhoto || info.petLeftSidePhoto,
      front: info.petBodyPhoto,
      'ownerinfo.name': info.personName || info.chargeName,
      'ownerinfo.phone': info.phoneNumber,
      'ownerinfo.address': info.address,
      petId: info.petId
    })
    if (info.petSex == 'M') {
      that.setData({
        'doginfo.sex': '公',
      })
    }
    else {
      that.setData({
        'doginfo.sex': '母',
      })
    }
    if (info.petSterilization == '0') {
      that.setData({
        'doginfo.state': '未绝育',
      })
    }
    else if (info.petSterilization == '1') {
      that.setData({
        'doginfo.state': '已绝育',
      })
    }
    if (info.horsing != null) {
      that.setData({
        number: 1
      })
    }
    else if (info.horsing == null) {
      that.setData({
        number: 2
      })
    }
    console.log(info)
    console.log(that.data.number)
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