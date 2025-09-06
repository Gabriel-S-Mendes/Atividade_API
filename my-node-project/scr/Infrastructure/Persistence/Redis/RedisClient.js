const { createClient } = require('redis'); // {PING:pong: 60.4s}
const config = require('./config');

const redisClient = createClient({
  url: config.redis.url, // ex: redis://localhost:6379
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

async function connectRedis() {
  if (!redisClient.isReady) {
    await redisClient.connect();
    console.log('Connected to Redis');
  }
}

module.exports = { redisClient, connectRedis };