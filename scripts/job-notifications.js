const fetch = require('node-fetch')

const jobNotification = async () => {
  const body = {
    token: process.env.TELEGRAM_TOKEN
  }

  await fetch('https://hydrome-bot.now.sh/api/send-notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
}

jobNotification()
