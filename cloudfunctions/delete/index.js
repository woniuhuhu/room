// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    console.log('哈哈哈哈哈', event)
    return await db.collection('apply').where({
      _openid: event.userInfo.openId
    }).remove()
  } catch (e) {
    console.error('抓小猪', e)
  }
}