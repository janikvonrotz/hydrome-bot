class Reminder {
  constructor (name) {
    this.name = name
  }

  setName (value) {
    this.name = value
  }
  getName () {
    return this.name
  }
  setSchedule (value) {}
  getSchedule () {}
}

module.exports = Reminder
