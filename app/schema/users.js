const mongoose = require('mongoose')

const { Schema, model} = mongoose

// 定义一个 scehma 类型
const userSchema  = new Schema({
  name: { type: String, require: true}
})

// 创建model
module.exports = model('users', userSchema)

