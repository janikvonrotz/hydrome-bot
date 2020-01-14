const sendMessage = require('./send-message')

// Processes messages matching /start
module.exports = async (message) => {
  const chatId = message.chat.id

  await sendMessage({
    chat_id: chatId,
    text: 'Hi, I am HydromeBot. Let me know if I should remind you of watering your plants. Use /newreminder to get started.'
  })
}
