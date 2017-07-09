const router = require('koa-router')()
const users = require('../server/controller')

router.post('/api/token', users.getToken)

module.exports = router