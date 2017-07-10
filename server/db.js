const db = require('monk')('localhost/myAppDB')
db.then(() => {
  console.log('mongo is ok')
})

module.exports = db
