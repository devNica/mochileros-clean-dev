
export interface RedisService {
  getStoreByName: <T>(store: string) => Promise<T[]>
  updateStoreByName: <T>(payload: T[], store: string) => Promise<void>
}
