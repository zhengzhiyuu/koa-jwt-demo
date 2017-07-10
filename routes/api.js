const router = require('koa-router')()
const users = require('../server/controller')

router.post('/api/token', users.getToken)
router.post('/api/uptoken', users.upToken)
router.post('/api/addtodo', users.addTodo)
router.post('/api/removetodo', users.removeTodo)
router.post('/api/findtodo', users.findTodo)
router.post('/api/uptodo', users.upTodo)

module.exports = router