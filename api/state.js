const db = require('db')

module.exports = {
  set: (key, value) => {
    db.set(key, value)
  },
  get: async (key) => {
    return db.getAsync(key)
  },
  del: (key) => {
    db.del(key)
  },
  hset: (hash, field, value) => {
    db.hset(hash, field, value)
  },
  hget: async (hash, field) => {
    return db.hgetAsync(hash, field)
  },
  hkeys: async (hash) => {
    return db.hkeysAsync(hash)
  }
}
