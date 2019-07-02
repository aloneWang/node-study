const Koa = require('koa')
const koaBody = require('koa-body');
const koaPrameter = require('koa-parameter')
const app = new Koa()
const routing = require('./routes')

const mongoose = require('mongoose')

// 链接数据库
mongoose.connect(
  'mongodb://127.0.0.1:27017/zhihu' ,
  { useNewUrlParser: true },
  () => console.log('MongoDB 连接成功了'))

mongoose.connection.on('error', (err) => {
  console.log(err)
});



// 捕获异常

app.use(async ( ctx,next)=>{
  try{
    await next()
  }catch(err){
    ctx.status = ctx.status || ctx.statusCode || 500
    ctx.body = {
      message: err.message
    }
  }
})

app
  .use(koaBody()) // 回去post 请求参数
  .use(koaPrameter(app)) // 验证参数
routing(app)
app.listen(3001)
console.log("app started in port 3001")