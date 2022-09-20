// pages/unitReview/unitReview.js
var _unitName = ''
var _registrationId = ''
var _PoliceStation = ''
var _address = ''
var _personInCharge = ''
var _chargeSex = ''
var _phoneNumber = ''
var _idCardNumber = ''
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
      { text: '请选择申办单位', value: 0, id: 0 },
      { text: '黑河市公安局爱辉分局花园边境派出所', value: 1, id: 1 },
      { text: '黑河市公安局爱辉分局兴安边境派出所', value: 2, id: 2 },
      { text: '黑河市公安局爱辉分局海兰边境派出所', value: 3, id: 3 },
      { text: '黑河市公安局爱辉分局西兴边境派出所', value: 4, id: 4 },
      { text: '黑河市公安局经济合作区分局通江路边境派出所', value: 5, id: 5 },
      { text: '黑河市公安局经济合作区分局大黑河岛边境派出所', value: 6, id: 6 },
    ],
    value1: 0,




    param: {
      unitName: "",//单位名称
      registrationId: "",//单位注册号
      PoliceStation: "",//申办派出所
      address: "",//养犬地址
      personInCharge: "",//养犬负责人
      chargeSex: "",//负责人性别
      phoneNumber: "",//手机号
      idCardNumber: "",//身份证号
      businessLicensePhoto: '',
      legalIdCardPhoto: '',
      chargeIdCardPhoto1: '',
      chargeIdCardPhoto2: '',
    },
    businessLicensePhoto: '',
    legalIdCardPhoto: '',
    chargeIdCardPhoto1: '',
    chargeIdCardPhoto2: '',
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
    allinfo: [],
    lawName: '',
    disabled:false

  },

  lawname(res) {
    if (res.detail.keyCode == 8) {
      this.setData({
        lawName: res.detail.value
      })
    } else {
      this.setData({
        lawName: res.detail.value
      })
    }
  },



  //点击下一步按钮
  btn() {
    // console.log(that.data.param)
    var that = this
    var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    var reg2 = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    var tempOwner;
    if (reg.test(that.data.param.idCardNumber) === false) {
      wx.showToast({
        title: '身份证号输入错误',
        icon: 'none',
        duration: 1000
      })
    }
    else if (reg2.test(that.data.param.phoneNumber) === false) {
      wx.showToast({
        title: '手机号输入错误',
        icon: 'none',
        duration: 1000
      })
    }
    else{
    that.data.allinfo.push(that.data.param.unitName)
    that.data.allinfo.push(that.data.param.registrationId)
    that.data.allinfo.push(that.data.param.PoliceStation)
    console.log(that.data.param.PoliceStation)
    that.data.allinfo.push(that.data.param.address)
    that.data.allinfo.push(that.data.param.personInCharge)
    that.data.allinfo.push(that.data.param.chargeSex)
    that.data.allinfo.push(that.data.param.phoneNumber)
    that.data.allinfo.push(that.data.param.idCardNumber)
    console.log(that.data.param)
    var tempOwner = that.data.allinfo
    var check = 0
    for (var i = 0; i < tempOwner.length; i++) {
      if (tempOwner[i] == '') {
        wx.showToast({
          title: '信息填写不完整或有误',
          icon: 'none'
        })
        that.setData({
          allinfo: []
        })
        break;
      }
      if (i == tempOwner.length - 1) {
        check = 1
        that.setData({
          allinfo: []
        })
      }
    }

    if (check == 1) {
      if (that.data.businessLicensePhoto != '' && that.data.legalIdCardPhoto != '' && that.data.chargeIdCardPhoto1 != '' && that.data.chargeIdCardPhoto2 != '' && that.data.lawName != '') {
        // that.uploadImg(that.data.uploadPath,0)
        /*跳转页面*/
        wx.navigateTo({
          url: '../modificationDogPermitUnitInfo/modificationDogPermitUnitInfo',
        })
      }
      else {
        wx.showToast({
          title: '信息填写不完整',
          icon: "none"
        })
      }
    }
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
      url: app.globalData.ipAddress + '/uploadPersonImage',
      complete: res => {
        // if(i<file.length){
        // console.log(filepath)
        // console.log(res)
        console.log("-------->" + JSON.parse(res.data).url);
        _this.setData({
          [word]: JSON.parse(res.data).url
        })
      }
    })
    // }
    // else{
    console.log("上传完毕")
    // }
  },

  // 填写单位信息
  /*单位名称*/
  unitName(e) {
    _unitName = e.detail.value
    this.setData({
      'param.unitName': _unitName
    })
  },
  // 单位注册号
  registrationId(e) {
    _registrationId = e.detail.value
    this.setData({
      'param.registrationId': _registrationId
    })
  },
  //申办派出所
  PoliceStation: function (e) {
    var that = this
    _PoliceStation = that.data.option1[e.detail].text
    this.setData({
      'param.PoliceStation': _PoliceStation
    })
  },
  // 养犬地址
  address(e) {
    _address = e.detail.value
    this.setData({
      'param.address': _address
    })
  },
  // 养犬负责人
  personInCharge(e) {
    _personInCharge = e.detail.value
    this.setData({
      'param.personInCharge': _personInCharge
    })
  },
  //负责人性别
  getSex(e) {
    _chargeSex = e.detail.value
    this.setData({
      'param.chargeSex': _chargeSex
    })
  },
  // 负责人手机号
  phoneNumber(res) {
    _phoneNumber = res.detail.value
    if (res.detail.value.length === 11) {
      var reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (reg.test(res.detail.value) === false) {
        wx.showToast({
          title: '手机号码输入有误！',
          icon: 'none',
        })
      } else {
        this.setData({
          'param.phoneNumber': _phoneNumber,
        })
      }
    }
    if (res.detail.keyCode == 8) {
      this.setData({
        'param.phoneNumber': res.detail.value,
      })
    }
  },
  // 负责人身份证号
  idCardNumber: function (res) {

    _idCardNumber = res.detail.value
    if (res.detail.value.length === 18) {
      var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if (reg.test(res.detail.value) === false) {
        wx.showToast({
          title: '身份证输入不合法！',
          icon: 'none',
        })
      } else {
        this.setData({
          'param.idCardNumber': _idCardNumber
        })
      }
    }
    if (res.detail.keyCode == 8) {
      this.setData({
        'param.idCardNumber': res.detail.value,
      })
    }
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
          wx.uploadFile({
            filePath: tempFilePath,
            name: 'image',
            url: app.globalData.ipAddress + '/uploadBusinessLicence',
            complete(res) {
              console.log(JSON.parse(res.data))
              if (JSON.parse(res.data).code == 1) {
                that.setData({
                  businessLicensePhoto: tempFilePath,
                  'hide[0]': false,
                  'unhide[0]': true,
                  lawName: JSON.parse(res.data).data
                })
                that.uploadImg(tempFilePath, 'param.businessLicensePhoto')
                that.data.uploadPath.push(that.data.businessLicensePhoto)
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
  PreviewImg0: function (e) {
    let that = this;
    wx.previewImage({
      urls: that.data.businessLicensePhoto,
    })
  },
  //长按删除图片
  DeleteImg0: function (e) {
    console.log(e)
    var that = this;
    var tempFilePaths = that.data.businessLicensePhoto;
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            businessLicensePhoto: '',
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
          wx.uploadFile({
            filePath: tempFilePath,
            name: 'image',
            url: app.globalData.ipAddress + '/uploadIdCardImage',
            complete(res) {
              console.log(JSON.parse(res.data))
              if (JSON.parse(res.data).code == 1) {
                that.setData({
                  legalIdCardPhoto: tempFilePath,
                  'hide[1]': false,
                  'unhide[1]': true
                })
                // console.log(that.data.legalIdCardPhoto)
                that.data.uploadPath.push(that.data.legalIdCardPhoto)
                that.uploadImg(tempFilePath, 'param.legalIdCardPhoto')
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



  PreviewImg1: function (e) {



    let that = this;



    wx.previewImage({



      urls: that.data.legalIdCardPhoto,



    })



  },



  //长按删除图片



  DeleteImg1: function (e) {



    console.log(e)



    var that = this;



    var tempFilePaths = that.data.legalIdCardPhoto;



    wx.showModal({



      title: '提示',



      content: '确定要删除此图片吗？',



      success: function (res) {



        if (res.confirm) {



          //console.log('点击确定了');



          that.setData({



            legalIdCardPhoto: '',



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
          wx.uploadFile({
            filePath: tempFilePath,
            name: 'image',
            url: app.globalData.ipAddress + '/uploadIdCardImage',
            complete(res) {
              console.log(JSON.parse(res.data))
              if (JSON.parse(res.data).code == 1) {
                that.setData({
                  chargeIdCardPhoto1: tempFilePath,
                  'hide[2]': false,
                  'unhide[2]': true
                })
                // console.log(that.data.legalIdCardPhoto)
                that.data.uploadPath.push(that.data.chargeIdCardPhoto1)
                that.uploadImg(tempFilePath, 'param.chargeIdCardPhoto1')
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



      urls: that.data.chargeIdCardPhoto1,



    })



  },



  //长按删除图片



  DeleteImg2: function (e) {



    console.log(e)



    var that = this;



    var tempFilePaths = that.data.chargeIdCardPhoto1;



    // var index = e.currentTarget.dataset.index;//获取当前长按图片下标



    wx.showModal({



      title: '提示',



      content: '确定要删除此图片吗？',



      success: function (res) {



        if (res.confirm) {



          that.setData({



            chargeIdCardPhoto1: '',



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
          wx.uploadFile({
            filePath: tempFilePath,
            name: 'image',
            url: app.globalData.ipAddress + '/uploadIdCardImage',
            complete(res) {
              console.log(JSON.parse(res.data))
              if (JSON.parse(res.data).code == 1) {
                that.setData({
                  chargeIdCardPhoto2: tempFilePath,
                  'hide[3]': false,
                  'unhide[3]': true
                })
                // console.log(that.data.legalIdCardPhoto)
                that.data.uploadPath.push(that.data.chargeIdCardPhoto2)
                that.uploadImg(tempFilePath, 'param.chargeIdCardPhoto2')
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



  PreviewImg3: function (e) {



    let that = this;



    wx.previewImage({



      urls: that.data.chargeIdCardPhoto1,



    })
  },
  //长按删除图片
  DeleteImg3: function (e) {
    console.log(e)
    var that = this;
    var tempFilePaths = that.data.chargeIdCardPhoto2;
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            chargeIdCardPhoto2: '',
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var page = getCurrentPages()
    var index = page[0].__data__.move1
    var info = page[0].__data__.applyInfo[index]
    console.log(info.date)
    //自动填写
    if(info!=null){
    that.setData({
      'param.unitName': info.date.unitName,
      'param.registrationId': info.date.registrationId,
      'param.PoliceStation': info.date.applicationUnit,
      'option1[0].text':info.date.applicationUnit,
      'param.address': info.date.address,
      'param.idCardNumber': info.date.chargeIdCardNumber,
      'param.personInCharge': info.date.chargeName,
      'param.phoneNumber': info.date.phoneNumber,
      lawName: info.date.legalName,
      'param.businessLicensePhoto': info.date.licensePhoto,//营业执照
      'param.legalIdCardPhoto': info.date.legalIdCardPhoto,//法人身份证照
      'param.chargeIdCardPhoto1': info.date.chargeIdCardPhoto1,
      'param.chargeIdCardPhoto2': info.date.chargeIdCardPhoto2,
    //预览照片  
      businessLicensePhoto: info.date.licensePhoto,//营业执照
      legalIdCardPhoto: info.date.legalIdCardPhoto,//法人身份证照
      chargeIdCardPhoto1: info.date.chargeIdCardPhoto1,
      chargeIdCardPhoto2: info.date.chargeIdCardPhoto2,
      'hide[0]': false,
      'unhide[0]': true,
      'hide[1]': false,
      'unhide[1]': true,
      'hide[2]': false,
      'unhide[2]': true,
      'hide[3]': false,
      'unhide[3]': true,


      disabled:true
    })
    if (info.date.chargeSex == 'F') {
      that.setData({
        f: true,
        'param.chargeSex': info.date.chargeSex,
      })
    }
    if (info.date.chargeSex == 'M') {
      that.setData({
        m: true,
        'param.chargeSex': info.date.chargeSex,
      })
    }
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