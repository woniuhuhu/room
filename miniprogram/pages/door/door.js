// miniprogram/pages/door/door.js
//const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    appid:null

  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData.openid)
  },
  formSubmit: function (e) {
    e.detail.value.done=true
    const db = wx.cloud.database()
    var that=this
    db.collection('apply').add({
      data: e.detail.value
      ,
      success: function(res) {
        //res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        that.setData({
          id:res._id
        })
        wx.showToast({
          title: '报名成功，加油~~',
        })
        wx.navigateBack({
          delta: 1
      })
      }
    })
   // console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  giveup: function () {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'delete',
      // 传给云函数的参数
      data: {
      },
      success: function(res) {
        wx.showToast({
          title: '陪老卞足疗去咯',
        })
        wx.navigateBack({
          delta: 1
      })
      },
      fail: console.error
    })
  },
  clear: function () {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'clear',
      // 传给云函数的参数
      data: {
      },
      success: function(res) {
        wx.showToast({
          title: '清空完毕！',
        })
        wx.navigateBack({
          delta: 1
      })
      },
      fail: console.error
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

  }

})