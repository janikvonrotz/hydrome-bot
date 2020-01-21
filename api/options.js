const scheduleOptions = {
  daily: {
    display: 'Daily',
    days: 1
  },
  weekly: {
    display: 'Weekly',
    days: 7
  },
  twoweeks: {
    display: 'Every 2 weeks',
    days: 14
  },
  monthly: {
    display: 'Monthly',
    days: 30
  }
}

const scheduleButtons = ['daily', 'weekly', 'twoweeks', 'monthly'].map(key => {
  return {
    text: scheduleOptions[key].display,
    callback_data: key
  }
})

module.exports = {
  scheduleOptions,
  scheduleButtons
}
