import { LoginOutputModel } from '../models/useraccount'

export interface FindUserByEmailPort {
  findUserByEmail: (email: string) => Promise<LoginOutputModel | null>
}
