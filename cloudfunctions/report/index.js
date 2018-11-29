// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log('event:中文分割比奥斯 ', event)
  try {
    console.log('event:啦啦啦啦啦 ', event)
    return await db.collection('report').where({ title:event.title}).update({
      data: {
        content: event.content,
      }
    })
  } catch (e) {
    console.error('抓小猪', e)
  }
}