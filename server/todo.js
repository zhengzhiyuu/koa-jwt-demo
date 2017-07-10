const db = require('./db')
const todo = db.get('todo')

const addtodo = async(msg, status, username) => {
    await todo.insert({
        msg: msg,
        status: status,
        user: username
    })
}
const removetodo = async(msg, status, username) => {
    await todo.remove({
        msg: msg,
        status: status,
        user: username
    })
}
const findtodo = async(status, username) => {
    const data = await todo.find({
        status: status,
        user: username
    }).then(res => res).catch(err => console.log(err))
    return data
}

const uptodo = async(msg, status, username, upstatus) => {
    await todo.update({
        msg: msg,
        status: status,
        user: username
    }, {
        msg: msg,
        status: upstatus,
        user: username
    })
}

module.exports = {
    addtodo,
    removetodo,
    findtodo,
    uptodo
}