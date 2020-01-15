class Reminder {
  constructor (name) {
    this.name = name
    this.created_at = new Date()
    this.last_run = new Date()
  }

  setName (value) {
    this.name = value
  }

  getName () {
    return this.name
  }

  setSchedule (value) {
    this.schedule = value
  }

  getSchedule () {
    return this.schedule
  }

  setLastRun (value) {
    this.last_run = value
  }

  getLastRun () {
    return new Date(this.last_run)
  }

  getCreatedAt () {
    return this.created_at
  }
}

module.exports = Reminder
