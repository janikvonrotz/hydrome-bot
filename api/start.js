const sendMessage = require('./send-message')

// Processes messages matching /start
module.exports = async (message) => {
  await sendMessage({
    chat_id: message.chat.id,
    text: 'Hi, I am the MonsteraBot hosted on Zeit Now.'
  })
}
