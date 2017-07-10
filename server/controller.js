const api = require('./api')
const todo = require('./todo')
const jwt = require('jsonwebtoken')

//user-controller
const finduser = async ctx => {
  const reqDate = ctx.request.body
  const userData = await api.findUser(reqDate.name)
  const secret = 'vueAndKoa2-demo2'
  console.log(userData)
  if (userData != '') {
    if (userData[0].userpassword == reqDate.pass) {
      const content = {
        name: userData[0].username,
        id: userData[0]._id
      }
      const token = jwt.sign(content, secret, {
        expiresIn: 60 * 2
      })

      ctx.body = {
        info: token,
        success: true
      }
    } else {
      ctx.body = {
        info: '密码错误',
        success: false
      }
    }
  } else {
    ctx.body = {
      info: '用户名错误',
      success: false
    }
  }
}
const adduser = async ctx => {
  const reqDate = ctx.request.body
  const info = await api.findUser(reqDate.name)
  if (info == '') {
    await api.addUser(reqDate.name, reqDate.pass)
    ctx.body = {
      info: '添加成功',
      success: true
    }
  } else {
    ctx.body = {
      info: '用户名重复',
      success: false
    }
  }
}

//token-controller
const getToken = async(ctx, next) => {
  ctx.body = ctx.state.user
}
const upToken = async ctx => {
  const reqDate = ctx.request.body
  const userData = await api.findUser(reqDate.name)
  const secret = 'vueAndKoa2-demo2'
  console.log(userData)
  if (userData != '') {
    const content = {
      name: userData[0].username,
      id: userData[0]._id
    }
    const token = jwt.sign(content, secret, {
      expiresIn: 60 * 2
    })
    ctx.body = {
      token: token,
      success: true
    }
  } else {
    ctx.body = {
      info: '用户名不合法',
      success: false
    }
  }
}

//todo-controller
const addTodo = async ctx => {
  const todoData = ctx.request.body
  await todo.addtodo(todoData.msg, todoData.status, todoData.username)
  ctx.body = {
    success: true,
    msg: 'add ok'
  }
}
const removeTodo = async ctx => {
  const todoData = ctx.request.body
  await todo.removetodo(todoData.msg, todoData.status, todoData.username)
  ctx.body = {
    success: true,
    msg: 'remove ok'
  }
}
const findTodo = async ctx => {
  const todoData = ctx.request.body
  const data = await todo.findtodo(todoData.status, todoData.username)
  ctx.body = {
    success: true,
    data: data
  }
}
const upTodo = async ctx => {
  const todoData = ctx.request.body
  await todo.uptodo(todoData.msg, todoData.status, todoData.username, todoData.upstatus)
  ctx.body = {
    success: true,
    msg: 'up ok'
  }
}

module.exports = {
  finduser,
  adduser,
  getToken,
  upToken,
  addTodo,
  removeTodo,
  findTodo,
  upTodo
}