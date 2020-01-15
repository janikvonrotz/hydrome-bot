const db = require('db')

module.exports = {
  set: async (key, value) => {
    return db.setAsync(key, value)
  },
  get: async (key) => {
    return db.getAsync(key)
  },
  del: async (key) => {
    db.delAsync(key)
  },
  keys: async (key) => {
    return db.keysAsync(key)
  },
  hset: (hash, field, value) => {
    return db.hset(hash, field, value)
  },
  hget: async (hash, field) => {
    return db.hgetAsync(hash, field)
  },
  hkeys: async (hash) => {
    return db.hkeysAsync(hash)
  },
  hdel: async (hash, field) => {
    return db.hdelAsync(hash, field)
  },
  incr: async (key) => {
    return db.incrAsync(key)
  }
}
