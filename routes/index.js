const router = require('koa-router')()

router.get('/', async(ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Vue2 and Koa 2!'
  })
})


module.exports = router