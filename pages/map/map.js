// pages/tabBar/tab3.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 113.324520,
    latitude: 23.099994,
    markers: [],
    controls: [],
    circles: [],
    searchValue: "医院"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("onLoad...");
    // 接收界面传参
    if (options.searchValue !== undefined){
      this.setData({ searchValue: options.searchValue});
    }
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      // key: 'SJOBZ-6DOKX-DME4P-77E5K-XI6Z7-5MBBY'
      // key: 'AIXBZ-MAYKK-YJFJJ-A6EQK-SZNJO-GYBBG'
      key: 'U7UBZ-W3TWP-SQBDK-LV4GZ-QXR3H-VUFUT'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map');
    this.getControlInfo();
    this.getMarkerInfo();
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
  
  },
  /**
   * 事件--regionchange
   */
  regionchange(e) {
    if (e.type == 'end') {
      this.refreshMarkers();
    }
    
  },
  /**
   * 事件--markertap
   */
  markertap(e) {
    //  console.log(e.markerId)
  },
  /**
   * 事件--controltap
   */
  controltap(e) {
    // console.log("controltap");
    if (e.controlId == 1) {
    } else if (e.controlId == 2) {
      this.moveToLocation();
    } else if (e.controlId == 3) {
      this.navigateToSearchPage();
    }
  },
  /**
   * 获取control位置
   */
  getControlInfo: function () {
    var res = wx.getSystemInfoSync();
    var controls = 
    [
      {
        id: 1,
        iconPath: '/images/control.png',
        position: {
          left: res.windowWidth / 2 - 22,
          top: res.windowHeight / 2 - 34,
          width: 40,
          height: 40
        },
        clickable: true
      }, 
      {
        id: 2,
        iconPath: '/images/center.png',
        position: {
          left: 5,
          top: res.windowHeight - 55,
          width: 40,
          height: 40
        },
        clickable: true
      },
      {
        id: 3,
        iconPath: '/images/search.png',
        position: {
          left: res.windowWidth - 45,
          top: res.windowHeight - 55,
          width: 40,
          height: 40
        },
        clickable: true
      }
    ];
    this.setData({ controls: controls });
  },
  /**
   * 获取marker信息
   */
  getMarkerInfo: function () {
    // 调用接口
    var that = this;
    qqmapsdk.search({
      keyword: that.data.searchValue,
      location: {
        latitude: that.data.latitude,
        longitude: that.data.longitude
      },
      success: function (res) {
        var confs = res.data;
        var markers = that.genMarkers(confs);
        that.setData({markers:markers});
      },
      fail: function (res) {
        wx.showModal({
          title: 'fail',
          content: JSON.stringify(res),
        });
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  /**
   * 生成marker对象集合
   */
  genMarkers: function (confs) {
    var markers = [];
    for (var i = 0; i < confs.length; i++) {
      var marker = this.genMarker(confs[i]);
      markers.push(marker);
    }
    return markers;
  },
  /**
   * 生成marker对象
   */
  genMarker: function (conf) {
    return {
      iconPath: "/images/location.png",
      id: conf.id,
      latitude: conf.location.lat,
      longitude: conf.location.lng,
      width: 20,
      height: 30,
      callout: {
        content: conf.title,
        fontSize: 16,
        textAlign: "center",
        color: "#ffffff",
        bgColor: "#00aaaa",
        borderRadius: 1,
        padding: 5,
        display: "BYCLICK"
      }
    };
  },
  /**
   *  刷新markers
   */
  refreshMarkers: function () {
    // 清空旧markers
    // this.setData({ markers: [] });
    var that = this;
    // 更新中间点经纬度，刷新markers
    this.mapCtx.getCenterLocation({
      success: function (res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        });
        that.getMarkerInfo();
      }
    });
  },
  /**
   * 归位
   */
  moveToLocation: function() {
    this.mapCtx.moveToLocation();
  },
  /**
   * 跳转至search页
   */
  navigateToSearchPage: function() {
    wx.navigateTo({
      url: "search?searchValue="+this.data.searchValue
    });
  }
})
