const sendMessage = require('./send-message')
const { hkeys, set, hdel, del, hget } = require('./redis')
const { scheduleOptions } = require('./options')
const Reminder = require('./reminder')

// Processes messages matching /deletereminder
module.exports = async (message, ctx) => {
  const chatId = message.chat.id
  const requestId = `request:${chatId}`
  const reminderSetKey = `reminder:${chatId}`

  // Get all existing reminders
  const reminderKeys = await hkeys(reminderSetKey)

  if (ctx.request === '/deletereminder') {
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
        text: `Which ⏰ reminder would you like to delete?${reminderPrint}`
      })

      // Set state
      set(requestId, '/deletereminder/select')
    } else {
      await sendMessage({
        chat_id: chatId,
        text: 'You do not have any reminder yet. Use /newreminder to add one.'
      })
    }
  }

  if (ctx.request === '/deletereminder/select') {
    await sendMessage({
      chat_id: chatId,
      text: `You haven chosen reminder number ${message.text} to be deleted.`
    })

    // Get key by index
    const reminderKey = reminderKeys[message.text - 1]
    const reminder = Object.setPrototypeOf(JSON.parse(await hget(reminderSetKey, reminderKey)), Reminder.prototype)

    // Delete field in hashset
    const deleted = await hdel(reminderSetKey, reminderKey)

    if (deleted === 1) {
      await sendMessage({
        chat_id: chatId,
        text: `Reminder ${reminder.getName()} has been deleted.`
      })
    } else {
      await sendMessage({
        chat_id: chatId,
        text: 'Nothing has been deleted.'
      })
    }

    // Delete request state
    await del(requestId)
  }
}
