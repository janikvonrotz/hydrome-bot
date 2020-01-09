const sendMessage = require('./send-message')
const { hkeys } = require('./state')

// Processes messages matching /start
module.exports = async (message) => {
  const chatId = message.chat.id

  await sendMessage({
    chat_id: chatId,
    text: 'Hi, I am HydromeBot. Let me know if I should remind you of watering your plants.'
  })

  // Get all existing reminders
  const reminderKeys = await hkeys(`reminder:${chatId}`)

  if (reminderKeys) {
    await sendMessage({
      chat_id: chatId,
      text: `Here are your registered reminders:\n1) ${reminderKeys[0]}`
    })
  }
}
