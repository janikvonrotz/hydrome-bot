const sendMessage = require('./send-message')
const { setState } = require('./state')

// Processes messages matching /setreminder
module.exports = async (message, context) => {
  const chatId = message.chat.id
  const request = context && context.request

  // Check state
  console.log('CONTEXT', context)

  if (request.match('/setreminder/name')) {
    await sendMessage({
      chat_id: chatId,
      text: `Your plants name is: ${message.text}`
    })

    // Create new reminder and store plant name
    // let reminder = new Reminder(name)
    // setState(`edit:reminder:${chatId}`, JSON.stringify(reminder))

    // Set state
    setState(`request:${chatId}`, '/setreminder/schedule')
  }

  if (request.match('/setreminder')) {
    // Send message
    await sendMessage({
      chat_id: chatId,
      text: 'Name your plant:'
    })

    // Set state
    setState(`request:${chatId}`, '/setreminder/name')
  }

  if (request.match('/setreminder/schedule')) {
    await sendMessage({
      chat_id: chatId,
      text: 'After which time period would you like to be remindend?'
    })

    // Set state
    setState(`request:${chatId}`, null)
  }
}
