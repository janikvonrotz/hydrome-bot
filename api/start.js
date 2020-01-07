const fetch = require('node-fetch')

// Processes messages matching /start
module.exports = async (message) => {
  const token = process.env.TELEGRAM_TOKEN
  console.log('Send message...')
  console.log('TOKEN', token)
  console.log('CHAT_ID', message.chat.id)
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: message.chat.id,
      text: 'This is a response from Now!'
    })
  })
}