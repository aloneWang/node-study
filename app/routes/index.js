const fs = require('fs')

// fs.readdirSync(path[, options])
// 获取所有路由
module.exports = (app)=>{
  fs.readdirSync(__dirname).forEach( file =>{
    if( file === 'index.js') return
    const route = require(`./${file}`)
    app.use(route.routes()).use(route.allowedMethods())
  })
}