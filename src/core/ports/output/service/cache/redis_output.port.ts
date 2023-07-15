export interface RedisOutputPort {
  get: (key: string) => Promise<any | null>
  set: (key: string, payload: any) => Promise<void>
  del: (key: string) => Promise<void>
}
