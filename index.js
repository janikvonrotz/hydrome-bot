const TelegramBot = require('node-telegram-bot-api')

// Load env config
require('dotenv').config()

// Get bot token from environment
const token = process.env.TELEGRAM_TOKEN

// Webhook options
const options = {
  webHook: {
    // Just use 443 directly
    port: 443
  }
}

// Get deployment url
const url = process.env.NOW_URL

// Create a bot that receives messages via webhook
const bot = new TelegramBot(token, options)

// Register webhook
bot.setWebHook(`${url}/bot${token}`)

// Matches '/start'
bot.onText(/\/start/, (msg) => {
  const resp = 'Hi there'

  bot.sendMessage(msg.chat.id, resp)
})

// Listen for any kind of message
bot.on('message', (msg) => {
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(msg.chat.chatId, 'Received your message')
})
