const Router = require('koa-router')

const router = new Router()

const { index } = require('../controllers/home.js')
router.get('/', index)


module.exports = router