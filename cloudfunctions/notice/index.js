// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log('event:中文分割比奥斯 ',event)
  try {
    console.log('event:啦啦啦啦啦 ', event)
    return await db.collection('notice').doc('W_5KNs6YbCHWYkaE').update({
      data:{
      biaohao:event.biaohao,
      content:event.content,
      date:event.date
    }})
  } catch (e) {
    console.error('抓小猪', e)
  }
}