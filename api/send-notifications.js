require('dotenv').config()
const { keys, hkeys, hget, hset } = require('./redis')
const Reminder = require('./reminder')
const { scheduleOptions } = require('./options')
const sendMessage = require('./send-message')

module.exports = async (req, res) => {
  console.log('BODY', req.body)

  // Validate token
  const token = process.env.TELEGRAM_TOKEN
  if (token === req.body.token) {
    // Get all reminder sets
    const reminderSetKeys = await keys('reminder:*')

    for (const key of reminderSetKeys) {
      // Set chat id
      const chatId = key.split(':')[1]

      // Get all fields of set
      const reminderKeys = await hkeys(key)

      for (const field of reminderKeys) {
        // Get reminder
        const reminder = Object.setPrototypeOf(JSON.parse(await hget(key, field)), Reminder.prototype)

        // Calculate reminder run
        const now = new Date()
        const scheduledFor = new Date()
        // Get date of last run and deduct amount of day according to schedule and half a day
        scheduledFor.setDate(reminder.getLastRun().getDate() + scheduleOptions[reminder.getSchedule()].days - 0.5)

        let text = `Hey there, just wanna let you know that your 🌱 plant ${reminder.getName()} needs some 💧 water.`
        text += `\nThis ⏰ reminder is set to run 📆 ${scheduleOptions[reminder.getSchedule()].display}.`

        // Check if reminder is due
        if (now > scheduledFor) {
          await sendMessage({
            chat_id: chatId,
            text: text,
            enable_notifications: true
          })

          // Update reminder last run
          reminder.setLastRun(now)
          await hset(key, field, JSON.stringify(reminder))
        }
      }
    }

    // Send default message
    res.end('Reminder notifications processed.')
  }

  // Send default message
  res.end('This is the HydroMeBot API.')
}
