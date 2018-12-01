// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')
//const got = require('got')
cloud.init()
const wxContext = cloud.getWXContext()
const db = cloud.database()

let appid = 'wx1b5e6eff126ccd3c'
let secret = '918e5afb65c993c74e02d0da209dd1e4'
let token_url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret
let temp_id = 'HNswPEzog1R8njlAW1Yuhk_nPlPx8b_-7BRVRhsYV7I'
let open_id = 'oCffV5S1mTwyjzDqG-ZdrgWYXDdQ'
let msg_url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='
exports.main = async (event, context) => {
  console.log('哈哈哈哈', event)
  let token_response = await got(token_url)
  console.log('啦啦啦啦啦啦啦')
  let token = JSON.parse(token_response.body).access_token
  console.log('豆豆豆豆豆豆豆豆')
  let msg = await got(msg_url + token, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      touser: event.userInfo.openId,
      template_id: temp_id,
      page: 'pages/topics/topics',
      form_id: event.from_id,
      data: {
        keyword1: {
          value: "战旗通知"
        },
        keyword2: {
          value: "队长发布了新的公告"
        }
      },
      emphasis_keyword: "keyword1.DATA"
    })
  })
  console.log('快快快快快快快快')
  // db.collection('from_id').doc(wxContext.OPENID).get()
  //   .then(res => {
  //     console.log('姜辉', res.data)
  //   })

}



}