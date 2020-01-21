const db = require('db')

module.exports = {
  keys: async (key) => {
    return db.keysAsync(key)
  },
  set: async (key, value) => {
    return db.setAsync(key, value)
  },
  get: async (key) => {
    return db.getAsync(key)
  },
  del: async (key) => {
    db.delAsync(key)
  },
  hkeys: async (hash) => {
    return db.hkeysAsync(hash)
  },
  hset: (hash, field, value) => {
    return db.hset(hash, field, value)
  },
  hget: async (hash, field) => {
    return db.hgetAsync(hash, field)
  },
  hdel: async (hash, field) => {
    return db.hdelAsync(hash, field)
  },
  incr: async (key) => {
    return db.incrAsync(key)
  }
}
