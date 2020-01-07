var redis = require('redis')

// Create cached connection variable
let cachedClient = null

const createClient = (uri) => {
  // If cached client exists return it
  if (cachedClient) {
    return cachedClient
  }

  // Otherwise create a new client
  const client = redis.createClient(uri)
  cachedClient = client

  // Return new client
  return client
}

// Function that returns redis client
const db = () => {
  return createClient(process.env.REDIS_URI)
}

module.exports = db
