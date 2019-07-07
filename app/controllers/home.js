class Home {
  index(ctx) {
    ctx.body = '<h1>这是主页面</h1>'
  }
  upload(ctx) {
    console.log(ctx.request.files)
  }
}

module.exports = new Home()