const router = require('koa-router')()
const users = require('../server/controller')

router.post('/user/find', users.finduser)
router.post('/user/add', users.adduser)

module.exports = router