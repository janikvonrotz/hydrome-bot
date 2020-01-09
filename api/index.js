// Load env config
require('dotenv').config()
const start = require('./start')
const setreminder = require('./setreminder')
const { get } = require('./state')

module.exports = async (req, res) => {
  console.log('BODY: ', req.body)

  // Check if Telegram message
  if (req.body && req.body.message) {

    // Get message object
    const message = req.body.message

    // Build context
    const ctx = {
      request: await get(`request:${message.chat.id}`)
    }

    // Request is either current state if set or message text 
    ctx.request = ctx.request || message.text

    // Match text request
    if (ctx.request.match('/start(.*)')) {
      await start(message, ctx)
    }

    if (ctx.request.match('/setreminder(.*)')) {
      await setreminder(message, ctx)
    }
  }

  // Send default message
  res.end('This is the HydromeBot API.')
}
