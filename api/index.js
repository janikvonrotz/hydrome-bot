// Load env config
require('dotenv').config()
const start = require('./start')
const setreminder = require('./setreminder')
const { getState } = require('./state')

module.exports = async (req, res) => {
  console.log('BODY: ', req.body)

  // Check if Telegram message
  if (req.body && req.body.message) {

    // Get message object
    const message = req.body.message

    // Build context
    const context = {
      state: await getState(`state:${message.chat.id}`)
    }

    // Request is either current state if set or message text 
    const request = context.request || message.text

    console.log('REQUEST', request)

    // Match text request
    if (request.match('/start(.*)')) {
      await start(message, context)
    }

    if (request.match('/setreminder(.*)')) {
      await setreminder(message, context)
    }
  }

  // Send default message
  res.end('This is the MonsteraBot api.')
}
