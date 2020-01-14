const sendMessage = require('./send-message')
const { hkeys, set, get, hset, del, hget } = require('./state')
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
      const reminderPrint = reminderKeys.map(key => {
        return `\n${reminderKeys.indexOf(key) + 1}) ${key}`
      })

      await sendMessage({
        chat_id: chatId,
        text: `Which reminder would you like to edit?${reminderPrint}`
      })

      // Set state
      set(requestId, '/editreminder/select')
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

    await sendMessage({
      chat_id: chatId,
      text: `Enter a new name for ${reminderKey}:`
    })

    // Set state
    set(requestId, '/editreminder/name')

    // Save key of current reminder
    set(reminderEditKey, reminderKey)
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
    hset(reminderSetKey, reminder.getName(), JSON.stringify(reminder))

    // Ask for the interval
    await sendMessage({
      chat_id: chatId,
      text: 'Select the new reminder schedule:',
      reply_markup: {
        inline_keyboard: [scheduleButtons]
      }
    })

    // Set state
    set(requestId, '/editreminder/schedule')
  }

  if (ctx.request === '/editreminder/schedule') {
    await sendMessage({
      chat_id: chatId,
      text: `The new schedule is: ${scheduleOptions[message.data]}`
    })

    // Get reminder edit key
    const reminderKey = await get(reminderEditKey)

    // Get reminder from hashset and update schedule
    const reminder = Object.setPrototypeOf(JSON.parse(await hget(reminderSetKey, reminderKey)), Reminder.prototype)
    reminder.setSchedule(message.data)
    hset(reminderSetKey, reminder.getName(), JSON.stringify(reminder))

    await sendMessage({
      chat_id: chatId,
      text: 'Your reminder has been updated!'
    })

    // Del reminder edit
    del(reminderEditKey)

    // Delete request state
    del(requestId)
  }
}
