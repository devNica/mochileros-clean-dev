import { UserRegisterRequesModel } from '@domain/models/auth/useraccount-model'

export interface CreateUserUseCase {
  create: (data: UserRegisterRequesModel) => Promise<void>
}
