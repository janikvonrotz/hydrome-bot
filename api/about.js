const sendMessage = require('./send-message')

// Processes messages matching /about
module.exports = async (message) => {
  const chatId = message.chat.id

  let text = 'HydroMeBot is a Telegram bot that reminds you to water your plants.'
  text += '\nIt has been built by Janik von Rotz (https://janikvonrotz.ch).'
  text += '\nIf you have any feedback submit it to https://github.com/janikvonrotz/hydrome-bot/issues.'

  await sendMessage({
    chat_id: chatId,
    text: text
  })
}
