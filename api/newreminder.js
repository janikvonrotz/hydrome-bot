const sendMessage = require('./send-message')
const { set, del, get, hset, incr } = require('./redis')
const Reminder = require('./reminder')
const { scheduleOptions, scheduleButtons } = require('./options')

// Processes messages matching /newreminder
module.exports = async (message, ctx) => {
  // Set some ids
  const chatId = message.chat.id
  const reminderEditKey = `edit:${chatId}:reminder`
  const requestId = `request:${chatId}`
  const reminderSetKey = `reminder:${chatId}`

  if (ctx.request === '/newreminder/name') {
    await sendMessage({
      chat_id: chatId,
      text: `Your 🌱 plants name is: ${message.text}`
    })

    // Create new reminder and store plant name
    const reminder = new Reminder(message.text)
    await set(reminderEditKey, JSON.stringify(reminder))

    // Ask for the interval
    await sendMessage({
      chat_id: chatId,
      text: 'At which 📆 interval would you like to be remindend?',
      reply_markup: {
        inline_keyboard: [scheduleButtons]
      }
    })

    // Set state
    await set(requestId, '/newreminder/schedule')
  }

  if (ctx.request === '/newreminder') {
    // Send message
    await sendMessage({
      chat_id: chatId,
      text: 'Name your plant:'
    })

    // Set state
    await set(requestId, '/newreminder/name')
  }

  if (ctx.request === '/newreminder/schedule') {
    await sendMessage({
      chat_id: chatId,
      text: `You have chosen: ${scheduleOptions[message.data].display}`
    })

    // Get reminder edit
    var reminder = Object.setPrototypeOf(JSON.parse(await get(reminderEditKey)), Reminder.prototype)

    // Set schedule
    reminder.setSchedule(message.data)

    // Generate Id
    const reminderKey = await incr('key:reminder')

    // Save reminder
    await hset(reminderSetKey, reminderKey, JSON.stringify(reminder))

    await sendMessage({
      chat_id: chatId,
      text: 'Your reminder has been ✅ saved!'
    })

    // Del reminder edit
    await del(reminderEditKey)

    // Delete request state
    await del(requestId)
  }
}
