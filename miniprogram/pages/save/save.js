Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    one:'',
    two:'',
    name:'',
    nameValue:''
  },

  /**
       * 生命周期函数--监听页面初次渲染完成
       */
  onReady:function(){
   
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this
    var page = getCurrentPages()
    var index = page[0].__data__.save
    var info = page[0].__data__.dogInfo[index]
    console.log(info)
    var img = info.petBodyPhoto

  if(info.unitName!=undefined){
    _that.setData({
      name:'单位名称：',
      nameValue:info.unitName
    })

  }
  if(info.unitName==undefined){
    _that.setData({
      name:'犬主姓名：',
      nameValue:info.personName
    })
  }
  wx.showLoading({
    title: '正在生成',

  })
    //图片转化
  let that = this;
  // 测试数据
  let real_name = '我的犬证';
  let id_card = '黑河市';
  let id_card1 = info.petVarieties;
  let id_card2 = info.petColor;
  let id_card3 = info.petName;
  let id_card4 = info.serialId;
  let id_card5 = _that.data.nameValue;
  let id_card6 = info.phoneNumber;
  // let id_card7 = info.address;
  // let id_card71= _that.data.two;
  let id_card8 = info.issuingTime;
  let id_card9 = info.auditTime;
  let winWidth = wx.getSystemInfoSync().windowWidth;// 获取当前设备的可视宽度
  let winHeight = wx.getSystemInfoSync().windowHeight;// 获取当前设备的可视高度
  that.setData({
    winWidth: winWidth,
    winHeight: winHeight
  })
  console.log(that.data.winWidth)
  console.log(that.data.winHeight)
  //绘制canvas图
  let promise1 = new Promise(function (resolve, reject) {
    wx.getImageInfo({
      src: '../../images/bck.png',
      success: function (res) {
        console.log(res)
        resolve(res);
      }
    })
  });
  let promise2 = new Promise(function (resolve, reject) {
    wx.getImageInfo({
      src: img,
      success: function (res) {
        console.log(res)
        resolve(res);
      }
    })
  });
  Promise.all([
    promise1, promise2
  ]).then(res => {
    console.log(res)
    const ctx = wx.createCanvasContext('shareImg')

    //主要就是计算好各个图文的位置，利用当前设备的宽高度对图片和文字进行居中
    ctx.drawImage('../../' + res[0].path, 0, 0, 355, 358)
    ctx.drawImage(res[1].path, 215, 80, 112.5, 127)


    ctx.setTextAlign('center')
    ctx.setFillStyle('white')
    ctx.setFontSize(16)
    ctx.fillText(real_name, (that.data.winWidth) / 2, 40)

    ctx.setTextAlign('left')
    ctx.setFillStyle('white')
    ctx.setFontSize(14)
    ctx.fillText('当前城市:  ' + id_card, 24, 60)
    ctx.setTextAlign('left')
    ctx.setFillStyle('black')
    ctx.setFontSize(15)
    ctx.fillText('犬       种：' + id_card1, 24, 90)
    ctx.fillText('毛       色：' + id_card2, 24, 115)
    ctx.fillText('犬       名：' + id_card3, 24, 140)
    ctx.fillText('犬  证  号：' + id_card4, 24, 165)
    ctx.fillText(_that.data.name + id_card5, 24, 190)
    ctx.fillText('电话号码：' + id_card6, 24, 215)
    // ctx.fillText('住       址：' + id_card7, 24, 240)
    // ctx.fillText(id_card71, 24, 265)
    ctx.fillText('签发日期：' + id_card8, 24, 290)
    ctx.fillText('年       审：' + id_card9, 24, 310)

    var text = info.address;//这是要绘制的文本
    var chr =text.split("");//这个方法是将一个字符串分割成字符串数组
    var temp = "";
    var row = [];
    ctx.setFontSize(15)
    ctx.setFillStyle("black")
    for (var a = 0; a < chr.length; a++) {
     if (ctx.measureText(temp).width < 220) {
      temp += chr[a];
     }
     else {
      a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
      row.push(temp);
      temp = "";
     }
    }
    row.push(temp); 
  
    //如果数组长度大于2 则截取前两个
    if (row.length > 2) {
     var rowCut = row.slice(0, 2);
     var rowPart = rowCut[1];
     var test = "";
     var empty = [];
     for (var a = 0; a < rowPart.length; a++) {
      if (ctx.measureText(test).width < 220) {
       test += rowPart[a];
      }
      else {
       break;
      }
     }
     empty.push(test);
     var group = empty[0] + "..."//这里只显示两行，超出的用...表示
     rowCut.splice(1, 1,group);
     row = rowCut;
    }
    for (var b = 0; b < row.length; b++) {
      ctx.fillText('住       址：', 24,240);
     ctx.fillText(row[b], 100,240+b*20,300);
    }
    ctx.stroke()
    ctx.draw(false,function(e){
      console.log(e)
      if(e.errMsg=="drawCanvas:ok"){
        wx.hideLoading()
      }
  })

  })


  },
 
  /**
   * 保存到相册
  */
  save: function () {
    var that = this;
    //获取相册授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              that.savaImageToPhoto();
            }
          })
        }else{
          that.savaImageToPhoto();
        }
      }
    })
  },
 
  savaImageToPhoto: function(){
    let that = this;
    wx.showLoading({
      title: '努力生成中...'
    })
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.winWidth,
      height: that.data.winHeight*0.95,
      // destWidth: that.data.winWidth,
      // destHeight: that.data.winHeight*0.6,
      destWidth: that.data.winWidth * 750 / wx.getSystemInfoSync().windowWidth, 
      destHeight: (that.data.winHeight*0.95) * 450 / wx.getSystemInfoSync().windowWidth, 
      canvasId: 'shareImg',
      success: function (res) {
        wx.hideLoading()
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showModal({
              content: '图片已保存到相册了',
              showCancel: false,
              confirmText: '确认',
              confirmColor: 'black',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                  that.setData({
                    hidden: true
                  })
                }
              }
            })
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
})