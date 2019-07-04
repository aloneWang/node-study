// 定义一个 scehma 类型 ()
// 用户集合
const mongoose = require('mongoose')

const { Schema, model} = mongoose


const userSchema  = new Schema({
  name: { type: String, required: true},
  __v: { type: Number, select: false}
})


// 创建 user （user 会对应  数据库中 users 集合 ）
module.exports = model('User', userSchema)

