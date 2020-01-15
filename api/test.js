require('dotenv').config()
const { keys, hkeys, hget, hset } = require('./state')
const Reminder = require('./reminder')
const scheduleOptions = require('./schedule-options')
const sendMessage = require('./send-message')

const test = async () => {

  // Get all reminder sets
  const reminderSetKeys = await keys('reminder:*')

  console.log('REMINDERSETKEYS', reminderSetKeys)

  await reminderSetKeys.forEach(async key => {
    // Set chat id
    const chatId = key.split(':')[1]

    // Get all fields of set
    const reminderKeys = await hkeys(key)

    console.log('REMINDERKEYS', reminderKeys)

    await reminderKeys.forEach(async field => {
      // Get reminder
      const reminder = Object.setPrototypeOf(JSON.parse(await hget(key, field)), Reminder.prototype)

      console.log('REMINDER', reminder)

      // Calculate reminder run
      const now = new Date()
      const scheduledFor = new Date()
      scheduledFor.setDate(reminder.getLastRun().getDate() + scheduleOptions[reminder.getSchedule()].days)

      let text = `Hey there, just wanna let you know that your plant ${reminder.getName()} needs some water.`
      text += `\nThis reminder is set to run ${scheduleOptions[reminder.getSchedule()].display}.`

      // Check if reminder is due
      if (now < scheduledFor) {
        console.log('SEND MESSAGE', chatId)
        const result = await sendMessage({
          chat_id: chatId,
          text: text
        })
        console.log('RESULT', result)
        // Update reminder last run
        reminder.setLastRun(now)
        await hset(key, field, JSON.stringify(reminder))
      }
    })
  })
}

test()
