import { RegisterUserInputModel, RegisterUserOutputModel } from '../models/useraccount'

export interface CreateUserRepositoryPort {
  createUser: (data: RegisterUserInputModel) => Promise<RegisterUserOutputModel | null>
}
