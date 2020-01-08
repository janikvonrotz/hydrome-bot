const db = require('db')

// Stores the state of the user conversation
module.exports = {
  setState: (key, value) => {
    console.log('SETSTATE', key, value)
    db().set(key, value)
  },
  getState: async (key) => {
    return db().getAsync(key)
  }
  // pushState
}
