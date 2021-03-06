const sendMessage = require('./send-message')
const { hkeys, hget } = require('./redis')
const Reminder = require('./reminder')
const { scheduleOptions } = require('./options')

// Processes messages matching /listreminders
module.exports = async (message) => {
  const chatId = message.chat.id
  const reminderSetKey = `reminder:${chatId}`

  // Get all existing reminders
  const reminderKeys = await hkeys(reminderSetKey)

  if (reminderKeys.length >= 1) {
    // Create printable list for reminder set
    const reminderPrint = await Promise.all(reminderKeys.map(async key => {
      // Get details of reminder
      const reminder = Object.setPrototypeOf(JSON.parse(await hget(reminderSetKey, key)), Reminder.prototype)

      // Return printable list entry
      return `\n${reminderKeys.indexOf(key) + 1}) ${reminder.getName()} (${scheduleOptions[reminder.getSchedule()].display})`
    }))

    await sendMessage({
      chat_id: chatId,
      text: `Here are your registered reminders:${reminderPrint}`
    })
  } else {
    await sendMessage({
      chat_id: chatId,
      text: 'You do not have any reminder yet. Use /newreminder to add one.'
    })
  }
}
