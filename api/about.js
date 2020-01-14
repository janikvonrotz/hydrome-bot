const sendMessage = require('./send-message')

// Processes messages matching /about
module.exports = async (message) => {
  const chatId = message.chat.id

  await sendMessage({
    chat_id: chatId,
    text: 'HydromeBot is a Telegram bot that reminds you to water your plants.'
  })

  await sendMessage({
    chat_id: chatId,
    text: 'It has been built by Janik von Rotz (https://janikvonrotz.ch).'
  })

  await sendMessage({
    chat_id: chatId,
    text: 'If you have any feedback submit it to https://github.com/janikvonrotz/hydrome-bot/issues.'
  })
}
