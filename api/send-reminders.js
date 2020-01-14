require('dotenv').config()
// const { get } = require('./state')

module.exports = async (req, res) => {
  console.log('BODY: ', req.body)

  // Send default message
  res.end('Reminder notifications sent.')
}
