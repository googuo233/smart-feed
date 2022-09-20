// pages/annualInfo/annualInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic_info: '',//宠物照片
    pet_name: '',//宠物姓名
    pet_type: '',//宠物类型
    pet_breed: '',//宠物品种
    pet_sex: '',//宠物性别
    ownerDate: '',//犬证时间
    whether: '是',//是否接种疫苗
    petId:''
  },
  //申报年审
  jumpPage: function () {
    var that = this
    var page = getCurrentPages()
    if(page[0].__data__.reviewType == 0){//单位年审
    wx.request({
      url: app.globalData.ipAddress + '/dogBrandBusiness/newAnnualReviewByPersonIdPetId',
      data: {
        personId: app.globalData.openId,
        petId:that.data.petId
      },
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000,
            success(res) {
              setTimeout(() => {
                wx.switchTab({
                  url: '../home/home',
                })
              }, 3000)
            }
          })
        }
        else if (res.data.code == -1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000,
            success(res) {
              setTimeout(() => {
                wx.switchTab({
                  url: '../home/home',
                })
              }, 3000)
            }
          })
        }
        else if (res.data.code == 1) {
          wx.navigateTo({
            url: '../annualSuccess/annualSuccess',
          })
        }

      },
      fail(res) {
        wx.showToast({
          title: '网络异常，请重试',
        })
      }
    })
  }
  if(page[0].__data__.reviewType == 1){//个人年审
    wx.request({
      url: app.globalData.ipAddress + '/dogBrandPerson/newAnnualReviewByPersonIdPetId',
      data: {
        personId: app.globalData.openId,
        petId:that.data.petId
      },
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000,
            success(res) {
              setTimeout(() => {
                wx.switchTab({
                  url: '../home/home',
                })
              }, 3000)
            }
          })
        }
        else if (res.data.code == -1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000,
            success(res) {
              setTimeout(() => {
                wx.switchTab({
                  url: '../home/home',
                })
              }, 3000)
            }
          })
        }
        else if (res.data.code == 1) {
          wx.navigateTo({
            url: '../annualSuccess/annualSuccess',
          })
        }

      },
      fail(res) {
        wx.showToast({
          title: '网络异常，请重试',
        })
      }
    })
  }
  },
  //预约接种
  jumpPageTwo: function () {
    wx.showToast({
      title: '请在首页预约疫苗',
      icon: 'none',
      duration: 3000,
      success(res) {
        setTimeout(() => {
          wx.switchTab({
            url: '../home/home',
          })
        }, 3000)
      }
    })




    // wx.navigateTo({
    //   url:'../annualOrder/annualOrder',
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var page = getCurrentPages()
    var index = page[1].__data__.index
    var info = page[1].__data__.dogInfo[index]
    console.log(info)
    that.setData({
      pic_info: info.petBodyPhoto,//犬只照片
      pet_name: info.petName,//犬只名称
      pet_type: info.petType,//宠物类型
      pet_breed: info.petVarieties,//宠物品种
      ownerDate: info.auditTime,//犬牌有效期
      petId:info.petId
    })
    if (info.petSex == 'M') {
      that.setData({
        pet_sex: '公',//宠物性别
      })
    }
    else if (info.petSex == 'F') {
      that.setData({
        pet_sex: '母',//宠物性别
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