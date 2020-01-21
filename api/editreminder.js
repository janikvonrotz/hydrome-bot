const sendMessage = require('./send-message')
const { hkeys, set, get, hset, del, hget } = require('./redis')
const Reminder = require('./reminder')
const scheduleButtons = require('./schedule-buttons')
const scheduleOptions = require('./schedule-options')

// Processes messages matching /editreminder
module.exports = async (message, ctx) => {
  const chatId = message.chat.id
  const requestId = `request:${chatId}`
  const reminderEditKey = `edit:${chatId}:reminder`
  const reminderSetKey = `reminder:${chatId}`

  // Get all existing reminders
  const reminderKeys = await hkeys(reminderSetKey)

  if (ctx.request === '/editreminder') {
    if (reminderKeys) {
      // Create printable list for reminder set
      const reminderPrint = await Promise.all(reminderKeys.map(async key => {
        // Get details of reminder
        const reminder = Object.setPrototypeOf(JSON.parse(await hget(reminderSetKey, key)), Reminder.prototype)

        // Return printable list entry
        return `\n${reminderKeys.indexOf(key) + 1}) ${reminder.getName()} (${scheduleOptions[reminder.getSchedule()].display})`
      }))

      await sendMessage({
        chat_id: chatId,
        text: `Which ⏰ reminder would you like to edit?${reminderPrint}`
      })

      // Set state
      await set(requestId, '/editreminder/select')
    } else {
      await sendMessage({
        chat_id: chatId,
        text: 'You do not have any reminder yet. Use /newreminder to add one.'
      })
    }
  }

  if (ctx.request === '/editreminder/select') {
    // Get key by index
    const reminderKey = reminderKeys[message.text - 1]
    const reminder = Object.setPrototypeOf(JSON.parse(await hget(reminderSetKey, reminderKey)), Reminder.prototype)

    await sendMessage({
      chat_id: chatId,
      text: `Enter a new name for ${reminder.getName()}:`
    })

    // Set state
    await set(requestId, '/editreminder/name')

    // Save key of current reminder
    await set(reminderEditKey, reminderKey)
  }

  if (ctx.request === '/editreminder/name') {
    await sendMessage({
      chat_id: chatId,
      text: `The new name is: ${message.text}`
    })

    // Get reminder edit key
    const reminderKey = await get(reminderEditKey)

    // Get reminder from hashset and update name
    const reminder = Object.setPrototypeOf(JSON.parse(await hget(reminderSetKey, reminderKey)), Reminder.prototype)
    reminder.setName(message.text)
    await hset(reminderSetKey, reminderKey, JSON.stringify(reminder))

    // Ask for the interval
    await sendMessage({
      chat_id: chatId,
      text: 'Select the new reminder 📆 schedule:',
      reply_markup: {
        inline_keyboard: [scheduleButtons]
      }
    })

    // Set state
    await set(requestId, '/editreminder/schedule')
  }

  if (ctx.request === '/editreminder/schedule') {
    await sendMessage({
      chat_id: chatId,
      text: `The new schedule is: ${scheduleOptions[message.data].display}`
    })

    // Get reminder edit key
    const reminderKey = await get(reminderEditKey)

    // Get reminder from hashset and update schedule
    const reminder = Object.setPrototypeOf(JSON.parse(await hget(reminderSetKey, reminderKey)), Reminder.prototype)
    reminder.setSchedule(message.data)
    await hset(reminderSetKey, reminderKey, JSON.stringify(reminder))

    await sendMessage({
      chat_id: chatId,
      text: 'Your reminder has been ✅ updated!'
    })

    // Del reminder edit
    await del(reminderEditKey)

    // Delete request state
    await del(requestId)
  }
}
