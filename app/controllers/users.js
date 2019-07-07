// let db = [{name:'李磊'}]
const jsonwebtoken = require('jsonwebtoken')
//秘钥
const { secret }  = require('../config.js')
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

  // 注册
  async create(ctx){

    ctx.verifyParams({
      name: { type: 'string', required: true },
      password:{ type: 'string', required: true}
    });
    const name = ctx.request.body.name
    const repUser = await User.findOne({name})

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
  async login(ctx){
    ctx.verifyParams({
      name: { type: 'string' ,required: true },
      password: { type: 'string', required: true }
    })
    const _user = User.findOne(ctx.request.body)
    if(!_user) ctx.throw(401, '用户名或密码不正确')
    const { _id, name } = _user
    // 生成签名
    const token = jsonwebtoken.sign({ _id,name }, secret, { expiresIn: '1d' })
    ctx.body = { token }

  }

}

module.exports = new UsersCtr()