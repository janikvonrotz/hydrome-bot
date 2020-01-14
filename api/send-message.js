const fetch = require('node-fetch')

// Sends messages to Telegram API
module.exports = async (body) => {
  const token = process.env.TELEGRAM_TOKEN

  // Disable notification
  body.disable_notification = true

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
}
