// let db = [{name:'李磊'}]

const User = require('../schema/users')


// 将 路由中间件脱离出来管理
class UsersCtr {
  async getAll(ctx) {
    const data = await User.find()
    console.log(data)
    ctx.body = data
  }
  // 查询id
  async findById(ctx){
    const id = ctx.params.id
    const _user = await User.findById(ctx.params.id)

    if(!_user) ctx.throw(404, '用户名不存在')
    ctx.body = _user
  }
  async create(ctx){

    ctx.verifyParams({
      name: { type: 'string', required: true },
    });
    const repUser = await User.findOne({...ctx.request.body})
    console.log(repUser)
    if(repUser) ctx.throw(409,'用户名已经存在')
    
    const _user = new User(ctx.request.body).save()
    ctx.status = 200
    ctx.body = "添加成功"
  }
  async delete(ctx){
    const user = await User.findByIdAndRemove(ctx.params.id)
    if(!user) ctx.throw(404,'用户名不存在')
    
    ctx.status = 200 
    ctx.body = "删除成功"
  }
}

module.exports = new UsersCtr()