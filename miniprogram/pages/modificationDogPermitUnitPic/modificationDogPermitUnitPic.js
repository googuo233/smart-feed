// pages/unitDogPic/unitDogPic.js
const app = getApp()
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
        inactiveIcon: "../../images/four1.png",
      },
    ],
    dogimg: {
      petFullFacePhoto: '',
      petLeftSidePhoto: '',
      petRightSidePhoto: '',
      petGroupPhoto: '',

    },
    petFullFacePhoto: '',
    petLeftSidePhoto: '',
    petRightSidePhoto: '',
    petGroupPhoto: '',
    hide: [
      true,
      true,
      true,
      true,
    ],
    unhide: [
      false,
      false,
      false,
      false
    ],
    uploadPath: [],
    foreach: [],
    petId:'',
    pagecode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var page = getCurrentPages()
    var index = page[0].__data__.move1
    var info = page[0].__data__.applyInfo[index].date
    console.log(info)
    that.setData({
      petId:info.petId,
      'dogimg.petFullFacePhoto':info.petBodyPhoto,
      'dogimg.petLeftSidePhoto':info.petLeftSidePhoto,
      'dogimg.petRightSidePhoto':info.petRightSidePhoto,
       petFullFacePhoto:info.petBodyPhoto,
       petLeftSidePhoto:info.petLeftSidePhoto,
       petRightSidePhoto:info.petRightSidePhoto,
       'hide[0]': false,
       'unhide[0]': true,
       'hide[1]': false,
       'unhide[1]': true,
       'hide[2]': false,
       'unhide[2]': true,
    })
    if(info.petGroupPhoto!=''){
      that.setData({
        'dogimg.petGroupPhoto':info.petGroupPhoto,
        petGroupPhoto:info.petGroupPhoto,
        'hide[3]': false,
        'unhide[3]': true
      })
    }
    else{
      that.setData({
        'dogimg.petGroupPhoto':'',
        petGroupPhoto:'',
        'hide[3]': true,
        'unhide[3]': false
      })
    }
  },

  //点击下一步按钮
  btn() {
    var that = this
    var page = getCurrentPages()
    var check = 0
      if (that.data.petRightSidePhoto == '' || that.data.petLeftSidePhoto == '' || that.data.petFullFacePhoto == '') {
        wx.showToast({
          title: '图片信息不完整',
          icon: 'none'
        })
        that.setData({
          foreach: []
        })
      }
      else{
        check = 1
        that.setData({
          foreach: []
        })
      }
    
    if (check == 1) {
      // that.uploadImg(that.data.uploadPath,0)
      wx.request({
        url: app.globalData.ipAddress + '/dogBrandBusiness/updateBrandInfo',
        method: 'POST',
        data:{
        personId:app.globalData.openId,
        unitName:page[1].__data__.param.unitName,
        phoneNumber:page[1].__data__.param.phoneNumber,
        chargeName:page[1].__data__.param.personInCharge,
        chargeSex:page[1].__data__.param.chargeSex,
        address:page[1].__data__.param.address,
        chargeIdCardNumber:page[1].__data__.param.idCardNumber,
        licensePhoto:page[1].__data__.param.businessLicensePhoto,//营业执照
        chargeIdCardPhoto1:page[1].__data__.param.chargeIdCardPhoto1,//身份证1
        chargeIdCardPhoto2:page[1].__data__.param.chargeIdCardPhoto2,//身份证2
        legalIdCardPhoto:page[1].__data__.param.legalIdCardPhoto,//法人身份证
        legalName:page[1].__data__.lawName,//法人姓名
        applicationUnit:page[1].__data__.param.PoliceStation,//派出所
        registrationId:page[1].__data__.param.registrationId,//注册号

        petId:that.data.petId,
        petName:page[2].__data__.dogInfo.petName,
        petVarieties:page[2].__data__.dogInfo.petVarieties,
        petSex:page[2].__data__.dogInfo.petSex,
        petAge:page[2].__data__.dogInfo.petAge,
        petWeight:page[2].__data__.dogInfo.petWeight,
        petPurpose:page[2].__data__.dogInfo.petPurpose,
        petColor:page[2].__data__.dogInfo.color,
        petType:page[2].__data__.dogInfo.petCategory,
        sterilization:page[2].__data__.dogInfo.petSterilizationStatus,

        petBodyPhoto:that.data.dogimg.petFullFacePhoto,
        petGroupPhoto:that.data.dogimg.petGroupPhoto,
        petLeftSidePhoto:that.data.dogimg.petLeftSidePhoto,
        petRightSidePhoto:that.data.dogimg.petRightSidePhoto,
                    },

        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        complete(res) {
          console.log(res.data)
          if (res.data.code == 1) {
            wx.navigateTo({
              url: '../perReview/perReview',
            })
            that.setData({
              pagecode:1
            })
          }
          else {
            wx.showToast({
              title: '上传失败，请重试',
              icon: 'none'
            })
          }
        }
      })
    }
    else {

      wx.showToast({

        title: '提交信息不全',
        icon: 'none'

      })
    }












  },

  // 上传图片
  uploadImg(file, word) {
    let _this = this
    // console.log(file)
    // if(i<file.length){
    var filepath = file;
    // console.log(file[i])
    wx.uploadFile({
      filePath: filepath,
      name: 'image',
      url: app.globalData.ipAddress + '/uploadPetImage',
      success: res => {
        // if(i<file.length){
        // console.log(filepath)
        console.log("-------->" + JSON.parse(res.data).url);
        _this.setData({
          [word]: JSON.parse(res.data).url
        })
        console.log(_this.data.dogimg)
      }
    })
    // }
    // else{
    console.log("上传完毕")
    // }
  },




  //上传图片
  ChooseImg0: function (e) {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认最多9张图片，可自行更改
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [' album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePath = res.tempFilePaths[0];
        if (res.tempFiles[0].size > 5000000) {
          wx.showToast({
            title: '单张图片不能超过5M',
            icon: 'none'
          })
        }
        else {
          that.uploadImg(tempFilePath, 'dogimg.petFullFacePhoto')
          that.setData({

            petFullFacePhoto: tempFilePath,

            'hide[0]': false,

            'unhide[0]': true

          })
          that.data.uploadPath.push(that.data.petFullFacePhoto)
        }
      }
    })
  },

  //预览图片
  PreviewImg0: function (e) {
    let that = this;
    wx.previewImage({
      urls: that.data.petFullFacePhoto,
    })
  },
  //长按删除图片
  DeleteImg0: function (e) {
    console.log(e)
    var that = this;
    var tempFilePaths = that.data.petFullFacePhoto;
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            petFullFacePhoto: '',
            'hide[0]': true,
            'unhide[0]': false
          })
        } else if (res.cancel) {
          return false;
        }
        that.setData({
          tempFilePaths
        });
      }
    })
  },
  ChooseImg1: function (e) {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认最多9张图片，可自行更改
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePath = res.tempFilePaths[0];
        if (res.tempFiles[0].size > 5000000) {
          wx.showToast({
            title: '单张图片不能超过5M',
            icon: 'none'
          })
        }
        else {
          that.uploadImg(tempFilePath, 'dogimg.petLeftSidePhoto')
          that.setData({

            petLeftSidePhoto: tempFilePath,

            'hide[1]': false,

            'unhide[1]': true

          })
          that.data.uploadPath.push(that.data.petLeftSidePhoto)
        }
      }
    })







  },



  //预览图片



  PreviewImg1: function (e) {



    let that = this;



    wx.previewImage({



      urls: that.data.petLeftSidePhoto,



    })



  },



  //长按删除图片



  DeleteImg1: function (e) {



    console.log(e)



    var that = this;



    var tempFilePaths = that.data.petLeftSidePhoto;



    wx.showModal({



      title: '提示',



      content: '确定要删除此图片吗？',



      success: function (res) {



        if (res.confirm) {



          //console.log('点击确定了');



          that.setData({



            petLeftSidePhoto: '',



            'hide[1]': true,



            'unhide[1]': false



          })







        } else if (res.cancel) {



          return false;



        }



        that.setData({



          tempFilePaths



        });



      }



    })



  },



  ChooseImg2: function (e) {



    let that = this;



    wx.chooseImage({



      count: 1, // 默认最多9张图片，可自行更改



      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有



      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有



      success: res => {



        wx.showToast({



          title: '正在上传...',



          icon: 'loading',



          mask: true,



          duration: 1000



        })







        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片



        let tempFilePath = res.tempFilePaths[0];

        // console.log(res)



        if (res.tempFiles[0].size > 5000000) {

          wx.showToast({

            title: '单张图片不能超过5M',

            icon: 'none'

          })

        }



        else {

          that.uploadImg(tempFilePath, 'dogimg.petRightSidePhoto')
          that.setData({

            petRightSidePhoto: tempFilePath,

            'hide[2]': false,

            'unhide[2]': true

          })

          that.data.uploadPath.push(that.data.petRightSidePhoto)



        }

      }

    })



  },



  //预览图片



  PreviewImg2: function (e) {



    let that = this;



    wx.previewImage({



      urls: that.data.petRightSidePhoto,



    })



  },



  //长按删除图片



  DeleteImg2: function (e) {



    console.log(e)



    var that = this;



    var tempFilePaths = that.data.petRightSidePhoto;



    // var index = e.currentTarget.dataset.index;//获取当前长按图片下标



    wx.showModal({



      title: '提示',



      content: '确定要删除此图片吗？',



      success: function (res) {



        if (res.confirm) {



          that.setData({



            petRightSidePhoto: '',



            'hide[2]': true,



            'unhide[2]': false



          })



        } else if (res.cancel) {



          return false;



        }



        that.setData({



          tempFilePaths



        });



      }



    })



  },



  ChooseImg3: function (e) {



    let that = this;



    wx.chooseImage({



      count: 1, // 默认最多9张图片，可自行更改



      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有



      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有



      success: res => {



        wx.showToast({



          title: '正在上传...',



          icon: 'loading',



          mask: true,



          duration: 1000



        })







        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片



        let tempFilePath = res.tempFilePaths[0];



        if (res.tempFiles[0].size > 5000000) {

          wx.showToast({

            title: '单张图片不能超过5M',

            icon: 'none'

          })

        }



        else {
          that.uploadImg(tempFilePath, 'dogimg.petGroupPhoto')
          that.setData({

            petGroupPhoto: tempFilePath,

            'hide[3]': false,

            'unhide[3]': true

          })
        }

      }

    })



  },



  //预览图片



  PreviewImg3: function (e) {



    let that = this;



    wx.previewImage({



      urls: that.data.petRightSidePhoto,



    })
  },
  //长按删除图片
  DeleteImg3: function (e) {
    console.log(e)
    var that = this;
    var tempFilePaths = that.data.petGroupPhoto;
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            petGroupPhoto: '',
            'hide[3]': true,
            'unhide[3]': false
          })
        } else if (res.cancel) {
          return false;
        }
        that.setData({
          tempFilePaths
        });
      }
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