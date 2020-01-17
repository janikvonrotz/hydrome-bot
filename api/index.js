// Load env config
require('dotenv').config()
const start = require('./start')
const newreminder = require('./newreminder')
const listreminders = require('./listreminders')
const deletereminder = require('./deletereminder')
const editreminder = require('./editreminder')
const about = require('./about.js')
const { get } = require('./state')

module.exports = async (req, res) => {
  console.log('BODY', req.body)

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

    // Match text request
    if (ctx.request.match('/start(.*)')) {
      await start(message, ctx)
    }

    if (ctx.request.match('/newreminder(.*)')) {
      await newreminder(message, ctx)
    }

    if (ctx.request.match('/editreminder(.*)')) {
      await editreminder(message, ctx)
    }

    if (ctx.request.match('/listreminders(.*)')) {
      await listreminders(message, ctx)
    }

    if (ctx.request.match('/deletereminder(.*)')) {
      await deletereminder(message, ctx)
    }

    if (ctx.request.match('/about(.*)')) {
      await about(message, ctx)
    }
  }

  // Send default message
  res.end('This is the HydroMeBot API.')
}
