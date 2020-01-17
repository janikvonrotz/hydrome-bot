const fetch = require('node-fetch')

// Sends messages to Telegram API
module.exports = async (body, method) => {
  const token = process.env.TELEGRAM_TOKEN

  // Get method optionally
  const useMethod = method || 'sendMessage'

  // Options for send message method
  if (useMethod === 'sendMessage') {
    // Disable notification
    body.disable_notification = !body.enable_notifications
  }

  return fetch(`https://api.telegram.org/bot${token}/${useMethod}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
}
