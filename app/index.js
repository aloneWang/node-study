const Koa = require('koa')
const koaBody = require('koa-body');
const koaStatic = require('koa-static')
const koaPrameter = require('koa-parameter')
const { checkDirExit, getUpLoadDirname } =  require('./utils')
const app = new Koa()
const path = require('path')
const routing = require('./routes')

const mongoose = require('mongoose')
console.log(checkDirExit)
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
  .use(koaStatic(path.join(__dirname, '/public')))
  .use(koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '/public/uploads'),
      keepExtensions: true,
      onFileBegin: (name, file)=> {
        // console.log(file)
        // const dir = path.join(__dirname,`/public/uploads/${getUpLoadDirname()}`)
        const dir = path.join(__dirname,'/public/uploads')
        checkDirExit(dir)
      },
      onError:(err)=>{
        console.log(err);
      }
    }
  }))
  .use(koaBody()) // 回去post 请求参数
  .use(koaPrameter(app)) // 验证参数
routing(app)
app.listen(3001)
console.log("app started in port 3001")