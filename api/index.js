// Load env config
require('dotenv').config()
const start = require('./start')

module.exports = async (req, res) => {
  // Check if Telegram message
  if (req.body && req.body.message) {
    // Get message object
    const message = req.body.message
    console.log(message)

    // Get text for request matching
    const text = message.text

    // Match text request
    if (text === '/start') {
      await start(message)
    }
  }

  // Send default message
  res.end('This is the MonsteraBot api.')
}
