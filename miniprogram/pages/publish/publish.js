// pages/publish/publish.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topic: '',
        info: '',
        fileList: [],   // 预览图片用的数组      
        imgUrls: [],     // 上传图片用的数组
        filesPath: [],
        fileUrl: [],
        image: '',
        btnview:false
    },

    inputTopic(e) {
        var that = this
        that.setData({
            topic: e.detail.value
        })
        // console.log(that.data.topic)
    },

    inputDetail(e) {
        var that = this
        that.setData({
            info: e.detail.value
        })
        // console.log(that.data.info)
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

    submit() {
        var that = this
        if (that.data.topic == '' && that.data.info == '') {
            wx.showToast({
                title: '信息填写不完整',
                icon: 'none'
            })
        }
        else if (that.data.info == '') {
            wx.showToast({
                title: '具体信息不能为空',
                icon: 'none'
            })
        }
        else if (that.data.topic == '') {
            wx.showToast({
                title: '标题不能为空',
                icon: 'none'
            })
        }
        else {
            if (that.data.fileList.length > 0) {
                that.uploadImg(that.data.fileList, 0)
                that.setData({
                    btnview:true
                })
                wx.showToast({
                    title: '提交中',
                    icon: 'loading',
                    duration: 3000,
                })

                setTimeout(() => {
                    wx.request({
                        url: app.globalData.ipAddress + '/lose/add',
                        method: 'POST',
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: {
                            id: 0,
                            title: that.data.topic,
                            content: that.data.info,
                            uploadPerson: app.globalData.uploadPerson,
                            img: that.data.fileUrl,
                            openId: app.globalData.openId
                        },
                        success(res) {
                            console.log(res)
                            wx.showToast({
                                title: '已提交等待审核',
                                duration: 2000,
                                success() {
                                    setTimeout(() => {
                                        wx.switchTab({
                                            url: '../info/info',
                                        })
                                        that.setData({
                                            btnview:false
                                        })
                                    }, 2000);

                                }
                            })
                        },
                        fail(res) {
                            console.log('网络异常请重试')
                            that.setData({
                                btnview:false
                            })
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
                        _this.data.image += _this.data.fileUrl[i]
                        i++;
                        _this.uploadImg(file, i);
                    }
                    if (i = file.length) {
                        console.log(_this.data.image)
                        console.log(_this.data.fileUrl)
                    }
                }
            })
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        // wx.request({
        //   url: 'http://42.101.45.23:8001/lose/add',
        //   data:{
        //       id:0,
        //       title:'23',
        //       content:'23',
        //       img:'https://wx.qlogo.cn/mmhead/CttmTaYSYkRGQV5TMh0g3d43tltQs175oldT4rEhyibayd6d0EIu1Vw/0',
        //       uploadPerson:'111',
        //   },
        //   method:'POST',
        //   header:{
        //       "Content-Type": "application/x-www-form-urlencoded"
        //   },
        //   complete(res){
        //       console.log(res)
        //   }
        // })
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