import constants from '@shared/constants'
import Redis from 'ioredis'

const RedisClient = new Redis({
  host: constants.REDIS_HOST,
  password: constants.REDIS_PASSWORD,
  port: constants.REDIS_PORT
})

export default RedisClient
