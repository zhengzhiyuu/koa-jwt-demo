const mongo = require('monk')('localhost/myAppDB')
mongo.then(() => {
  console.log('mongo is ok')
})

const db = mongo.get('test')

module.exports = db
