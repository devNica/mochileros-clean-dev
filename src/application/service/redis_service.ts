import { RedisCache } from '@application/ports/cache/redis'
import { RedisService } from '@application/ports/cache/redis_service'
import { redisCacheAdapter } from '@infrastructure/adapters/redis_adapter'

export class RedisCacheService implements RedisService {
  constructor (
    private readonly cache: RedisCache
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

export const redisCacheService = new RedisCacheService(redisCacheAdapter)
