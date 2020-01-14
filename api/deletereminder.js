const sendMessage = require('./send-message')
const { hkeys, set, hdel, del } = require('./state')

// Processes messages matching /deletereminder
module.exports = async (message, ctx) => {
  const chatId = message.chat.id
  const requestId = `request:${chatId}`
  const reminderSetKey = `reminder:${chatId}`

  // Get all existing reminders
  const reminderKeys = await hkeys(reminderSetKey)

  if (ctx.request === '/deletereminder') {
    if (reminderKeys.length >= 1) {
      const reminderPrint = reminderKeys.map(key => {
        return `\n${reminderKeys.indexOf(key) + 1}) ${key}`
      })

      await sendMessage({
        chat_id: chatId,
        text: `Which reminder would you like to delete?${reminderPrint}`
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
      text: `You haven chosen number ${message.text} to be deleted.`
    })

    // Get key by index
    const reminderKey = reminderKeys[message.text - 1]

    // Delete field in hashset
    const deleted = await hdel(reminderSetKey, reminderKey)

    if (deleted === 1) {
      await sendMessage({
        chat_id: chatId,
        text: `Reminder ${reminderKey} has been deleted.`
      })
    } else {
      await sendMessage({
        chat_id: chatId,
        text: 'Nothing has been deleted.'
      })
    }

    // Delete request state
    del(requestId)
  }
}
