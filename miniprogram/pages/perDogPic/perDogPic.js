const app = getApp()
// pages/unitDogPic/unitDogPic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: '犬主信息',
        inactiveIcon: "../../images/Preone.png",
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
    dogImg: {
      petBodyPhoto: '',
      leftSidePhoto: '',
      rightSidePhoto: '',
      groupPhoto: ''
    },
    hide: [
      true,
      true,
      true,
      true
    ],
    unhide: [
      false,
      false,
      false,
      false
    ],
    uploadPath: [],
    tempFilePaths0: '',
    tempFilePaths1: '',
    tempFilePaths2: '',
    tempFilePaths3: '',
    foreach: [],
    petId:'',
    btnview:false
  },

  ChooseImg0: function (e) {

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
          that.uploadImg(tempFilePath, 'dogImg.petBodyPhoto')
          that.setData({

            tempFilePaths0: tempFilePath,

            'hide[0]': false,

            'unhide[0]': true

          })
          that.data.uploadPath.push(that.data.tempFilePaths0)
        }
      }
    })

  },

  //预览图片

  PreviewImg0: function (e) {

    let that = this;

    wx.previewImage({

      urls: that.data.tempFilePaths0,

    })

  },

  //长按删除图片

  DeleteImg0: function (e) {

    // console.log(e)

    var that = this;

    var tempFilePaths = that.data.tempFilePaths0;

    // var index = e.currentTarget.dataset.index;//获取当前长按图片下标

    wx.showModal({

      title: '提示',

      content: '确定要删除此图片吗？',

      success: function (res) {

        if (res.confirm) {

          //console.log('点击确定了');

          that.setData({

            tempFilePaths0: '',

            'hide[0]': true,

            'unhide[0]': false

          })

        } else if (res.cancel) {

          //console.log('点击取消了');

          return false;

        }

        // that.setData({

        //   tempFilePaths

        // });

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
          that.uploadImg(tempFilePath, 'dogImg.leftSidePhoto')
          that.setData({

            tempFilePaths1: tempFilePath,

            'hide[1]': false,

            'unhide[1]': true

          })
          that.data.uploadPath.push(that.data.tempFilePaths1)

        }
      }


    })



  },

  //预览图片

  PreviewImg1: function (e) {

    let that = this;

    wx.previewImage({

      urls: that.data.tempFilePaths1,

    })

  },

  //长按删除图片

  DeleteImg1: function (e) {

    console.log(e)

    var that = this;

    var tempFilePaths = that.data.tempFilePaths1;

    wx.showModal({

      title: '提示',

      content: '确定要删除此图片吗？',

      success: function (res) {

        if (res.confirm) {

          //console.log('点击确定了');

          that.setData({

            tempFilePaths1: '',

            'hide[1]': true,

            'unhide[1]': false

          })



        } else if (res.cancel) {

          return false;

        }

        // that.setData({

        //   tempFilePaths

        // });

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
          that.uploadImg(tempFilePath, 'dogImg.rightSidePhoto')
          that.setData({

            tempFilePaths2: tempFilePath,

            'hide[2]': false,

            'unhide[2]': true

          })
          that.data.uploadPath.push(that.data.tempFilePaths2)

        }
      }
    })

  },

  //预览图片

  PreviewImg2: function (e) {

    let that = this;

    wx.previewImage({

      urls: that.data.rightSidePhoto,

    })

  },

  //长按删除图片

  DeleteImg2: function (e) {

    console.log(e)

    var that = this;

    var tempFilePaths = that.data.tempFilePaths2;

    // var index = e.currentTarget.dataset.index;//获取当前长按图片下标

    wx.showModal({

      title: '提示',

      content: '确定要删除此图片吗？',

      success: function (res) {

        if (res.confirm) {

          that.setData({

            tempFilePaths2: '',

            'hide[2]': true,

            'unhide[2]': false

          })

        } else if (res.cancel) {

          return false;

        }

        // that.setData({

        //   tempFilePaths

        // });

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
          that.uploadImg(tempFilePath, 'dogImg.groupPhoto')
          that.setData({

            tempFilePaths3: tempFilePath,

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

      urls: that.data.tempFilePaths3,

    })

  },

  //长按删除图片

  DeleteImg3: function (e) {

    console.log(e)

    var that = this;

    var tempFilePaths = that.data.tempFilePaths3;

    // var index = e.currentTarget.dataset.index;//获取当前长按图片下标

    wx.showModal({

      title: '提示',

      content: '确定要删除此图片吗？',

      success: function (res) {

        if (res.confirm) {

          that.setData({

            tempFilePaths3: '',

            'hide[3]': true,

            'unhide[3]': false

          })

        } else if (res.cancel) {

          return false;

        }

        // that.setData({

        //   tempFilePaths

        // });

      }

    })

  },

  onClickNav({ detail = {} }) {

    this.setData({

      mainActiveIndex: detail.index || 0,

    });

  },

  onClickItem({ detail = {} }) {

    const activeId = this.data.activeId === detail.id ? null : detail.id;

    this.setData({ activeId });

  },


  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },
  onClickItem({ detail = {} }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;

    this.setData({ activeId });
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var page = getCurrentPages()
    var index = page[2].__data__.index
    var info = page[2].__data__.dogInfo[index]
    console.log(info)
    //判断petId是否为空，若为空则证明用户直接申领犬证
    //若petId不为空，则写对应的petId的值
    if(page[2].__data__.btn2==1){
      that.setData({
        petId:info.id
      })
    }
    else{
      that.setData({
        petId:''
      })
    }
  },

  // 上传图片
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
        console.log(_this.data.dogImg)
      }
    })
    // }
    // else{
    console.log("上传完毕")
    // }
  },

  //点击下一步按钮
  btn() {
    var that = this
    var page = getCurrentPages()

    that.data.foreach.push(that.data.tempFilePaths0)
    that.data.foreach.push(that.data.tempFilePaths1)
    that.data.foreach.push(that.data.tempFilePaths2)
    var tempOwner = that.data.foreach
    var check = 0
    for (var i = 0; i < tempOwner.length; i++) {
      if (tempOwner[i] == '' || that.data.tempFilePaths0 == '' || that.data.tempFilePaths1 == '' || that.data.tempFilePaths2 == '') {
        wx.showToast({
          title: '图片信息不完整',
          icon: 'none'
        })
        that.setData({
          foreach: []
        })
        break;
      }
      if (i == tempOwner.length - 1) {
        check = 1
        that.setData({
          foreach: []
        })
      }
    }

    if (check == 1) {
      // that.uploadImg(that.data.uploadPath,0)
      that.setData({
        btnview:true
      })
      wx.request({
        url: app.globalData.ipAddress + '/dogBrandPerson/newApply',
        method: 'POST',
        // data: {
        //   personId: app.globalData.openId,
        //   applicationUnit: page[2].__data__.ownerInfo.applicationUnit,//派出所
        //   idCardNumber: page[2].__data__.ownerInfo.idCardNumber,//身份证号
        //   horsing: page[2].__data__.ownerInfo.horsing,//住房状态
        //   houseLicense: page[2].__data__.ownerImg.houseLicense,//住房凭证
        //   personBodyPhoto: page[2].__data__.ownerImg.personBodyPhoto,//手持身份证照片
        //   idCardPhoto1: page[2].__data__.ownerImg.idCardPhoto1,//身份证正面
        //   idCardPhoto2: page[2].__data__.ownerImg.idCardPhoto2,//身份证反面
        //   petBodyPhoto: page[4].__data__.dogImg.petBodyPhoto,//狗正面照
        //   leftSidePhoto: page[4].__data__.dogImg.leftSidePhoto,//狗左侧照
        //   rightSidePhoto: page[4].__data__.dogImg.rightSidePhoto,//狗右侧照
        //   groupPhoto: page[4].__data__.dogImg.groupPhoto//人狗合照
        // },
        data:{
          personId:app.globalData.openId,
          personName:page[3].__data__.ownerInfo.ownerName,//人名
          personSex:page[3].__data__.ownerInfo.ownerSex,//人性别
          applicationUnit:page[3].__data__.ownerInfo.applicationUnit,//派出所
          address:page[3].__data__.ownerInfo.ownerAddress,
          phoneNumber:page[3].__data__.ownerInfo.phoneNumber,
          idCardNumber:page[3].__data__.ownerInfo.idCardNumber,//身份证号
          horsing:page[3].__data__.ownerInfo.horsing,//住房状态
          houseLicense:page[3].__data__.ownerImg.houseLicense,//住房凭证
          personBodyPhoto:page[3].__data__.ownerImg.personBodyPhoto,//手持身份证照片
          idCardPhoto1:page[3].__data__.ownerImg.idCardPhoto1,//身份证正面
          idCardPhoto2:page[3].__data__.ownerImg.idCardPhoto2,//身份证反面
          
          petId:that.data.petId,
          petName:page[4].__data__.dogInfo.petName,//狗名
          petType:page[4].__data__.dogInfo.petCategory,//宠物类型
          petVarieties:page[4].__data__.dogInfo.petVarieties,//狗种
          petSex:page[4].__data__.dogInfo.petSex,//公母
          petAge:page[4].__data__.dogInfo.petAge,//狗年龄
          petWeight:page[4].__data__.dogInfo.petWeight,//狗重
          petPurpose:page[4].__data__.dogInfo.petPurpose,//狗用途
          sterilization:page[4].__data__.dogInfo.petSterilizationStatus,//绝育是否
          petColor:page[4].__data__.dogInfo.color,


          petBodyPhoto:that.data.dogImg.petBodyPhoto,//狗正面照
          petLeftSidePhoto:that.data.dogImg.leftSidePhoto,//狗左侧照
          petRightSidePhoto:that.data.dogImg.rightSidePhoto,//狗右侧照
          petGroupPhoto:that.data.dogImg.groupPhoto//人狗合照
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
              btnview:false
            })
          }
          else {
            wx.showToast({
              title: '上传失败，请重试',
              icon: 'none'
            })
            that.setData({
              btnview:false
            })
          }
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