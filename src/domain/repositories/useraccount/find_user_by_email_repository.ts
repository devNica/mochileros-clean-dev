import { SigninResponseModel } from '@domain/models/auth/useraccount-model'

export interface FindUserByEmailPort {
  findUserByEmail: (email: string) => Promise<SigninResponseModel | null>
}
