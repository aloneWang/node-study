const Koa = require('koa')
const koaBody = require('koa-body');
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
app.use(koaBody())
routing(app)
app.listen(3001)
console.log("app started in port 3001")