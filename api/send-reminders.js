require('dotenv').config()
const { keys, hkeys, hget } = require('./state')
const Reminder = require('./reminder')
const scheduleOptions = require('./schedule-options')

const sendReminders = async (req, res) => {
  console.log('BODY: ', req.body)

  // Validate token
  const token = process.env.TELEGRAM_TOKEN
  if (token === req.body.token) {}

  // Get all reminder sets
  const reminderSetKeys = await keys('reminder')

  reminderSetKeys.foreach(key => {
    // Get all fields of set
    const reminderKeys = hkeys(key)

    reminderKeys.foreach(async field => {
      // Get reminder
      const reminder = Object.setPrototypeOf(JSON.parse(await hget(key, field)), Reminder.prototype)

      // Calculate reminder run
      const now = new Date()
      const scheduleFor = new Date()
      scheduleFor.setDate(reminder.getLastRun() + scheduleOptions[reminder.getSchedule].days)

      // Check if reminder is due
      if (now < scheduleFor) {
        console.log('SEND reminder')
      }

      // Send message

      // Update reminder last run
    })
  })

  // Send default message
  res.end('Reminder notifications sent.')
}

sendReminders()
