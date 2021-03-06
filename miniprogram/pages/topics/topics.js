const app = getApp()
var navList = [{
    id: "gg",
    title: "公告"
  },
  {
    id: "zb",
    title: "战报"
  },
   {
     id: "ssb",
     title: "英雄榜"
   },
  // {
  //   id: "mvp",
  //   title: "图片秀"
  // },
  // {
  //   id: "zgb",
  //   title: "讨论区"
  // }
];

Page({
  data: {
    activeIndex: 0,
    navList: navList,
    tab: 'gg',
    notice: null,
    date: null,
    apply: [],
    counts: 0
  },
  onShow: function () {
    this.getData();
    this.setData({
      activeIndex: 0,
    })
  },

  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },
  // 点击获取对应分类的数据
  onTapTag: function (e) {
    var that = this;
    var tab = e.currentTarget.id;
    var index = e.currentTarget.dataset.index;
    that.setData({
      activeIndex: index,
      tab: tab,
      page: 1
    });
    if (tab == 'zb') {
      wx.navigateTo({
        url: '/pages/report/report'
      })
    } else if (tab == 'ssb') {
      wx.navigateTo({
        url: '/pages/ssb/ssb'
      })
    } else if (tab == 'mvp') {
      wx.navigateTo({
        url: '/pages/img/img'
      })

    } else if (tab == 'zgb') {
      wx.navigateTo({
        url: '/pages/discuss/discuss'
      })
    }
  },
  getData: function () {
    const db = wx.cloud.database()
    let _this = this

    db.collection('apply').get({
      success: res => {
        this.setData({
          apply: res.data
        })
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      }
    })
    db.collection('apply').count({
      success: (res) => {
        console.log(res.total)
        this.setData({
          counts: res.total
        })
        if (res.total > 20) {
          db.collection('apply').skip(20)
            .get()
            .then((res) => {
              let new_apply = this.data.apply.concat(res.data)
              this.setData({
                apply: new_apply
              })
            })
            .catch('错误啦，叫你能', console.error)
        }
        console.log('哈哈', this.data.counts)

      }
    })

    db.collection('notice').get({
      success: res => {
        this.setData({
          notice: res.data[0],
          date: res.data[0].date
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