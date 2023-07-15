import { CacheTokenOutputPort } from '@authupd/ports/output/cachetoken_output.port'
import { redisAdapter } from '@core/adapters/secondary/cache/redis_adapter'
import { RedisOutputPort } from '@core/ports/output/service/cache/redis_output.port'

export class CacheTokenService implements CacheTokenOutputPort {
  constructor (
    private readonly cache: RedisOutputPort
  ) {}

  async getStoreByName<T> (store: string): Promise<T[]> {
    const result = await this.cache.get(store)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return result ? JSON.parse(result) : []
  }

  async updateStoreByName<T> (payload: T[], store: string): Promise<void> {
    await this.cache.set(store, JSON.stringify(payload))
  }
}

export const redisCacheService = new CacheTokenService(redisAdapter)
