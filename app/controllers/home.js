class Home {
  index(ctx){
    ctx.body = '<h1>这是主页面</h1>'
  }
}

module.exports = new Home()