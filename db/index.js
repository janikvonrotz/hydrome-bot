var redis = require('redis')
var bluebird = require('bluebird')

// Promisify all redis methods
bluebird.promisifyAll(redis)

// Create cached connection variable
let cachedClient = null

const createClient = (uri) => {
  // If cached client exists return it
  if (cachedClient) {
    return cachedClient
  }

  // Parse url and get pass
  const parsedUrl = new URL(uri)

  // Otherwise create a new client
  var client = redis.createClient(uri)
  client.auth(parsedUrl.username)
  cachedClient = client

  // Return new client
  return client
}

module.exports = createClient(process.env.REDIS_URI)
