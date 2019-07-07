
const Router = require('koa-router')
// const jwt = require('jsonwebtoken')
const jwt = require('koa-jwt')
const router = new Router({prefix:'/users'})

const { secret }  = require('../config.js')
// db数据
const {findById, create, delete: del, getAll, login} = require('../controllers/users.js')

// 添加路由中间件 token 验证

// const auth = async (ctx, next) => {
//   const { authorization = '' } = ctx.request.header;
//   const token = authorization.replace('Bearer','')
//   try {
//     jwt.verify(token, secret)
//   } catch (err) {
//     ctx.throw(401, err.message)
//   }
//   await next()
// }
const auth = jwt({secret})

router.get('/',getAll)
router.get('/:id',findById)

router.post('/', create);

router.delete('/:id', auth, del)

// 登录
router.post('/login', login)

module.exports = router