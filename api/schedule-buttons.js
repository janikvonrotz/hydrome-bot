const scheduleOptions = require('./schedule-options')

const scheduleButtons = ['daily', 'weekly', 'twoweeks', 'monthly'].map(key => {
  return {
    text: scheduleOptions[key].display,
    callback_data: key
  }
})

module.exports = scheduleButtons
