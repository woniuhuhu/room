Page({

  /**
   * 页面的初始数据
   */
  data: {
    people: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  compares: function (prop) {
    return function (a,b) {
      let value1 = a[prop]
      let value2 = b[prop]
      return value2-value1
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
    const db = wx.cloud.database();
    db.collection('top_scorer').get()
      .then((res) => {
        let datas = (res.data).sort(this.compares('goal'))
        this.setData({
          people: datas
        })
        //console.log('哈哈',res.data)
      })
    db.collection('top_scorer').count({
      success: (res) => {
        if (res.total > 20) {
          db.collection('top_scorer').skip(20)
            .get()
            .then((res) => {
              let new_people = this.data.people.concat(res.data).sort(this.compares('goal'))
              this.setData({
                people: new_people
              })
             // console.log('丫丫',this.people)
            })
            .catch('错误啦，叫你能', console.error)
        }
       

      }
    })

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