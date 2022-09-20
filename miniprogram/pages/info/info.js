// pages/infoDetail/infoDetail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bgcolor1: 'rgb(26, 90, 226)',
        bgcolor2: 'rgb(234, 238, 250)',
        wcolor1: 'white',
        wcolor2: 'rgb(26, 90, 226)',
        bg: {
            act: 'rgb(26, 90, 226)',
            pos: 'rgb(234, 238, 250)'
        },
        wcolor: {
            act: 'white',
            pos: 'rgb(26, 90, 226)'
        },
        hide1: false,
        hide2: true,
        detail: [],
        dogDetail: [],
        index: -1,
        dogIndex: -1,
        page: 1,
        page1: 1,
    },

    Topublish(e) {
        // console.log(e)
        if (app.globalData.openId == '') {
            wx.showToast({
                title: '请先登录再体验',
                icon: 'none'
            })
        } else {
            var that = this
            if (app.globalData.check) {
                wx.getUserProfile({
                    desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                    success: (res) => {
                        //   console.log(res)
                        app.globalData.check = true
                        app.globalData.uploadPerson = res.userInfo.nickName
                        that.toPub()
                    },
                    fail(res) {
                        console.log(res)
                    }
                })
            }
            else {
                this.toPub()
            }
        }

    },

    toPub() {
        wx.navigateTo({
            url: '../publish/publish',
        })
    },

    toDogDetail(e) {
        console.log(e)
        this.setData({
            dogIndex: e.currentTarget.dataset.dog
        })
        wx.navigateTo({
            url: '../dogDetail/dogDetail',
        })
    },

    info() {
        var that = this
        that.setData({
            bgcolor1: that.data.bg.act,
            wcolor1: that.data.wcolor.act,
            bgcolor2: that.data.bg.pos,
            wcolor2: that.data.wcolor.pos,
            hide1: false,
            hide2: true,
        })

    },

    search() {
        var that = this
        that.setData({
            bgcolor1: that.data.bg.pos,
            wcolor1: that.data.wcolor.pos,
            bgcolor2: that.data.bg.act,
            wcolor2: that.data.wcolor.act,
            hide1: true,
            hide2: false,
        })
    },

    //跳转到详情页面
    toDetail(e) {
        // console.log(e)
        this.setData({
            index: e.currentTarget.dataset.index
        })
        console.log(this.data.index)
        wx.navigateTo({
            url: '../infoDetail/infoDetail',
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        wx.request({
            url: app.globalData.ipAddress + '/article/select',
            method: 'GET',
            data: {
                page: that.data.page,
                limit: 10,
                name: 'admin'
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            complete(res) {
                //   console.log(res.data.data)
                //   if(res.data.data.length>0){
                //   for(var i=0;i<res.data.data.length;i++){
                //   that.data.detail.push(res.data.data)
                //   }     
                that.setData({
                    detail: that.data.detail.concat(res.data.data),
                    page: ++(that.data.page)
                })

                //   }
                // console.log(that.data.detail)
            }
        })
        //请求寻犬
        wx.request({
            url: app.globalData.ipAddress + '/lose/selectRange',
            method: 'GET',
            data: {
                page: that.data.page1,
                limit: 10,
                start: '',
                end: '',
                title: '',
                uploadPerson: '',
                openId: ''
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            complete(res) {
                console.log(res.data)
                if (res.data.data.length > 0) {
                    for (var i = 0; i < res.data.data.length; i++) {

                        if (res.data.data[i].stateCode == 2) {
                            that.data.dogDetail.push(res.data.data[i])
                        }
                    }

                    that.setData({
                        dogDetail: that.data.dogDetail,
                        page1: ++(that.data.page1)
                    })
                }
                for (var n = 0; n < that.data.detail.length; n++) {
                    var date = that.data.detail[n].addTime.substring(0, 10)
                    console.log(date)
                    var word = 'detail[' + n + '].addTime'
                    that.setData({
                        ['detail[' + n + '].addTime']: date
                    })
                }
                for (var n = 0; n < that.data.dogDetail.length; n++) {
                    var date = that.data.dogDetail[n].addTime.substring(0, 10)
                    var word = 'dogDetail[' + n + '].addTime'
                    that.setData({
                        ['dogDetail[' + n + '].addTime']: date
                    })
                }
                console.log(that.data.dogDetail)
                console.log(that.data.detail)
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
        if (app.globalData.search) {
            this.search()
            wx.pageScrollTo({
                scrollTop: 0
            })
            app.globalData.search = false
        }
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

        var that = this

        setTimeout(() => {
            wx.request({
                url: app.globalData.ipAddress + '/article/select',
                method: 'GET',
                data: {
                    page: 1,
                    limit: 15,
                    name: 'admin'
                },
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success(res) {
                    that.setData({
                        detail: res.data.data,
                        page: 2
                    })
                    console.log(res)
                    wx.showToast({
                        title: '刷新成功',
                    })
                    //   }
                    // console.log(that.data.detail)
                },
                fail: function () {
                    wx.showToast({
                        title: '刷新失败',
                        icon: 'none'
                    })
                },
            })
            //请求寻犬
            wx.request({
                url: app.globalData.ipAddress + '/lose/selectRange',
                method: 'GET',
                data: {
                    page: 1,
                    limit: 15,
                    start: '',
                    end: '',
                    title: '',
                    uploadPerson: '',
                    openId: ''
                },
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success(res) {
                    console.log(res.data)
                    if (res.data.data.length > 0) {
                        that.setData({
                            dogDetail: []
                        })
                        for (var i = 0; i < res.data.data.length; i++) {

                            if (res.data.data[i].stateCode == 2) {
                                var temp = res.data.data[i]
                                that.data.dogDetail.push(res.data.data[i])
                            }
                        }

                        that.setData({
                            dogDetail: that.data.dogDetail,
                            page1: 2
                        })

                    }
                    for (var n = 0; n < that.data.detail.length; n++) {
                        var date = that.data.detail[n].addTime.substring(0, 10)
                        var word = 'detail[' + n + '].addTime'
                        that.setData({
                            ['detail[' + n + '].addTime']: date
                        })
                    }
                    for (var n = 0; n < that.data.dogDetail.length; n++) {
                        var date = that.data.dogDetail[n].addTime.substring(0, 10)
                        var word = 'dogDetail[' + n + '].addTime'
                        that.setData({
                            ['dogDetail[' + n + '].addTime']: date
                        })
                    }

                }
            })

            console.log(that.data.dogDetail)
            console.log(that.data.detail)
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        }, 1000)

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function (e) {
        this.onLoad()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },



})