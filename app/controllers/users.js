let db = [{name:'李磊'}]
// 将 路由中间件脱离出来管理
class UsersCtr {
  getAll(ctx) {
    ctx.body = db
  }
  // 查询id
  findById(ctx){
    const id = ctx.params.id

    if(id >= db.length) ctx.throw(401)
    ctx.body = db[id]
  }
  create(ctx){

    ctx.verifyParams({
      name: { type: 'string', required: true },
    });

    db.push(ctx.request.body)
    ctx.status = 200
    ctx.body = "添加成功"
  }
  delete(ctx){
    const id = ctx.params.id
    if(id >= db.length) ctx.throw(412)
    db.splice(ctx.params.id,1)
    ctx.status = 200 
    ctx.body = "删除成功"
  }
}

module.exports = new UsersCtr()