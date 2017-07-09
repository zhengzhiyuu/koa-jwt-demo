const api = require('./api')
const jwt = require('jsonwebtoken')

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

      jwt.verify(token, secret, (err, decode) => {
        if (err) {
          console.log(err.message)
        } else {
          console.log(decode)
        }
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

const getToken = async(ctx, next) => {
  ctx.body = ctx.state.user
}

module.exports = {
  finduser,
  adduser,
  getToken
}