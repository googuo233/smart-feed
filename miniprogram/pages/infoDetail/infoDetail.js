// pages/infoDetail/infoDetail.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: '',
        cover: [],
        img: [],
        content: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var page = getCurrentPages()

        var that = this

        var id = page[0].__data__.index

        that.setData({
            detail: page[0].__data__.detail[id],
            cover: page[0].__data__.detail[id].cover,
            content: page[0].__data__.detail[id].content
        })
        that.data.img.push(that.data.cover)
        // console.log(that.data.detail)
        // console.log(that.data.cover)
        // console.log(that.data.content)
        var data = that.data.content
        console.log(data)
        WxParse.wxParse('article', 'html', data, that, 40);




        wx.setNavigationBarTitle({
            title: that.data.detail.title,
            complete(res) {
                console.log(res)
            }

        })
    },





    // 图片点击放大效果
    previewImg: function (event) {
        var that = this;
        console.log(event.currentTarget.dataset.src)
        wx.previewImage({
            current: event.currentTarget.dataset.src,
            urls: that.data.img,//所有要预览的图片的地址集合 数组形式
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