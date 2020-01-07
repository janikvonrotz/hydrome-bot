var redis = require('redis')
const { promisify } = require('util')

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

// Function that returns redis client
const db = () => {
  var client = createClient(process.env.REDIS_URI)
  client.getAsync = promisify(client.get).bind(client)
  return client
}

module.exports = db
