const Koa = require('koa')
const Router = require('koa-router')

const router = new Router()

const userRouter = new Router({prefix:'/user'})
const app = new Koa()


// 中间件

const test = async (ctx, next) => {
	await next()
}
userRouter.get('/', test, ctx => {
	ctx.body = '这是用户页面'
})

userRouter.get('/:id', test, ctx => {
	ctx.body = `这是${ctx.params.id}的用户页面`
})
router.get('/', ctx => {
	ctx.body = "这是主页面"
})
router.get('/home', async (ctx, next)=>{
	ctx.body = "这是主页面"
})
// 对于任何请求， koa 都会调用该方法的匿名函数
// ctx 是koa 对req,res封装的一个对象
// next() 调用下一个匿名函数 
app
	.use(router.routes())
	.use(userRouter.routes())

app.listen(3001)
console.log("app started in port 3001")