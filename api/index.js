// Load env config
require('dotenv').config()
const start = require('./start')
const newreminder = require('./newreminder')
const { get } = require('./state')

module.exports = async (req, res) => {
  console.log('BODY: ', req.body)

  // Check if Telegram message
  if (req.body && (req.body.message || req.body.callback_query)) {
    // Get message object
    var message = {}
    if (req.body.message) {
      message = req.body.message
    }
    // Callback query depends on request
    if (req.body.callback_query) {
      message = req.body.callback_query.message
      message.data = req.body.callback_query.data
    }

    // Build context
    const ctx = {
      request: await get(`request:${message.chat.id}`)
    }

    // Request is either current state if set or message text 
    ctx.request = ctx.request || message.text
    console.log('CTX', ctx)

    // Match text request
    if (ctx.request.match('/start(.*)')) {
      await start(message, ctx)
    }

    if (ctx.request.match('/newreminder(.*)')) {
      await newreminder(message, ctx)
    }
  }

  // Send default message
  res.end('This is the HydromeBot API.')
}
