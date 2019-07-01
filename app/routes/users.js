
const Router = require('koa-router')

const router = new Router({prefix:'/users'})

// db数据
let db = [{name:'地精'}]

router.get('/', ctx => {
  ctx.body = db
})

router.get('/:id', ctx => {
  ctx.body = db[ctx.params.id]
})

router.post('/', (ctx) => {

	db.push(ctx.request.body);
	ctx.body = ctx.request.body;
});

router.delete('/:id', ctx => {
  db.splice(ctx.params.id,1)
  ctx.status = 200
})


module.exports = router