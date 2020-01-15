const fetch = require('node-fetch')

// Sends messages to Telegram API
module.exports = async (body, options) => {
  const token = process.env.TELEGRAM_TOKEN

  // Disable notification
  body.disable_notification = true
  if (options && options.disable_notification) {
    body.disable_notification = options.disable_notification
  }

  return fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
}
