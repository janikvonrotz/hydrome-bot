const sendMessage = require('./send-message')
const { set, del } = require('./state')

// Processes messages matching /setreminder
module.exports = async (message, ctx) => {
  const chatId = message.chat.id
  const request = ctx && ctx.request

  // Check state
  console.log('CONTEXT', ctx)

  if (request === '/setreminder/name') {
    await sendMessage({
      chat_id: chatId,
      text: `Your plants name is: ${message.text}`
    })

    // Create new reminder and store plant name
    // let reminder = new Reminder(name)
    // setState(`edit:reminder:${chatId}`, JSON.stringify(reminder))

    // Set state
    set(`request:${chatId}`, '/setreminder/schedule')
  }

  if (request === '/setreminder') {
    // Send message
    await sendMessage({
      chat_id: chatId,
      text: 'Name your plant:'
    })

    // Set state
    set(`request:${chatId}`, '/setreminder/name')
  }

  if (request === '/setreminder/schedule') {
    await sendMessage({
      chat_id: chatId,
      text: 'At which interval would you like to be remindend?'
    })

    // Set state
    del(`request:${chatId}`)
  }
}
