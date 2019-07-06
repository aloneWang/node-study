
const Router = require('koa-router')

const router = new Router({prefix:'/users'})

// db数据
const {findById, create, delete: del, getAll, login} = require('../controllers/users.js')

router.get('/',getAll)
router.get('/:id',findById)

router.post('/', create);

router.delete('/:id', del)

// 登录
router.post('/login', login)

module.exports = router