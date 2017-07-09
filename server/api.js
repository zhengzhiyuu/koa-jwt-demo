const db = require('./db')

const addUser = async(userName, userPas) => {
  await db.insert({
    username: userName,
    userpassword: userPas
  }).then(() => console.log('is ok')).catch(err => console.log(err))
}

const findUser = async userName => {
  const data = await db.find({
    username: userName
  }).then(res => res).catch(err=>console.log(err))

  return data
}

// addUser('zhiyu','123')
// const a = findUser('zhiyu')
// console.log(a)
// db.find({
//     username:'zhiyu'
// }).then(res=>console.log(res))

module.exports = {
  addUser,
  findUser
}
