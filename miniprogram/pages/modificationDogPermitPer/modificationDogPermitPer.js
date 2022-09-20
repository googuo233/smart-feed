const app = getApp()
// pages/unitReview/unitReview.js
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
        inactiveIcon: "../../images/two1.png",
      },
      {
        text: '犬只照片',
        inactiveIcon: "../../images/three1.png",
      },
      {
        text: '提交审核',
        inactiveIcon: "../../images/four1.png",
      },
    ],
    option1: [
      { text: '请选择申办单位', value: 0 },
      { text: '黑河市公安局爱辉分局花园边境派出所', value: 1 },
      { text: '黑河市公安局爱辉分局兴安边境派出所', value: 2 },
      { text: '黑河市公安局爱辉分局海兰边境派出所', value: 3 },
      { text: '黑河市公安局爱辉分局西兴边境派出所', value: 4 },
      { text: '黑河市公安局经济合作区分局通江路边境派出所', value: 5 },
      { text: '黑河市公安局经济合作区分局大黑河岛边境派出所', value: 6 },
    ],
    value1: 0,
    ownerImg: {
      personBodyPhoto: '',
      houseLicense: '',
      idCardPhoto1: '',
      idCardPhoto2: ''
    },

    tempFilePaths0: '',
    tempFilePaths1: '',
    tempFilePaths2: '',
    tempFilePaths3: '',
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
    ownerInfo: {
      ownerName: '',
      ownerSex: '',
      applicationUnit: '',
      ownerAddress: '',
      phoneNumber: '',
      idCardNumber: '',
      horsing: '',//住房状态
      houseLicense: '',//房屋凭证
      personBodyPhoto: '',
      idCardPhoto1: '',
      idCardPhoto2: ''
    },
    foreach: [],
    m: false,
    f: false,
    hor1: false,
    hor2: false,
    disabled:false,
    info:[],
  },

  getHouse(e) {
    console.log(e)
    this.setData({
      'ownerInfo.horsing': e.detail.value
    })
  },

  getAddress(e) {
    this.setData({
      'ownerInfo.ownerAddress': e.detail.value
    })
    // console.log(this.data.ownerInfo.ownerAddress)
  },
  getphone(res) {
    if (res.detail.value.length === 11) {
      var reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (reg.test(res.detail.value) === false) {
        wx.showToast({
          title: '手机号码输入有误！',
          icon: 'none',
        })
      } else {
        this.setData({
          'ownerInfo.phoneNumber': res.detail.value,
        })
      }
    }
    if (res.detail.keyCode == 8) {
      this.setData({
        'ownerInfo.phoneNumber': res.detail.value,
      })
    }
  },

  getId: function (res) {
    if (res.detail.value.length === 18) {
      var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if (reg.test(res.detail.value) === false) {
        wx.showToast({
          title: '身份证输入不合法！',
          icon: 'none',
        })
      } else {
        this.setData({
          'ownerInfo.idCardNumber': res.detail.value
        })
      }

    }
    if (res.detail.keyCode == 8) {
      this.setData({
        'ownerInfo.idCardNumber': res.detail.value,
      })
    }
  },


  getIssuingUnit(e) {
    var that = this
    this.setData({
      'ownerInfo.applicationUnit': that.data.option1[e.detail].text
    })
    // console.log(that.data.ownerInfo.applicationUnit)
  },

  getSex(e) {
    this.setData({
      'ownerInfo.ownerSex': e.detail.value
    })
  },

  getDogOwner(e) {
    this.setData({
      'ownerInfo.ownerName': e.detail.value
    })
    // console.log(this.data.ownerInfo.ownerName)
  },
  //上传图片

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
          that.uploadImg(tempFilePath, 'ownerImg.personBodyPhoto')
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

    console.log(e)

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
          that.uploadImg(tempFilePath, 'ownerImg.houseLicense')
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

          duration: 1500

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
          //   that.uploadImg(tempFilePath,'dogImg.idCardPhoto1')
          // that.setData({

          //   tempFilePaths2: tempFilePath,

          //   'hide[2]':false,

          //   'unhide[2]':true

          // })
          // that.data.uploadPath.push(that.data.tempFilePaths2)
          wx.uploadFile({
            filePath: tempFilePath,
            name: 'image',
            url: app.globalData.ipAddress + '/uploadIdCardImage',
            complete(res) {
              console.log(JSON.parse(res.data))
              if (JSON.parse(res.data).code == 1) {
                that.setData({
                  tempFilePaths2: tempFilePath,
                  'hide[2]': false,
                  'unhide[2]': true
                })
                // console.log(that.data.legalIdCardPhoto)
                that.data.uploadPath.push(that.data.tempFilePaths2)
                that.uploadImg(tempFilePath, 'ownerImg.idCardPhoto1')
              }
              else {
                wx.showToast({
                  title: JSON.parse(res.data).msg,
                  icon: "none"
                })
              }
            }
          })
        }
      }
    })

  },

  //预览图片

  PreviewImg2: function (e) {

    let that = this;

    wx.previewImage({

      urls: that.data.tempFilePaths2,

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

          duration: 1500

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
          wx.uploadFile({
            filePath: tempFilePath,
            name: 'image',
            url: app.globalData.ipAddress + '/uploadIdCardImage',
            complete(res) {
              console.log(JSON.parse(res.data))
              if (JSON.parse(res.data).code == 1) {
                that.setData({
                  tempFilePaths3: tempFilePath,
                  'hide[3]': false,
                  'unhide[3]': true
                })
                // console.log(that.data.legalIdCardPhoto)
                that.data.uploadPath.push(that.data.tempFilePaths3)
                that.uploadImg(tempFilePath, 'ownerImg.idCardPhoto2')
              }
              else {
                wx.showToast({
                  title: JSON.parse(res.data).msg,
                  icon: "none"
                })
              }
            }
          })
          //   that.uploadImg(tempFilePath,'ownerImg.idCardPhoto2')
          // that.setData({

          //   tempFilePaths3: tempFilePath,

          //   'hide[3]':false,

          //   'unhide[3]':true

          // })
          // that.data.uploadPath.push(that.data.tempFilePaths3)

        }
      }
    })

  },

  //预览图片

  PreviewImg3: function (e) {

    let that = this;

    wx.previewImage({

      urls: that.data.tempFilePaths2,

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
    var index = page[0].__data__.move1
    var info = page[0].__data__.applyInfo[index].date
    console.log(info)
    //自动填写姓名性别
    if(info!=null){
    that.setData({
      'ownerInfo.ownerName': info.personName,
      'ownerInfo.applicationUnit': info.applicationUnit,
      'option1[0].text':info.applicationUnit,
      'ownerInfo.idCardNumber': info.idCardNumber,
      'ownerInfo.ownerAddress': info.address,
      'ownerInfo.phoneNumber': info.phoneNumber,
      'ownerImg.houseLicense': info.houseLicense,
      'ownerImg.idCardPhoto1': info.idCardPhoto1,
      'ownerImg.idCardPhoto2': info.idCardPhoto2,
      tempFilePaths1:info.houseLicense,
      tempFilePaths2:info.idCardPhoto1,
      tempFilePaths3:info.idCardPhoto2,
      'hide[1]': false,
      'unhide[1]': true,
      'hide[2]': false,
      'unhide[2]': true,
      'hide[3]': false,
      'unhide[3]': true,
    })
    if(info.personBodyPhoto!=''){
      that.setData({
        'ownerImg.personBodyPhoto': info.personBodyPhoto,
         tempFilePaths0:info.houseLicense,
         'hide[0]': false,
         'unhide[0]': true,
      })
    }
    else{
      that.setData({
        'ownerImg.personBodyPhoto':'',
         tempFilePaths0:'',
         'hide[0]': true,
         'unhide[0]': false,
      })
    }
    if (info.personSex == 'F') {
      that.setData({
        f: true,
        'ownerInfo.ownerSex': info.personSex,
      })
    }
    if (info.personSex == 'M') {
      that.setData({
        m: true,
        'ownerInfo.ownerSex': info.personSex,
      })
    }
    if (info.horsing == "自有房") {
      that.setData({
        hor1: true,
        'ownerInfo.horsing': info.horsing,
      })
    }
    if (info.horsing == "租房") {
      that.setData({
        hor2: true,
        'ownerInfo.horsing': info.horsing,
      })
    }
  }
  },
  //点击下一步按钮
  btn() {
    console.log(this.data.ownerInfo)
    var that = this
    var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    var reg2 = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    var tempOwner;
    if (reg.test(that.data.ownerInfo.idCardNumber) === false) {
      wx.showToast({
        title: '身份证号输入错误',
        icon: 'none',
        duration: 1000
      })
    }
    else if (reg2.test(that.data.ownerInfo.phoneNumber) === false) {
      wx.showToast({
        title: '手机号输入错误',
        icon: 'none',
        duration: 1000
      })
    }
    else{
    that.data.foreach.push(that.data.ownerInfo.ownerName)
    that.data.foreach.push(that.data.ownerInfo.ownerSex)
    that.data.foreach.push(that.data.ownerInfo.applicationUnit)
    that.data.foreach.push(that.data.ownerInfo.ownerAddress)
    that.data.foreach.push(that.data.ownerInfo.phoneNumber)
    that.data.foreach.push(that.data.ownerInfo.idCardNumber)
    that.data.foreach.push(that.data.ownerInfo.horsing)
    console.log(that.data.foreach)
    var tempOwner = that.data.foreach
    var check = 0
    for (var i = 0; i < tempOwner.length; i++) {
      if (tempOwner[i] == '' || that.data.tempFilePaths1 == '' || that.data.tempFilePaths2 == '' || that.data.tempFilePaths3 == '') {
        wx.showToast({
          title: '信息填写不完整或有误',
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
      wx.navigateTo({
        url: '../modificationDogPermitPerInfo/modificationDogPermitPerInfo',
      })
    }
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
      url: app.globalData.ipAddress + "/uploadPersonImage",
      success: res => {
        console.log("-------->" + JSON.parse(res.data).url);
        _this.setData({
          [word]: JSON.parse(res.data).url
        })
        console.log(_this.data.ownerImg)
        // if(i<file.length){
        // console.log(filepath)
        // console.log("-------->"+i);
        //       console.log("图片上传成功"+JSON.parse(res.data).data.url);
        //       if(i==0){
        //         _this.setData({
        //           'ownerInfo.personBodyPhoto':JSON.parse(res.data).data.url
        //         })
        //         console.log(_this.data.ownerInfo.personBodyPhoto)
        //       }
        //       if(i==1){
        //         _this.setData({
        //           'ownerInfo.houseLicense':JSON.parse(res.data).data.url
        //         })
        //         console.log(_this.data.ownerInfo.houseLicense)
        //       }
        //       if(i==2){
        //         _this.setData({
        //           'ownerInfo.idCardPhoto1':JSON.parse(res.data).data.url
        //         })
        //         console.log(_this.data.ownerInfo.idCardPhoto1)
        //       }
        //       if(i==3){
        //            _this.setData({
        //           'ownerInfo.idCardPhoto2':JSON.parse(res.data).data.url
        //         })
        //         console.log(_this.data.ownerInfo.idCardPhoto2)
        //       }
        //       i++;
        //       _this.uploadImg(file,i);
        // }
      }
    })
    // }
    // else{
    console.log("上传完毕")
    // }
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