const path = require('path')
const fs = require('fs')

exports.checkDirExit = (folder)=> {
  if(!fs.existsSync(folder)){
    console.log('2222')
    fs.mkdirSync(folder)
  }
}
// 生成文件夹
exports.getUpLoadDirname = () => {
  let date = new Date()
  let month = parseInt(date.getMonth())+1 
  month = month.toString().length > 1 ? month : `0${month}`
  const dir = `${date.getFullYear()}${month}${date.getDate()}`
  return dir
}