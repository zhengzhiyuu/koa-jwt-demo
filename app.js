const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const koaJwt = require('koa-jwt')

const index = require('./routes/index')
const users = require('./routes/users')
const api = require('./routes/api')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(cors())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'html'
}))

// logger
app.use(async(ctx, next) => {
  const start = new Date()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  return await next().catch((err) => {
    if (401 == err.status) {
      ctx.state = 401
      ctx.body = {
        info: 'No-401',
        success: false
      }
    } else {
      throw err
    }
  })
})

//koa-jwt
app.use(koaJwt({
  secret: 'vueAndKoa2-demo2'
}).unless({path:[/^\/user/]}))

// routers
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(api.routes(), api.allowedMethods())

//使用koa-jwt的路由
app.use(async ctx => {
  console.log(`Url:::${ctx.url}`)
  if (ctx.url.match(/^\/api/)) {
    ctx.body = 'ok'
  }
})

module.exports = app