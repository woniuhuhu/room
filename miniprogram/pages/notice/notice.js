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
    wx.cloud.callFunction({
      // 云函数名称
      name: 'notice',
      // 传给云函数的参数
      data: {
        biaohao: e.detail.value.biaohao,
        content: e.detail.value.content,
        date: time
      },
      success: function (res) {
        wx.showToast({
          title: '提交完毕',
        })
        // wx.navigateBack({
        //   delta: 1
        // })
      },
      fail: console.error
    })
    const db = wx.cloud.database()
    db.collection('from_id').get()
      .then(res => {
        console.log('姜辉', res.data)
        for (var i = 0; i < res.data.length; i++){
          wx.cloud.callFunction({
            name: 'formid',
            data: {
              openId: res.data[i]._openid,
              from_id:res.data[i].from_id
            },
            success: function (res) {
              console.log(i,'我是华丽的分割线',res)
            }            
          })
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
})