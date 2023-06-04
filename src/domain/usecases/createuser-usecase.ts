import { UserRegisterRequestModel } from '@domain/models/auth/useraccount-model'

export interface CreateUserUseCase {
  create: (data: UserRegisterRequestModel) => Promise<void>
}
