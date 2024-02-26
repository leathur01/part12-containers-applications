const redis = require('redis')
const { promisify } = require('util')
const { REDIS_URL } = require('../util/config')

let client

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  client = redisIsDisabled
} else {
  client = redis.createClient({
    url: REDIS_URL
  })
  client.connect()
}

module.exports = {
  client
}
