// pages/captureReason/captureReason.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],   // 预览图片用的数组      
    imgUrls: [],     // 上传图片用的数组
    filesPath: [],
    fileUrl: [],
    image: '',
    lawEnforcers: '',
    orderNote: '',//订单备注
    orderNoteMax: 100,//订单备注最大长度
    content: '',
    btnview:false
  },

  // 图片预览

  afterRead(event) {
    var that = this
    var temp = []
    var temp2 = []
    const { file } = event.detail; // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式

    // console.log(event.detail)

    if (that.data.fileList.length == 0) {
      for (let n = 0; n < file.length; n++) {
        // console.log(file[n].size)
        if (file[n].size > 5000000) {
          wx.showToast({
            title: '每张图片不能超过5M，请重新上传',
            icon: 'none',
            duration: 1500
          })
          break;
        }
        else {
          temp.push(file[n])
        }
      }
      // console.log(temp)
      if (temp.length == file.length) {
        that.setData({
          fileList: temp
        })
      }
    }
    else {
      for (let n = 0; n < file.length; n++) {
        if (file[n].size > 5000000) {
          wx.showToast({
            title: '每张图片不能超过5M，请重新上传',
            icon: 'none',
            duration: 1500
          })
          break;
        }
        else {
          temp2.push(file[n])
        }
      }
      // console.log(temp2.length+"\n"+file.length)
      if (temp2.length == file.length) {
        // console.log('1')
        that.setData({
          imgUrls: that.data.fileList
        })
        for (var n = 0; n < file.length; n++) {
          that.data.imgUrls.push(file[n])
        }
        // console.log(that.data.imgUrls)
        that.setData({
          fileList: that.data.imgUrls
        })
      }
    }
    if (that.data.fileList.length >= 6) {
      var fileList = that.data.fileList
      fileList.splice(5, that.data.length - 5)
      that.setData({
        fileList: fileList
      })
    }
  },
  // 删除图片
  delete(event) {
    console.log(event)
    let imgDelIndex = event.detail.index
    let fileList = this.data.fileList
    fileList.splice(imgDelIndex, 1)
    console.log('删除图片的', fileList)
    this.setData({
      fileList: fileList
    })
    // console.log(this.data.fileList)
  },
  // 上传图片
  uploadImg(file, i) {
    let _this = this
    // console.log(this.data.fileList)
    // console.log(file)
    if (i < file.length) {
      var filepath = file[i].path;
      wx.uploadFile({
        filePath: filepath,
        name: 'image',
        url: app.globalData.ipAddress + '/uploadPetImage',
        success: res => {
          if (i < file.length) {
            //   console.log(res)
            console.log("-------->" + i);
            // _this.data.filesPath.push(JSON.parse(res.data).data.url);
            console.log("图片上传成功！\n" + JSON.parse(res.data).url);
            _this.data.fileUrl.push(JSON.parse(res.data).url)

            _this.data.image = _this.data.image + _this.data.fileUrl[i] + ','

            console.log(_this.data.image)
            i++;
            _this.uploadImg(file, i);
          }

          // if(i=file.length){
          //   _this.setData({
          //     image:_this.data.image.slice(0,_this.data.image.lastIndexOf(','))
          //   })
          //     console.log(_this.data.image)
          // }
        },
      })
    }

  },


  //订单备注textarea
  inputs: function (e) {
    // 获取输入框的内容
    var that = this
    var value = e.detail.value;
    this.setData({//更新备注内容到vue缓存
      orderNote: e.detail.value
    })
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最多字数限制
    if (len >= that.data.orderNoteMax) {
      that.setData({
        content: '达到100个字符'
      })
    } else {
      that.setData({
        content: ''
      })
    } return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    // this.setData({
    //   currentWordNumber: len //当前字数
    // });
  },
  success() {
    var that = this
    if (that.data.orderNote == '' && that.data.filesPath == '') {
      wx.showToast({
        title: '信息填写不完整',
        icon: 'none'
      })
    }
    else if (that.data.orderNote == '') {
      wx.showToast({
        title: '上报原因不能为空',
        icon: 'none'
      })
    }
    // else if(that.data.filesPath==''){
    //     wx.showToast({
    //       title: '图片不能为空',
    //       icon:'none'
    //     })
    // }
    else {
      if (that.data.fileList.length > 0) {
        that.uploadImg(that.data.fileList, 0)
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 5000
        })
        that.setData({
          btnview:true
        })
        setTimeout(() => {
          var temp = that.data.fileUrl.toString()
          console.log(temp)
          that.setData({
            fileUrl: temp
          })
        }, 1500)
        setTimeout(() => {
          wx.request({
            url: app.globalData.ipAddress + '/LawManagement/addLaw',
            method: 'GET',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              id: '',
              type: '宠物收缴',
              image: that.data.fileUrl,
              describe: that.data.orderNote,//信息上报内容
              lawEnforcers: that.data.lawEnforcers,//执法者姓名
              DogBrandBySerialId: '',//犬只序列号
            },
            success(res) {
              console.log(res)
              if (res.data.code == 1) {
                wx.navigateTo({
                  url: '../Report/Report',
                })
                that.setData({
                  btnview:false
                })
              }
              else {
                wx.showToast({
                  title: '网络异常请重试',
                  icon: 'none'
                })
                that.setData({
                  btnview:false
                })
              }
            }
          })
        }, 3000);
      }
      else {
        wx.showToast({
          title: '请至少上传一张图片',
          icon: 'none'
        })
        that.setData({
          btnview:false
        })
      }
    }
  },
  back(){
    wx.switchTab({
      url: '../home/home',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = getCurrentPages()
    var that = this
    that.setData({
      lawEnforcers: page[1].__data__.lawEnforcers,
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