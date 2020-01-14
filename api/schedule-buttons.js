const scheduleOptions = require('./schedule-options')
const scheduleButtons = ['daily', 'weekly', 'twoweeks', 'monthly'].map(key => {
  return {
    text: scheduleOptions[key],
    callback_data: key
  }
})

module.exports = scheduleButtons
