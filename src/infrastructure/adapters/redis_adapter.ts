import constants from '@shared/constants'
import Redis from 'ioredis'

export class RedisCacheAdapter {
  constructor (
    private readonly redisClient: Redis
  ) {}

  async get (key: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      void this.redisClient.get(key, (err, result) => {
        if (err != null) reject(err)
        else resolve(result)
      })
    })
  }

  async set (key: string, payload: any): Promise<void> {
    return await new Promise((resolve, reject) => {
      void this.redisClient.set(key, payload, (err) => {
        if (err != null) reject(err)
        else resolve()
      })
    })
  }

  async del (key: string): Promise<void> {
    return await new Promise((resolve, reject) => {
      void this.redisClient.del(key, (err) => {
        if (err != null) reject(err)
        else resolve()
      })
    })
  }
}

const redisClient = new Redis({
  host: constants.REDIS_HOST,
  password: constants.REDIS_PASSWORD,
  port: constants.REDIS_PORT
})

export const redisCacheAdapter = new RedisCacheAdapter(redisClient)
