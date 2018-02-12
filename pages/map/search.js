// pages/map/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "医院"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接收界面传参
    if (options.searchValue !== undefined) {
      this.setData({ searchValue: options.searchValue });
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
  
  },
  /**
   * 搜索
   */
  formSubmit: function (e) {
    wx.reLaunch({
      url: 'map?searchValue=' + e.detail.value.input
    })
  },
  /**
   * 重置
   */
  formReset: function () {
  }
})