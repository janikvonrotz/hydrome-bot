const sendMessage = require('./send-message')

// Processes messages matching /about
module.exports = async (message) => {
  const chatId = message.chat.id

  let text = 'HydromeBot is a Telegram bot that reminds you to water your plants.'
  text += 'It has been built by Janik von Rotz (https://janikvonrotz.ch).'
  text += 'If you have any feedback submit it to https://github.com/janikvonrotz/hydrome-bot/issues.'

  await sendMessage({
    chat_id: chatId,
    text: text
  })
}
