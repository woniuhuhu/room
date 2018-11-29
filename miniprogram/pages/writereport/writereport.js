// miniprogram/pages/notice/notice.js
var util = require("../../util/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit: function (e) {
    var time = util.formatTime(new Date())
    e.detail.value.date=time
    const db = wx.cloud.database()
    var that=this
    db.collection('report').add({
      data: e.detail.value
      ,
      success: function(res) {
        //res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        that.setData({
          id:res._id
        })
        wx.showToast({
          title: '发表成功',
        })
        wx.navigateBack({
          delta: 1
      })
      }
    })
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
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