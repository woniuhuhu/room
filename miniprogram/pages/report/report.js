// miniprogram/pages/report/report.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: [],

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getData()

  },
  getData: function () {
    const db = wx.cloud.database()
    db.collection('report').get({
      success: res => {
        this.setData({
          title: res.data
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  }

})