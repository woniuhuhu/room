// miniprogram/pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    openid: ''


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../topics/topics',
      })
      return
    }
    //onGetOpenid()
    wx.showShareMenu({
      withShareTicket: true
    })


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log('哈哈', res)
              if (!this.logged) {
                //console.log("啦啦啦，我是买包的小行家")
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  userInfo: res.userInfo,
                  logged:true,
                })
              }
            }
          })
        }
      }
    })
    this.onGetOpenid()
  },
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        this.data.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  onsubmit: function (e) {
    console.log('haha', this.data.openid, '啦啦', e.detail.formId)
    const db = wx.cloud.database()
    db.collection('from_id').doc(this.data.openid).set({
      data: {
        from_id: e.detail.formId
      }
    })
    wx.showToast({
      title: '静候战旗召唤'
    })
    // wx.cloud.callFunction({
    //   // 云函数名称
    //   name: 'formid',
    //   // 传给云函数的参数
    //   data: {
    //     from_id: e.detail.formId
    //   },
    // })
    // .then(res => {
    //   console.log('云函数执行成功的返回',res.result) // 3
    // })
    // .catch(console.error)
    // wx.cloud.callFunction({
    //   name: 'formid',
    //   data: e.detail,
    //   success: res => {
    //     console.log('姜辉',res)
    //   },
    //   fail: err => {
    //     console.log("哈哈",err)
    //   }     
    // })
  },
  apply: function () {
    wx.navigateTo({
      url: '/pages/door/door'
    })
  },
  notice: function () {
    wx.navigateTo({
      url: '/pages/notice/notice'
    })
  },
  report: function () {
    wx.navigateTo({
      url: '/pages/writereport/writereport'
    })
  },
  // onGetUserInfo: function (e) {
  //   if (!this.logged && e.detail.userInfo) {
  //     this.setData({
  //       logged: true,
  //       avatarUrl: e.detail.userInfo.avatarUrl,
  //       userInfo: e.detail.userInfo
  //     })
  //   }

  // },

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

  }
})