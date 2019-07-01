const Koa = require('koa')
const koaBody = require('koa-body');
const koaPrameter = require('koa-parameter')
const app = new Koa()
const routing = require('./routes')


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